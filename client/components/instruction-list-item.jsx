import React from 'react';

function InstructionListItem(props) {
  return (
    <div className={`ingredient ${props.count % 2 === 1 ? 'oddIngredient' : 'evenIngredient'}`} >
      <div className="instructionOrder">{props.ins.instructionOrder}</div>
      <div className="unit">{props.ins.instructionDetail}</div>
    </div>
  );
}

export default InstructionListItem;
