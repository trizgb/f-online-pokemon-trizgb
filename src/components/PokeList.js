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
              <div className="pokemon__wrapper">
                <img className="pokemon__image" src={item.image} alt={item.name}></img>
                <div className="pokemon__id">ID / {item.id}</div>
                <h2 className="pokemon__name">{item.name}</h2>
                <ul className="pokemon__types">{item.type.map((i, k) => { return <li key={k}>{i}</li> })}</ul>
              </div>
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