require('dotenv/config');
const express = require('express');
const multer = require('multer');
const path = require('path');

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

/* photo upload */
const storage = multer.diskStorage({
  destination: './server/public/images',
  filename: (req, file, cb) => {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('photo');

app.post('/api/recipe-photos', (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      next(err);
    } else {
      const resBody = req.file.filename;
      res.json(resBody);
    }
  });
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
      if(result.rows.length <1){
        return next(new ClientError('Incorrect User Name or Password', 400))
      }
      const hash = result.rows[0].password;

      return bcrypt.compare(password, hash)
        .then(matches => {
          if (matches === true) {
            req.session.userId = result.rows[0].userId;
            return res.status(200).json(result.rows[0].userId);
          } else {
            return (
              next(new ClientError('Incorrect User Name or Password', 400))
            );
          }
        });
    })
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

/*    GET  from   USERS   */

app.get('/api/users', (req, res, next) => {
  const { userId } = req.session;
  const values = [userId];
  const sql = `
        Select *
        FROM "Users"
        WHERE "userId" = $1
  `;
  db.query(sql, values)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));

});

/*    GET  USER  LOGOUT    */

app.get('/api/users/logout', (req, res, next) => {
  delete req.session;
  res.status(200).json({ success: 'User has logged out successfully' });
});

/*   MAIN FEATURED PAGE  GET METHOD   */

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
    next(new ClientError('Please sign in to add to meal plan', 400));
  } else {
    const sql = `
      select "recipeId"
        from "Recipes"
        where "recipeId" = $1`;
    const params = [recipeId];
    db.query(sql, params)
      .then(response => {
        if (!response.rows.length) {
          throw new ClientError('Cannot add to meal plan with a non-existing recipe', 400);
        } else {
          const sql = `
          select "recipeId"
          from "MealPlan"
          where "userId" = $1 and "recipeId" = $2`;
          const params = [userId, recipeId];
          db.query(sql, params)
            .then(response => {
              if (response.rows.length) {
                throw new ClientError('Item already in your meal plan!', 400);
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

/*    DELETE from MEAL PLAN    */

app.delete('/api/mealplan/:recipeId', (req, res, next) => {

  if (!req.session.userId) {
    return res.json({ error: 'User is not logged in' });
  } else {
    const { recipeId } = req.params;
    const values = [req.session.userId, recipeId];
    const sql = `
        DELETE FROM "MealPlan"
                WHERE "userId" = $1
                AND "recipeId" = $2
                RETURNING *;
    `;
    db.query(sql, values)
      .then(result => {
        res.status(204).json(result.rows);
      })
      .catch(err => { next(err); });
  }
});

/*    DELETE from MY RECIPES    */
app.delete('/api/myrecipes/:recipeId', (req, res, next) => {
  if (!req.session.userId) {
    next(new ClientError('Please log in or sign up first!'), 400);
  } else {
    const { recipeId } = req.params;
    const sql = `
        delete from "FavoriteRecipes"
              where "userId" = $1
              and "recipeId" = $2
              returning *`;
    const params = [req.session.userId, recipeId];
    db.query(sql, params)
      .then(response => {
        res.status(204).json(response.rows);
      })
      .catch(err => { next(err); });
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

/* RECIPE DETAIL PAGE */
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

/* ADD A NEW RECIPE */
/* RECIPENAME, INGREDIENTS, SERVINGSIZE, CATEGORY, INSTRUCTION, IMAGE */
app.post('/api/recipe', (req, res, next) => {
  const { recipe } = req.body;
  if (req.session.userId) {
    let newRecipeId = null;
    const findUserNameSql = `
      select "userName"
      from "Users"
      where "userId" = $1`;
    const userParams = [req.session.userId];
    db.query(findUserNameSql, userParams)
      .then(response => {
        const createdBy = response.rows[0].userName;
        const params = [recipe.recipeName, recipe.category, recipe.numberOfServings, createdBy, recipe.image];
        const sql = `
      insert into "Recipes"("recipeName", "category", "numberOfServings", "createdBy", "image")
      values($1, $2, $3, $4, $5)
      returning "recipeId";`;
        db.query(sql, params)
          .then(response => {
            const recipeId = response.rows[0].recipeId;
            return recipeId;
          })
          .then(recipeId => {
            const insertValue = recipe.ingredients.map(ingredient => {
              return `('${ingredient.ingredientName}')`;
            }).join(',');
            const sql = `
        insert into "Ingredients" ("ingredientName")
        values ${insertValue}
        on conflict ("ingredientName")
        do nothing
        `;
            return db.query(sql)
              .then(response => {
                return recipeId;
              });
          })
          .then(recipeId => {
            const searchValue = recipe.ingredients.map(ingredient => {
              return `'${ingredient.ingredientName}'`;
            }).join(',');
            const sql = `
          select *
          from "Ingredients"
          where "ingredientName" in (${searchValue})
       `;
            return db.query(sql)
              .then(response => {
                newRecipeId = recipeId;
                return response.rows;
              });
          })
          .then(ingredientAndId => {
            ingredientAndId.forEach(element => {
              recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredientName === element.ingredientName) {
                  const { unit, quantity } = ingredient;
                  element.unit = unit;
                  element.quantity = quantity;
                  element.recipeId = newRecipeId;
                  delete element.ingredientName;
                }
              });
            });
            const insertValueForIngredients = ingredientAndId.map(element => {
              return `(${element.ingredientId},${element.recipeId},${element.quantity},'${element.unit}')`;
            }).join(',');
            const sql = `
        insert into "RecipeIngredients"("ingredientId", "recipeId", "quantity", "unit")
        values ${insertValueForIngredients}
        returning "recipeId"`;
            return db.query(sql)
              .then(response => {
                return response.rows[0].recipeId;
              });
          })
          .then(recipeId => {
            const insertValueForInstructions = recipe.instructions.map(instruction => {
              return `(${recipeId},'${instruction.instructionDetail}',${instruction.instructionOrder})`;
            }).join(',');
            const sql = `
        insert into "Instructions"("recipeId", "instructionDetail", "instructionOrder")
        values ${insertValueForInstructions}`;
            return db.query(sql)
              .then(response => {
                return recipeId;
              });
          })
          .then(recipeId => {
            const sql = `insert into "FavoriteRecipes" ("userId", "recipeId")
                      values ($1, $2)`;
            const value = [req.session.userId, recipeId];
            return db.query(sql, value)
              .then(response => {
                return recipeId;
              });
          })
          .then(recipeId => {
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
            const params = [recipeId];
            db.query(sql, params)
              .then(response => {
                if (response.rows.length !== 0) {
                  res.json(response.rows);
                }
              });
          })
          .catch(err => { next(err); });
      })
      .catch(err => { next(err); });

  } else {
    next(new ClientError('please log in or sign up to post a new recipe', 400));
  }
});

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
