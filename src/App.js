import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((user)=>
    this.setState(
        ()=>{
          return {monsters:user}
        }
      )
    )
  }
    
  onSearchChange = (event)=>{
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(()=>{
      return {searchField}
    });
  }

  render(){
    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;
    const filterMonstered = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox className={'search-box'} onChangeHandler={onSearchChange} placeholder={'Search Monster'} />
        <CardList monsters={filterMonstered} />
      </div>
    );
  }
  
}

export default App;
