import React from 'react';
import './BtnEdit.css';


const BtnEdit = ({isContentEditable, clickEdit, clickSaveEdit}) => {
    return(
        <div className="card__btn-group">
            <button className={isContentEditable?'card__btn-edit card__btn-edit--hidden': 'card__btn-edit'} onClick={clickEdit} title="Edit"></button>
            <button className={isContentEditable?'card__btn-save card__btn-save--active': 'card__btn-save'} onClick={clickSaveEdit} title="Save Edit"></button>
        </div>
    )
}

export default BtnEdit