import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PokeList extends Component {
  render() {
    const { filterPokemonR } = this.props;
    return (
      <ul className="pokemons__list">
        {filterPokemonR.map((item, index) => {
          return (
            <li className="pokemons__list-pokemon" key={index}>
              <img className="pokemon-image" src={item.image} alt={item.name}></img>
              <p className="pokemon-name">{item.name}</p>
              <p className="pokemon-id">{item.id}</p>
              <ul className="pokemon-types">{item.type.map((i, k) => { return <li key={k}>{i}</li> })}</ul>
            </li>
          )
        })}
      </ul>
    )
  }
}

PokeList.propTypes = {
  filterPokemonR: PropTypes.arrayOf(PropTypes.object)
}

export default PokeList;