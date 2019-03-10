import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {

  render() {
    const { actionFilter } = this.props;

    return (
      <div className="app__field">
        <label className="app__field-text" htmlFor="search"></label>
        <input type="text" className="app__field-search" onKeyUp={actionFilter} />
      </div>
    )
  }
}

Filter.propTypes = {
  actionFilter: PropTypes.func.isRequired
}

export default Filter;