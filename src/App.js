import React, { Component } from 'react';
import './App.css';
import { requestPokemons } from './services/PokemonService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      pokeSearch: ''
    };

    this.searchPokemon = this.searchPokemon.bind(this);
  }

  componentDidMount() {
    this.getPokemons();

  }

  getPokemons() {
    requestPokemons()
      .then(data => {
        const dataResults = data.results.map(item => {
          let urlPokemon = item.url;

          const requestUrl = fetch(urlPokemon).then(response => response.json());
          requestUrl.then(data => {
            console.log(data)
          })
        });

        
        this.setState({
          results: dataResults
        });
      });
  }

  searchPokemon(e) {
    const query = e.currentTarget.value;

    this.setState({
      pokeSearch: query
    })
  }

  // filterPokemons() {
  //   const filteredResults = this.state.results.filter(item => {
  //     const pokeName = item.name;
  //     return this.state.pokeSearch === '' || pokeName.toLocaleLowerCase().includes(this.state.pokeSearch.toLocaleLowerCase())
  //   })

  //   return filteredResults;
  // }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">pokedex</h1>
          <div className="app__field">
            <label className="app__field-text" htmlFor="search"></label>
            <input type="text" className="app__field-search" onKeyUp={this.searchPokemon} />
          </div>
        </header>
        <main className="app__main">
          <ul className="pokemon__list">
          </ul>
        </main>
        <footer className="app__footer">
          <p className="footer__text">Beatriz Gomez | © Adalab 2019</p>
        </footer>
      </div>
    );
  }
}

export default App;
