import React, { Component } from 'react';
import { requestPokemons } from './services/PokemonService';
import Filter from './components/Filter';
import PokeList from './components/PokeList';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      pokeSearch: ''
    };

    this.searchPokemon = this.searchPokemon.bind(this);
  }

  componentDidMount() {
    this.getPokemons();

  }

  getPokemons() {
    let pokemonDataUrl = [];

    requestPokemons()
      .then(data => {
        data.results.map(item => {
          let urlPokemon = item.url;

          let requestUrl = fetch(urlPokemon).then(response => response.json());
          requestUrl.then(data => {
            pokemonDataUrl.push(data);
            this.getInfoPokemon(pokemonDataUrl);
          });
          return requestUrl;
        });
      });
  }

  getInfoPokemon(data) {
    let pokemonInfo = [];

    data.map(item => {
      let types = [];
      item.types.map(pokeTypes => {
        return types.push(pokeTypes.type.name);
      })

      let pokeJson = {
        'id': item.id,
        'name': item.name,
        'type': types,
        'image': item.sprites.front_default
      }

      pokemonInfo.push(pokeJson);
      this.setState({
        pokemon: pokemonInfo.sort(((a, b) => a.id - b.id))
      });

      return pokemonInfo;

    });
  }

  searchPokemon(e) {
    const query = e.currentTarget.value;

    this.setState({
      pokeSearch: query
    })
  }

  filterPokemon() {
    const filteredResults = this.state.pokemon.filter(item => {
      const name = item.name;

      return (name.toLocaleUpperCase().includes(this.state.pokeSearch.toLocaleUpperCase()))
    })
    return filteredResults;
  }


  render() {
    const filterPokemonResults = this.filterPokemon();

    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__header-title">pokedex</h1>
          <Filter actionFilter={this.searchPokemon} />
          <div className="triangle t-left"></div>
          <div className="triangle t-right"></div>
        </header>
        <main className="app__main">
          <PokeList filterPokemonR={filterPokemonResults} />
        </main>
        <footer className="app__footer">
          <p className="app__footer-text">Beatriz Gomez | © Adalab 2019</p>
          <div className="circle c-left"></div>
          <div className="circle c-right"></div>
        </footer>
      </div>
    );
  }
}

export default App;
