import React, { Component } from 'react'
import App from '../component/App'


export default class AppCont extends Component {
    state={
      cards: [], //данные из сервера
      defaultData: {   // если на сервере нет записей в БД
        title: "Title",
        text: "From the you can browse and search for objects in this collection. All standard query constructs are supported except for map/reduce queries.",
        options: {
             parent: null,
             parentId: null,
             top: 20,
             left: 20,
             color: 'rgb(255, 255, 255)'
        }
      }  
    }

// получаем данные сервера get запрос
    componentDidMount() {
      fetch('/data')
      .then(response=>response.json())
      .then(data => {
        if(!data.length){   // если данных нет, отправляем post запрос на сервер с дефолтными данными 
          let newCard = JSON.stringify(this.state.defaultData);
          this.postNewCard(newCard);
        } else {
          this.setState({
            cards: data
          })}
        })
      };
// функция для put запроса на сервер 
    putCard = (body, id) => {
      fetch(`/data/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(response => response.json())
      .then(data => {                                 //обновляем изменения в state.cards
       let index;
       this.state.cards.forEach((item, i) => {
         if (item['_id'] === id) index = i 
       })
       data = {...data, ...{"_id": `${id}`}}
       let newCards = [...this.state.cards];
       newCards.splice(index, 1, data);
        this.setState({
          cards: newCards
        })
      })
    };
    // функция post запроса на сервер
    postNewCard = (body) => {
      fetch(`/data`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cards: [...this.state.cards, data]
        })
      })
    };
    // фунция добавить карту справа, срабатывает при клике на кнопку
    addRight = (e) => {
        e.target.classList.remove('card__btn--no-create');
        let newPositionLeft = e.currentTarget.parentNode.offsetWidth + e.currentTarget.parentNode.offsetLeft + e.currentTarget.offsetWidth + 40;
        let coords = e.currentTarget.getBoundingClientRect();
        let nextElem = document.elementFromPoint(coords.right+100, coords.top);
          if(nextElem !== e.currentTarget.parentNode.parentNode && nextElem != null) {
            console.log('no create card right');
            e.target.classList.add('card__btn--no-create');
            return false
          }
        let newCard = JSON.stringify({
          title: this.state.defaultData.title,
          text: this.state.defaultData.text,
          options: {
            parent: "right",
            parentId: e.target.parentNode.dataset.id,
            top: e.currentTarget.parentNode.offsetTop,
            left: newPositionLeft,
            color: 'rgb(255, 255, 255)',
          }
        })
        this.postNewCard(newCard);
        };
// фунция добавить карту снизу, срабатывает при клике на кнопку
    addBottom = (e) => {
      e.target.classList.remove('card__btn--no-create');
      let newPositionTop = e.currentTarget.parentNode.offsetHeight + e.currentTarget.parentNode.offsetTop + e.currentTarget.offsetHeight + 40;
      let coords = e.currentTarget.getBoundingClientRect();
      let nextElem = document.elementFromPoint(coords.left, coords.top+100);
        if(nextElem !== e.currentTarget.parentNode.parentNode && nextElem !== null) {
          console.log('no create card bottom');
          e.target.classList.add('card__btn--no-create');
          return false
        }
       let newCard = JSON.stringify({
         title: this.state.defaultData.title,
         text: this.state.defaultData.text,
         options: {
           parent: "bottom",
           parentId: e.target.parentNode.dataset.id,
           top: newPositionTop,
           left: e.currentTarget.parentNode.offsetLeft,
           color: 'rgb(255, 255, 255)'
         }
       })
      this.postNewCard(newCard);
    };
 
    
  render() {
    return <App putCard={this.putCard} addRight={this.addRight} addBottom={this.addBottom} cards={this.state.cards}/>
  }
}
