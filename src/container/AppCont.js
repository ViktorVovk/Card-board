import React, { Component } from 'react'
import App from '../component/App'


export default class AppCont extends Component {
    state={
      cards: [], //данные из сервера
      coordsCards: [],
      defaultData: {   // если на сервере нет записей в БД
        title: "Title",
        text: "From the you can browse and search for objects in this collection. All standard query constructs are supported except for map/reduce queries.",
        options: {
             parent: null,
             parentId: null,
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
            cards: data,
            coordsCards: this.getCoordsCards(data)
          })}
        })
      };

    getCoordsCard = (data) => { // data is object
        if (!data) return
        let intervalRight = 280;
        let intervalBottom = 330;
        let coordsCard = {};
        if (!data.options.parent) {
            coordsCard = { id: data['_id'], left: 20, top: 20 };
            return coordsCard
        } else {
            console.log(document.querySelector('.card'));
            this.state.coordsCards.forEach(item => {
              
                if (data.options.parentId === item.id) {
                    if (data.options.parent === 'top') coordsCard = {
                      id: data['_id'],
                      left: item.left,
                      top: item.top + intervalBottom
                    };
                    if (data.options.parent === 'left') coordsCard = {
                      id: data['_id'],
                      left: item.left + intervalRight,
                      top: item.top
                    };
                }
            })
            return coordsCard
          }
    };

    getCoordsCards = (data) => {      // data is array
        if(!data) return 
        let intervalRight = 280;
        let intervalBottom = 330;
        let coordsCard = {};
          let arr = [];
          for(let i = 0; i < data.length; i++){
            if(!i) {
              coordsCard = {id: data[i]['_id'], left: 20, top: 20};
              arr.push(coordsCard);
              continue
            } 
            for(let b = 0; b < arr.length; b++){
                if(arr[b].id === data[i].options.parentId){
                  console.log(document.querySelector('.card'));
                  if(data[i].options.parent === 'top') coordsCard = { id: data[i]['_id'], left: arr[b].left, top: arr[b].top + intervalBottom };
                  if(data[i].options.parent === 'left') coordsCard = { id: data[i]['_id'], left: arr[b].left + intervalRight, top: arr[b].top };
              }
            }
            arr.push(coordsCard);
          }
          return arr
    }
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
          cards: [...this.state.cards, data],
          coordsCards: [...this.state.coordsCards, this.getCoordsCard(data)]
        })
      })
    };
    // фунция добавить карту справа, срабатывает при клике на кнопку
    addRight = (e) => {
        let coords = e.currentTarget.getBoundingClientRect();
        let nextElem = document.elementFromPoint(coords.right+100, coords.top);
       // не создавать карту если там она уже есть
          if(nextElem !== e.currentTarget.parentNode.parentNode && nextElem != null) {
            return false
          }
        let newCard = JSON.stringify({
          title: this.state.defaultData.title,
          text: this.state.defaultData.text,
          options: {
            parent: "left",
            parentId: e.target.parentNode.dataset.id,
            color: 'rgb(255, 255, 255)',
          }
        })
        this.postNewCard(newCard);
        };
// фунция добавить карту снизу, срабатывает при клике на кнопку
    addBottom = (e) => {
      let coords = e.currentTarget.getBoundingClientRect();
      let nextElem = document.elementFromPoint(coords.left, coords.top+100);
        // не создавать карту если там она уже есть
        if(nextElem !== e.currentTarget.parentNode.parentNode && nextElem !== null) {
          return false
        }
       let newCard = JSON.stringify({
         title: this.state.defaultData.title,
         text: this.state.defaultData.text,
         options: {
           parent: "top",
           parentId: e.target.parentNode.dataset.id,
           color: 'rgb(255, 255, 255)'
         }
       })
      this.postNewCard(newCard);
    };
 
    
  render() {
    return <App putCard={this.putCard} addRight={this.addRight} addBottom={this.addBottom} cards={this.state.cards} coordsCards={this.state.coordsCards}/>
  }
}
