import React, { Component } from 'react';
import './App.css';
import { requestPokemons } from './services/PokemonService';

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
          <ul className="pokemons__list">
          {this.state.pokemon.map((item, index) => {
            return (
              <li className="pokemons__list-pokemon" key={index}>
              <img className="pokemon-image" src={item.image} alt={item.name}></img>
              <p className="pokemon-name">{item.name}</p>
              <p className="pokemon-id">{item.id}</p>
              <ul className="pokemon-types">{item.type.map((i, k) => {return <li key={k}>{i}</li>})}</ul>
              </li>
            )
          })}
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
