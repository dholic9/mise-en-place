import React from 'react';
import TopBar from './top-bar';
import AppContext from '../lib/context';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      createdBy: '',
      category: '',
      numberOfServings: 4,
      image: '',
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
    this.handleFile = this.handleFile.bind(this);
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
    this.setState({ numberofservings: event.target.value });
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
      return <div>Add First Ingredient</div>;
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

  handleNewQuantity(evet) {
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
    this.setState({ instructions: instructionCopy });
    const instOrdCopy = this.state.instructionInProgress;
    instOrdCopy.instructionOrder++;
    this.setState({ instructionInProgress: instOrdCopy });

  }

  handleNewinstruction(event) {
    event.preventDefault();
    const instructionCopy = { ...this.state.instructionInProgress };
    instructionCopy.instructionDetail = event.target.value;
    this.setState({ instructionInProgress: instructionCopy });
  }

  handleFile(e) {
    this.setState({ image: e.target.files[0] });
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
            <label htmlFor="category" className="newRecipeLabel">Number of Servings:</label>
            <input type="text" value={this.state.numberofservings} onChange={this.handleServings} className="newRecipeInput" />
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
        <input type="file" onChange={this.handleFile}/>
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
