import React from 'react';
import {Map} from 'immutable';

const villains = Map({13: {'name':'Don Tattaglia'}, 26: {'name':'Don Barzini'}});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {villains: villains});
  }
});