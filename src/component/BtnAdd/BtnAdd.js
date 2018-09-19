import React from 'react';
import './BtnAdd.css';

const BtnAdd = ({className, addBottomCard, addRightCard}) => {
    return(
        <button className={`card__btn ${className}`} onClick={className === "card__btn--bottom"? addBottomCard : addRightCard}>
        </button>
    )
}

export default BtnAdd;