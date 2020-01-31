import React from 'react';
import TopBar from './top-bar';
import AppContext from '../lib/context';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';
import Swal from 'sweetalert2';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
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
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.fileInput = React.createRef();
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
      return <div><u>Add First Ingredient:</u></div>;
    } else {
      const ingredientList = ingredients.map(listIngredients);
      return ingredientList;
    }
  }

  handleCurrentInstructions() {
    const instructions = this.state.instructions;
    if (!instructions.length) {
      return <div><u>Add First Instruction:</u></div>;
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
    newIngCopy.quantity = '';
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
      image: data.image,
      recipeName: data.recipeName,
      category: data.category,
      numberOfServings: data.numberOfServings,
      ingredients: data.ingredients,
      instructions: data.instructions
    };
    const reqBody = { recipe };
    const req = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('api/recipe', req)
      .then(response => response.json())
      .then(result => {
        if (!result.error) {
          Swal.fire('We have added your recipe!');
        } else {
          Swal.fire('Oops! Something went wrong, please try again!');
        }
      }
      );
    this.handleCancel();
  }

  handlePhotoSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('photo', document.querySelector('#photoInput').files[0]);
    fetch('/api/recipe-photos', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(result => {
        const image = `/images/${result}`;
        this.setState({ image });
      });
  }

  render() {
    return (
      <>
        <TopBar title={'Add Recipe'} mealPlanIcon={true} addRecipeIcon={false} />
        <div className="addRecipe-container fadeIn">
          <div className="newRecipeContainer">
            <div className="recipeNameInputField ">
              <label htmlFor="Recipe Name" className="newRecipeLabel "><u>Recipe Name:</u></label>
              <input required type="text" value={this.state.recipeName} onChange={this.handleRecipeName} className="newRecipeInput" />
            </div>
            <div className="categoryInputField">
              <label htmlFor="category" className="newRecipeLabel "><u>Category:</u></label>
              <input required type="text" value={this.state.category} onChange={this.handleCategory} className="newRecipeInput" />
            </div>
            <div className="servingsInputField">
              <label htmlFor="unit" className="newRecipeLabel"><u>Number of Servings:</u></label>
              <input required type="text" value={this.state.numberOfServings} onChange={this.handleServings} className="newRecipeInput" />
            </div>
            <form className="addIngredients" onSubmit={this.handleAddIngredient}>
              <div className="ingredientsHeader ">Add Ingredients</div>
              {this.handleCurrentIngredients()}
              <div className="addNewIngredientField">
                <label htmlFor="Ingredient" className="newIngredientLabel">Ingredient:</label>
                <input required type="text" value={this.state.ingredientInProgress.ingredientName} onChange={this.handleNewIngredient} className="newIngredientInput" />
              </div>
              <div className="addNewIngredientField">
                <label htmlFor="qunatity" className="newIngredientLabel">Quantity:</label>
                <input required type="text" value={this.state.ingredientInProgress.quantity} onChange={this.handleNewQuantity} className="newIngredientInput" />
              </div>
              <div className="addNewIngredientField">
                <label htmlFor="unit" className="newIngredientLabel">Unit:</label>
                <input required type="text" value={this.state.ingredientInProgress.unit} onChange={this.handleNewUnit} className="newIngredientInput" />
              </div>
              <div className="text-center py-2 ">
                <button className="addIngredientButton glow-on-hover">Add Ingredient</button>
              </div>

            </form>
          </div>
          <form className="addInstruction" onSubmit={this.handleAddInstruction}>
            <div className="ingredientsHeader">Add Instructions</div>
            {this.handleCurrentInstructions()}
            <div className="addNewIngredientField">
              <textarea required type="text" value={this.state.instructionInProgress.instructionDetail} onChange={this.handleNewinstruction} className="newInstructionInput newIngredientInput" />
            </div>
            <div className="text-center py-2 border-bottom border-dark">
              <button className="addIngredientButton glow-on-hover  ">Add Instruction</button>
            </div>

          </form>
          <form onSubmit={this.handlePhotoSubmit}>
            <label className="text-center w-100">
            Upload Image:
              <input required id="photoInput" className="fileInput " type="file" accept="image/png, image/jpeg, image/jpg" name="myImage"/>
            </label>
            <br />
            <div className="mb-2 pb-2 text-center border-bottom border-dark">
              <button type="submit" className="glow-on-hover">Submit Image</button>
            </div>
          </form>
          <div className="submit-container text-center">
            <Link to='/myRecipes'>
              <button className="submitRecipe glow-on-hover mr-2" type="button" onClick={() => this.handleSubmitNewRecipe()}>Submit</button>
              <button className="CancelButton glow-on-hover" type="button" onClick={() => this.handleCancel()}>Cancel</button>
            </Link>
          </div>
        </div>
        <NavBar />
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
