import React from 'react';
import './BtnColorPicker.css';


const BtnColorPicker = ({clickBtnColorPicker, noChangeColor}) => <button className="card__btn-color-picker" onClick={clickBtnColorPicker} onBlur={noChangeColor} title="Change Color"></button>

export default BtnColorPicker