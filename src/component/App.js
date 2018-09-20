import React from 'react';
import CardCont from '../container/CardCont';
import './App.css';

const App = ({addBottom, addRight, putCard, cards, coordsCards}) =>  {
    return(
      <div className='container'>
        {
          cards.map((card, index) => {
            return <CardCont key={card["_id"]} 
            addRight={addRight}
            addBottom={addBottom}
            putCard={putCard}
            card={card}
            coordCard={coordsCards[index]}
            />
          })
        }
      </div>
    )
}


export default App;
