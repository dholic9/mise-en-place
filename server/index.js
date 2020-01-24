require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

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
  const values = [userName, password];
  const sql = `
          SELECT *
          FROM "Users"
          WHERE "userName" = $1
            AND "password" = $2;
  `;
  if (userName.length < 4) {
    return res.status(400).json({ error: 'User Name input was invalid' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password was invalid' });
  }

  db.query(sql, values)
    .then(result => {
      if (result.rows.length < 1) {
        throw (new ClientError('User Name of Password is incorrect', 400));
      }

      req.session.userId = result.rows[0].userId;

      return res.status(200).json(result.rows[0].userId);
    })
    .catch(err => next(err));
});

/*     USERS Sign Up  */

app.post('/api/users/create', (req, res, next) => {

  if (!req.body.name || !req.body.userName || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'invalid user inputs' });
  }
  const user = {
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    image: req.body.image
  };

  const sql = `
      SELECT *
      FROM  "Users"
  `;

  db.query(sql)
    .then(result => {
      const usersDb = result.rows;
      usersDb.map(index => {
        if (index.userName === user.userName || index.email === user.email) {
          return res.status(400).json({ error: 'User already exists' });
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

/*  GET FAVORITE RECIPES  */
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
  const userId = req.session.userId;
  const recipeId = req.body.recipeId;
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
  console.log(req.session.userId);
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

// Recipe detail page
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
         where "r"."recipeId" = ${req.params.recipeId}
         group by "r"."recipeId"`;

  db.query(sql)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

// Recipe detail page^

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
