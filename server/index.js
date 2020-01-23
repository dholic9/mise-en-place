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

});

/*     USERS Sign Up  */

app.post('/api/users', (req, res, next) => {
  const name = req.body.name;
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const image = req.body.image;

  const sql = `
      SELECT *
      FROM  "Users"
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
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

// get my recipe
app.get('/api/fav', (req, res, next) => {
  // if (!req.session.userId) {
  //   res.json([]);
  // } else {
  // const params = [req.session.userId];
  // const params = [req.body.userId];
  const sql = `
      select  "r"."recipeName",
              "r"."recipeId",
            "r"."image",
            "r"."category",
            "r"."numberOfServings"
          from "Recipes" as "r"
          join "FavoriteRecipes" as "f" using ("recipeId")
          where "f"."userId" = 1;`;
  db.query(sql)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => {
      next(err);
    });
  // }
});

//Recipe detail page
app.get('/api/recipe-detail-page/:recipeId', (req, res, next)=>{
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
         group by "r"."recipeId"`
  
    
  db.query(sql)
  .then(response=>{
    res.json(response.rows)
  })
  .catch(err=>next(err))
})

//Recipe detail page^

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
