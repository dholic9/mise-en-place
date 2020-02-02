import React from 'react';
import TopBar from './top-bar';
import NavBar from './nav-bar';
import Swal from 'sweetalert2';

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shoppingList: [], errorMessage: '' };
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.getShoppingList();
  }

  getShoppingList() {
    const init = {
      method: 'GET'
    };
    fetch('/api/shoppinglist', init)
      .then(response => response.json())
      .then(shoppingList => {
        if (!shoppingList.error) {
          this.setState({ shoppingList });
        } else {
          this.setState(state => ({ shoppingList: [], errorMessage: shoppingList.error }), () => { Swal.fire(this.state.errorMessage); });
        }
      });
  }

  getDisplay(array) {
    const result = [];
    array.forEach(element => {
      let isIngredientThere = false;
      const { quantity, unit, recipeName, ingredientName } = element;
      result.forEach(item => {
        if (item.ingredientName === element.ingredientName) {
          isIngredientThere = true;
          item.recipe.push({ quantity, unit, recipeName });
        }
      });
      if (!isIngredientThere) {
        const newItem = { ingredientName, recipe: [{ quantity, unit, recipeName }] };
        result.push(newItem);
      }
    });
    return result;
  }

  removeItem(ingredientName) {
    const newShoppingList = [...this.state.shoppingList];
    for (let i = 0; i < newShoppingList.length; i++) {
      if (newShoppingList[i].ingredientName === ingredientName) {
        newShoppingList.splice(i, 1);
      }
    }
    this.setState(state => ({ shoppingList: newShoppingList }));
  }

  render() {
    const data = this.getDisplay(this.state.shoppingList);
    const display = data.map((element, index) => (<Item key={index} remove={this.removeItem}ingredient={element}/>));
    return (
      <React.Fragment>
        <TopBar title={'Shopping List'} mealPlanIcon={false} addRecipeIcon={false}/>
        <div className="shoppinglist-container">
          {display}
        </div>
        <NavBar/>
      </React.Fragment>
    );
  }

}

// function capitalizeWords(string) {
//   return string
//     .toLowerCase()
//     .split(' ')
//     .map(function (word) {
//       return word[0].toUpperCase() + word.substr(1);
//     })
//     .join(' ');

// }

function Item(props) {
  const details = props.ingredient.recipe.map((element, index) => {
    const unit = element.unit === '-' ? '' : element.unit;
    return (

      <p className="text-left m-0" key={index}>{`${element.quantity} ${unit} for ${element.recipeName}`}</p>
    )
    ;
  });

  const tempName = props.ingredient.ingredientName;
  return (

    <div className="card mb-1">
      <div className="card-body">
        <h5 className="card-title text-center"><u>{tempName}</u></h5>
        <div className="card-text  align-items-center row">
          <div className="col-3  justify-content-center d-flex">
            <input type="checkbox" className='checkbox' />
          </div>
          <div className=" align-items-center qty-unit col-9">
            {details}
          </div>

        </div>
      </div>
      <div className="row">
        <NavBar />
      </div>
    </div>
  );
}
