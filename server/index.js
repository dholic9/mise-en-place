require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

/*     USERS login    */
app.post('/api/users', (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const values = [userName];
  const sql = `
          SELECT *
          FROM "Users"
          WHERE "userName" = $1;
  `;

  db.query(sql, values)
    .then(result => {
      const hash = result.rows[0].password;

      return bcrypt.compare(password, hash).then(
        matches => {
          if (matches === true) {
            req.session.userId = result.rows[0].userId;
            res.status(200).json(result.rows[0].userId);
          } else {
            res.send('Incorrect Username or Password');
            res.redirect('/');
          }
        }
      );
    })
    .catch(err => next(err));
});

/*     POST USERS Sign Up  */

app.post('/api/users/create', (req, res, next) => {

  if (!req.body.name || !req.body.userName || !req.body.email || !req.body.password) {
    return res.status(401).json({ error: 'invalid user inputs' });
  }

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    var user = {
      name: req.body.name,
      userName: req.body.userName,
      password: hash,
      email: req.body.email,
      image: req.body.image
    };
    if (err) { console.error(err); }

    console.log('user', user);

    const sql = `
      SELECT *
      FROM  "Users"
  `;
    db.query(sql)
      .then(result => {
        const usersDb = result.rows;
        usersDb.map(index => {
          if (index.userName === user.userName || index.email === user.email) {
            return res.status(402).json({ error: 'User already exists' });
          }
        });
        const values = [
          user.name,
          user.userName,
          user.email,
          user.password,
          user.image
        ];
        const creatingSQL = `
              INSERT INTO "Users" ("name", "userName", "email", "password", "image")
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING *
      `;
        return (
          db.query(creatingSQL, values)
            .then(result => {
              res.status(201).json(result.rows[0]);
            })
            .catch(err => next(err))
        );
      })
      .catch(err => next(err));
  });
});

/*   MAIN FEATURED PAGE  GET METHOD */

app.get('/api/recipes', (req, res, next) => {
  const sql = `
          SELECT "recipeId",
                 "recipeName",
                 "numberOfServings",
                 "category",
                 "createdBy",
                 "image"
          FROM  "Recipes"
          ORDER BY "recipeId" ASC;
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

/*   FAV RECIPES  GET METHOD */
app.get('/api/fav', (req, res, next) => {
  if (!req.session.userId) {
    res.json([]);
  } else {
    const params = [req.session.userId];
    const sql = `
      select  "r"."recipeName",
              "r"."recipeId",
            "r"."image",
            "r"."category",
            "r"."numberOfServings"
          from "Recipes" as "r"
          join "FavoriteRecipes" as "f" using ("recipeId")
          where "f"."userId" = $1;`;
    db.query(sql, params)
      .then(response => {
        res.json(response.rows);
      })
      .catch(err => {
        next(err);
      });
  }
});

/*  POST MEAL PLAN  */
app.post('/api/mealplan', (req, res, next) => {
  const { userId } = req.session;
  const { recipeId } = req.body;
  if (!userId) {
    next(new ClientError('please sign in to add to meal plan', 400));
  } else {
    const sql = `
      select "recipeId"
        from "Recipes"
        where "recipeId" = $1`;
    const params = [recipeId];
    db.query(sql, params)
      .then(response => {
        if (!response.rows.length) {
          throw new ClientError('cannot add to meal plan with a non-existing recipe', 400);
        } else {
          const sql = `
          select "recipeId"
          from "MealPlan"
          where "userId" = $1 and "recipeId" = $2`;
          const params = [userId, recipeId];
          db.query(sql, params)
            .then(response => {
              if (response.rows.length) {
                throw new ClientError('meal plan already exists', 400);
              } else {
                const sql = `
                    insert into "MealPlan"("userId", "recipeId")
                    values($1,$2)
                    returning *`;
                const params = [userId, recipeId];
                db.query(sql, params)
                  .then(response => {
                    res.status(201).json(response.rows);
                  })
                  .catch(err => next(err));
              }
            })
            .catch(err => { next(err); });
        }
      })
      .catch(err => { next(err); });
  }
});

/*  GET MEAL PLAN  */
app.get('/api/mealplan', (req, res, next) => {
  if (!req.session.userId) {
    res.json([]);
  } else {
    const params = [req.session.userId];
    const sql = `
      select  "r"."recipeName",
              "r"."recipeId",
            "r"."image",
            "r"."category",
            "r"."numberOfServings"
          from "Recipes" as "r"
          join "MealPlan" as "f" using ("recipeId")
          where "f"."userId" = $1;`;
    db.query(sql, params)
      .then(response => {
        res.json(response.rows);
      })
      .catch(err => {
        next(err);
      });
  }
});

/*  GET SHOPPING LIST  */

app.get('/api/shoppinglist', (req, res, next) => {
  const params = [req.session.userId];
  if (!req.session.userId) {
    res.json([]);
  } else {
    const sql = `
      select "userId"
        from "Users"
        where "userId" = $1;
        `;
    db.query(sql, params)
      .then(response => {
        if (!response.rows.length) {
          throw new ClientError(`no userId found at userId ${req.session.userId}`, 400);
        } else {
          const sql = `
      select "i"."ingredientName",
        "ri"."recipeId",
        "ri"."quantity",
        "ri"."unit",
        "r"."recipeName"
        from "RecipeIngredients" as "ri"
        join "MealPlan" as "m" using ("recipeId")
        join "Recipes" as "r" using ("recipeId")
        join "Ingredients" as "i" using ("ingredientId")
        where "m"."userId" = $1`;

          return db.query(sql, params)
            .then(response => {
              if (!response.rows.length) {
                throw new ClientError('Please add recipes to your meal plan to see shopping list', 400);
              } else {
                res.json(response.rows);
              }
            });
        }
      })
      .catch(err => { next(err); });

  }
});

/* RECIPE DETIAL PAGE */
app.get('/api/recipe-detail-page/:recipeId', (req, res, next) => {
  const sql = `
  select "r"."recipeName",
         "r"."category",
         "r"."numberOfServings",
         "r"."image",
         "r"."recipeId",
         to_json(array(
           select "ingredientsArray"
           from (select "ri"."unit",
                        "ri"."quantity",
                        "ri"."ingredientId",
                        "i"."ingredientName"
                   from "RecipeIngredients" as "ri"
                   join "Ingredients" as "i" using ("ingredientId")
                  where "ri"."recipeId" = "r"."recipeId") as "ingredientsArray"
         )) as "ingredients",
         to_json(array(
           select "instructionsArray"
           from (select "in"."instructionDetail",
                        "in"."instructionOrder"
                  from "Instructions" as "in"
                  where "in"."recipeId" = "r"."recipeId") as "instructionsArray"
                  order by "instructionOrder" ASC
         )) as "instructions"
         from "Recipes" as "r"
         where "r"."recipeId" = $1
         group by "r"."recipeId"`;
  const value = [req.params.recipeId];
  db.query(sql, value)
    .then(response => {
      res.json(response.rows[0]);
    })
    .catch(err => next(err));
});

/* ADD TO MY RECIPES */
app.post('/api/fav', (req, res, next) => {
  const { recipeId } = req.body;
  const { userId } = req.session;
  if (!userId) {
    next(new ClientError('please sign in to add to favorites', 400));
  } else {
    const sql = `select "recipeId"
                  from "Recipes"
                  where "recipeId" = $1;`;
    const value = [recipeId];
    db.query(sql, value)
      .then(response => {
        if (!response.rows) {
          throw new ClientError('cannot find recipe with that recipeId', 404);
        } else {
          const sql = `select "recipeId"
                      from "FavoriteRecipes"
                      where "userId" = $1 and "recipeId" = $2;`;
          const value = [userId, recipeId];
          db.query(sql, value)
            .then(response => {

              if (response.rows.length) {
                throw new ClientError('recipe already saved to favorites', 400);
              } else {
                const sql = `insert into "FavoriteRecipes" ("userId", "recipeId")
                                values ($1, $2)
                                returning *`;
                const value = [userId, recipeId];
                db.query(sql, value)
                  .then(response => {
                    return res.status(201).json(response.rows[0]);
                  })
                  .catch(err => next(err));
              }
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  }
});

/* USER CAN ADD RECIPES */

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
