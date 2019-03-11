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
                <div className="image__container">
                  <img className="pokemon__image" src={item.image} alt={item.name}></img>
                </div>
                <div className="info__container">
                  <div className="pokemon__id">ID / {item.id}</div>
                  <h2 className="pokemon__name">{item.name}</h2>
                  <ul className="pokemon__types">{item.type.map((i, k) => { return <li className="pokemon__types-item" key={k}>{i}</li> })}</ul>
                </div>
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