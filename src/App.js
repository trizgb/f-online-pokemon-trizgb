import React, { Component } from 'react';
import './App.css';
import { requestPokemons } from './services/PokemonService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons() {
    requestPokemons()
      .then(data => {

        const dataResults = data.results.map((item, index) => {
          return { ...item, id: index };
        });

        this.setState({
          results: dataResults
        });
      });
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
         <h1 className="app__title">pokedex</h1>
        </header>
        <main className="app__main">
          <ul className="pokemon__list">
          {this.state.results.map((item, index) => {
            return (
              <li className="pokemon__list-item" key={index}>{item.name}</li>
            )
          })}
          </ul>
        </main>
        <footer className="app__footer">
          Footer
        </footer>
      </div>
    );
  }
}

export default App;
