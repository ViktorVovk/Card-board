import React from 'react';
import CardCont from '../container/CardCont';
import './App.css';

const App = ({addBottom, addRight, putCard, cards}) =>  {
    return(
      <div className='container'>
        {
          cards.map(card => {
            return <CardCont key={card["_id"]} 
            addRight={addRight}
            addBottom={addBottom}
            putCard={putCard}
            card={card}/>
          })
        }
      </div>
    )
}


export default App;
