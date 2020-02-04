# mise-en-place
A full-stack web application for people who enjoy cooking and want to create and share personal recipes

## Technologies Used

- React.js
- Webpack 4
- Bootstrap 4
- Node.js
- Express
- HTML5
- CSS3
- AWS EC2

## Live Demo

Try the application live at [http://miseenplace.davidjinhong.com](http://miseenplace.davidjinhong.com)

## Features

- User can create an account.
- User can view all recipes or all featured recipes.
- User can view recipe details with ingredients and instructions.
- User can add recipes to their favorites list.
- User can add recipes to their meal prep plan.
- User can view shopping list detailing all ingredients needed for all meals in their meal plan.
- User can create recipe.
- User can upload photo for their recipe.

## Preview


## Development

#### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10

#### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/dholic9/mise-en-place
    cd mise-en-place
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database with PostgreSQL.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
