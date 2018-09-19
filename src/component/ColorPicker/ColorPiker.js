import React from 'react';
import BtnChangeColor from '../BtnChangeColor/BtnChangeColor';

const ColorPiker = ({isColorPikerOpen, ClickChangeColor}) => {
        return(
            <div className={isColorPikerOpen?'card__color-piker card__color-piker--active':'card__color-piker'} onClick={ClickChangeColor}>
                    <BtnChangeColor className="card__color card__color--yellow"/>
                    <BtnChangeColor className="card__color card__color--blue"/>
                    <BtnChangeColor className="card__color card__color--green"/>
                    <BtnChangeColor className="card__color card__color--white"/>
                    <BtnChangeColor className="card__color card__color--rose"/>
                    <BtnChangeColor className="card__color card__color--violet"/>
            </div>
        )
}

export default ColorPiker;