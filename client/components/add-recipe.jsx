import React from 'react';
import TopBar from './top-bar';
import AppContext from '../lib/context';
import { Link } from 'react-router-dom';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      createdBy: '',
      category: '',
      numberOfServings: '',
      image: null,
      ingredients: [],
      instructions: [],
      ingredientInProgress: {
        unit: '',
        quantity: '',
        ingredientName: ''
      },
      instructionInProgress: {
        instructionOrder: 1,
        instructionDetail: ''
      }
    };
    this.handleRecipeName = this.handleRecipeName.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleServings = this.handleServings.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleNewQuantity = this.handleNewQuantity.bind(this);
    this.handleNewUnit = this.handleNewUnit.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleNewinstruction = this.handleNewinstruction.bind(this);
    this.handleAddInstruction = this.handleAddInstruction.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.setState({ createdBy: this.context.user });
  }

  handleRecipeName(event) {
    event.preventDefault();
    this.setState({ recipeName: event.target.value });
  }

  handleCategory(event) {
    event.preventDefault();
    this.setState({ category: event.target.value });
  }

  handleServings(event) {
    event.preventDefault();
    this.setState({ numberOfServings: event.target.value });
  }

  handleCurrentIngredients() {
    const ingredients = this.state.ingredients;
    if (!ingredients.length) {
      return <div>Add First Ingredient</div>;
    } else {
      const ingredientList = ingredients.map(listIngredients);
      return ingredientList;
    }
  }

  handleCurrentInstructions() {
    const instructions = this.state.instructions;
    if (!instructions.length) {
      return <div>Add First Instruction</div>;
    } else {
      const instructionList = instructions.map(listInstructions);
      return instructionList;
    }
  }

  handleNewIngredient(event) {
    event.preventDefault();
    const stateCopy = { ...this.state.ingredientInProgress };
    stateCopy.ingredientName = event.target.value;
    this.setState({ ingredientInProgress: stateCopy });
  }

  handleNewQuantity(event) {
    event.preventDefault();
    const stateCopy = { ...this.state.ingredientInProgress };
    stateCopy.quantity = event.target.value;
    this.setState({ ingredientInProgress: stateCopy });
  }

  handleNewUnit(event) {
    event.preventDefault();
    const stateCopy = { ...this.state.ingredientInProgress };
    stateCopy.unit = event.target.value;
    this.setState({ ingredientInProgress: stateCopy });
  }

  handleAddIngredient(event) {
    event.preventDefault();
    const ingredientCopy = [...this.state.ingredients];
    ingredientCopy.push(this.state.ingredientInProgress);
    this.setState({ ingredients: ingredientCopy });
    const newIngCopy = { ...this.state.ingredientInProgress };
    newIngCopy.ingredientName = '';
    newIngCopy.quantity = 0;
    newIngCopy.unit = '';
    this.setState({ ingredientInProgress: newIngCopy });
  }

  handleAddInstruction(event) {
    event.preventDefault();
    const instructionCopy = [...this.state.instructions];
    instructionCopy.push(this.state.instructionInProgress);
    this.setState({
      instructions: instructionCopy,
      instructionInProgress: {
        instructionOrder: this.state.instructionInProgress.instructionOrder + 1,
        instructionDetail: ''
      }
    });
  }

  handleNewinstruction(event) {
    event.preventDefault();
    const instructionCopy = { ...this.state.instructionInProgress };
    instructionCopy.instructionDetail = event.target.value;
    this.setState({ instructionInProgress: instructionCopy });
  }

  handleCancel() {
    this.setState({
      recipeName: '',
      createdBy: '',
      category: '',
      numberOfServings: '',
      image: null,
      ingredients: [],
      instructions: [],
      ingredientInProgress: {
        unit: '',
        quantity: '',
        ingredientName: ''
      },
      instructionInProgress: {
        instructionOrder: 1,
        instructionDetail: ''
      }
    });
  }

  handleSubmitNewRecipe() {
    const data = this.state;
    const recipe = {
      recipeName: data.recipeName,
      createdBy: data.createdBy,
      category: data.category,
      numberOfServings: data.numberOfServings,
      ingredients: data.ingredients,
      instructions: data.instructions
    };
    console.log(recipe);
    const req = {
      method: 'POST',
      body: recipe
    };
    fetch('/api/recipe', req)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
    this.handleCancel();
  }

  render() {
    return (
      <>
        <TopBar mealPlanIcon={false} addRecipeIcon={false} title={'Add Recipe'} />
        <div className="newRecipeContainer">
          <div className="recipeNameInputField">
            <label htmlFor="Recipe Name" className="newRecipeLabel">Recipe Name:</label>
            <input type="text" value={this.state.recipeName} onChange={this.handleRecipeName} className="newRecipeInput" />
          </div>
          <div className="categoryInputField">
            <label htmlFor="category" className="newRecipeLabel">Category:</label>
            <input type="text" value={this.state.category} onChange={this.handleCategory} className="newRecipeInput" />
          </div>
          <div className="servingsInputField">
            <label htmlFor="unit" className="newRecipeLabel">Number of Servings:</label>
            <input type="text" value={this.state.numberOfServings} onChange={this.handleServings} className="newRecipeInput" />
          </div>
          <form className="addIngredients" onSubmit={this.handleAddIngredient}>
            <div className="ingredientsHeader">Add Ingredients</div>
            {this.handleCurrentIngredients()}
            <div className="addNewIngredientField">
              <label htmlFor="Ingredient" className="newIngredientLabel">Ingredient:</label>
              <input type="text" value={this.state.ingredientInProgress.ingredientName} onChange={this.handleNewIngredient} className="newIngredientInput" />
            </div>
            <div className="addNewIngredientField">
              <label htmlFor="qunatity" className="newIngredientLabel">Quantity:</label>
              <input type="text" value={this.state.ingredientInProgress.quantity} onChange={this.handleNewQuantity} className="newIngredientInput" />
            </div>
            <div className="addNewIngredientField">
              <label htmlFor="unit" className="newIngredientLabel">Unit:</label>
              <input type="text" value={this.state.ingredientInProgress.unit} onChange={this.handleNewUnit} className="newIngredientInput" />
            </div>
            <button className="addIngredientButton">Add Ingredient</button>
          </form>
        </div>
        <form className="addInstruction" onSubmit={this.handleAddInstruction}>
          <div className="ingredientsHeader">Add Instructions</div>
          {this.handleCurrentInstructions()}
          <div className="addNewIngredientField">
            <textarea type="text" value={this.state.instructionInProgress.instructionDetail} onChange={this.handleNewinstruction} className="newInstructionInput newIngredientInput" />
          </div>
          <button className="addIngredientButton">Add Instruction</button>
        </form>
        <form action='/upload' method="POST" encType="multipart/form-data">
          <label>
            Upload Image:
            <input type="file" accept="image/png, image/jpeg" name="foodImage"/>
          </label>
          <br />
          <button type="submit">Submit Image</button>
        </form>

        <Link to='/myRecipes'>
          <button className="submitRecipe" type="button" onClick={() => this.handleSubmitNewRecipe()}>Submit Recipe</button>
          <button className="CancelButton" type="button" onClick={() => this.handleCancel()}>Cancel</button>
        </Link>
      </>
    );
  }
}

function listIngredients(item, index) {
  return (
    <div key={index} className={`ingredient ${index % 2 === 1 ? 'oddIngredient' : 'evenIngredient'}`}>
      <div className="quantity ing">{item.quantity}</div>
      <div className="unit ing">{item.unit}</div>
      <div className="ingredientName ing">{item.ingredientName}</div>
    </div>
  );
}

function listInstructions(item, index) {
  return (
    <div key={index} className={`ingredient ${index % 2 === 1 ? 'oddIngredient' : 'evenIngredient'}`}>
      <div className="instructionOrder">{item.instructionOrder}</div>
      <div className="unit">{item.instructionDetail}</div>
    </div>
  );
}

export default AddRecipe;
AddRecipe.contextType = AppContext;
