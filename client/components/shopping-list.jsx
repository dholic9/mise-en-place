import React from 'react';
import TopBar from './top-bar';
import { Link } from 'react-router-dom';

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shoppingList: [] };
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
        this.setState({ shoppingList });
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
        <TopBar title={'Shopping List'} displayIcon={false}/>
        <div className="shoppinglist-container">
          {display}
        </div>
      </React.Fragment>
    );
  }

}

function Item(props) {
  const details = props.ingredient.recipe.map((element, index) => {
    const unit = element.unit === '-' ? '' : element.unit;
    return (
      <p className="text-left" key={index}>{`${element.quantity} ${unit} for ${element.recipeName}`}</p>)
    ;
  });
  return (

    <div className="card mb-1">
      <div className="card-body">
        <h5 className="card-title text-center">{props.ingredient.ingredientName}</h5>
        <div className="card-text row">
          <div className="col-3 align-items-center justify-content-center d-flex">
            <i className="fas fa-times" onClick={() => { props.remove(props.ingredient.ingredientName); }}></i>
          </div>
          <div className="qty-unit col-9">
            {details}
          </div>

        </div>
      </div>
    </div>

  );
}
