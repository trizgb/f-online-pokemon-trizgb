import React, { Component } from 'react';
import './App.css';
import { requestPokemons } from './services/PokemonService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    }
  }

  componentDidMount(){
    this.getPokemons();
  }

  getPokemons() {
    requestPokemons()
      .then(data => {
        this.setState({
          results: data.results
        })
      })
  }
  
  render() {
    
    return (
      <div className="app">
        Catch'em all
      </div>
    );
  }
}

export default App;
