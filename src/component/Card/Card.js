import React from 'react';
import BtnEdit from '../BtnEditCard/BtnEdit';
import BtnAdd from '../BtnAdd/BtnAdd';
import TextBlock from '../TextBlock/TextBlock';
import ColorPicker from '../ColorPicker/ColorPicker';
import BtnColorPicker from '../BtnColorPicker/BtnColorPicker';
import './Card.css';


const Card = ({
    clickBtnColorPicker,
    clickChangeColor,
    clickEdit,
    clickSaveEdit,
    isColorPickerOpen,
    isContentEditable,
    bgColor,
    addBottom,
    addRight,
    noChangeColor,
    card
  }) => {
        return(
                  <div className="card" style={{backgroundColor: bgColor, top: card.options.top, left: card.options.left}}  data-id={`${card['_id']}`}>
                        <ColorPicker isColorPickerOpen={isColorPickerOpen} clickChangeColor={clickChangeColor}/>
                        <BtnColorPicker clickBtnColorPicker={clickBtnColorPicker} noChangeColor={noChangeColor}/>
                        <BtnEdit clickSaveEdit={clickSaveEdit} clickEdit={clickEdit} isContentEditable={isContentEditable}/> 
                        <TextBlock className = 'card__title' content= {card.title} isContentEditable={isContentEditable}/>
                        <TextBlock className = 'card__note-text' content ={card.text} isContentEditable={isContentEditable}/>
                        <BtnAdd className = 'card__btn--bottom' addBottomCard={addBottom}/>
                        <BtnAdd className = 'card__btn--right' addRightCard={addRight}/>
                  </div>
        );
}

export default Card;