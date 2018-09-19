import React from 'react';
import BtnChangeColor from '../BtnChangeColor/BtnChangeColor';
import './ColorPicker.css';

const ColorPicker = ({isColorPickerOpen, clickChangeColor}) => {
        return(
            <div className={isColorPickerOpen?'card__color-picker card__color-picker--active':'card__color-picker'} onClick={clickChangeColor}>
                    <BtnChangeColor className="card__color card__color--yellow"/>
                    <BtnChangeColor className="card__color card__color--blue"/>
                    <BtnChangeColor className="card__color card__color--green"/>
                    <BtnChangeColor className="card__color card__color--white"/>
                    <BtnChangeColor className="card__color card__color--rose"/>
                    <BtnChangeColor className="card__color card__color--violet"/>
            </div>
        )
}

export default ColorPicker;