import React from 'react';

function IngredientListItem(props) {
  return (
    <div className={`ingredient ${props.count % 2 === 1 ? 'oddIngredient' : 'evenIngredient'}`} >
      <div className="quantity ing">{props.ing.quantity}</div>
      <div className="unit ing">{props.ing.unit}</div>
      <div className="ingredientName ing">{props.ing.ingredientName}</div>
    </div>
  );
}

export default IngredientListItem;
