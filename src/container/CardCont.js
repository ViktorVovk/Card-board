import  React, { PureComponent} from 'react';
import Card from '../component/Card/Card'

export default class CardCont extends PureComponent {
  state={
        isColorPickerOpen: false, //открыта или нет окно выбора цвета
        bgColor: this.props.card.options.color, // цвет карты
        isContentEditable: false, // карта редактируема или нет
    };

// если нажали на кнопку смены цвета фона карты
    clickBtnColorPicker = () => {
        this.setState({
          isColorPickerOpen: !this.state.isColorPickerOpen
        })
    };
// выбрали цвет карты 
    clickChangeColor = (e) => {
      if(e.target.tagName !== 'BUTTON') return
      const color = getComputedStyle(e.target).background.slice(0, 18);
      //если выбрали тот же цвет что и был
      if(color === this.state.bgColor) {
        this.setState({
          isColorPickerOpen: !this.state.isColorPickerOpen
        })
        return
      }
      let editsColor = JSON.stringify({...this.props.card, ...{options: {...this.props.card.options, color}}})
      let id = this.props.card["_id"].slice("");
      this.props.putCard(editsColor, id);
      this.setState({
        bgColor: color,
        isColorPickerOpen: !this.state.isColorPickerOpen
      })
    };
// клик на кнопку редактирования
    clickEdit = (e) => {
      this.setState({
        isContentEditable: true
      })
    };
// клик на сохранить изменения
    clickSaveEdit = (e) => {
        const title = e.currentTarget.parentElement.nextElementSibling.innerText;
        const text = e.currentTarget.parentElement.nextElementSibling.nextElementSibling.innerText;
        //если изменений не было
        if(title === this.props.card.title && text === this.props.card.text){
          this.setState({
            isContentEditable: false
          })
          return 
        };
        let editsCard = JSON.stringify({...this.props.card, title, text})
        let id = this.props.card["_id"].slice("");
        this.props.putCard(editsCard, id)
        this.setState({
          isContentEditable: false
        })
    };
// закрыть окно выбора цвета если не выбрали цвет
    noChangeColor = (e) => {
      if (e.relatedTarget === null || !e.relatedTarget.classList.contains("card__color")) {
        this.setState({
          isColorPickerOpen: false
        })
      }
    };
    
  render() {
    return (<Card clickBtnColorPicker={this.clickBtnColorPicker} 
                 clickChangeColor={this.clickChangeColor} 
                 clickEdit={this.clickEdit} 
                 clickSaveEdit={this.clickSaveEdit}
                 isColorPickerOpen={this.state.isColorPickerOpen}
                 isContentEditable={this.state.isContentEditable}
                 bgColor={this.state.bgColor} 
                 card={this.props.card}
                 addBottom={this.props.addBottom}
                 addRight={this.props.addRight}
                 noChangeColor={this.noChangeColor} /> )
  }
}
