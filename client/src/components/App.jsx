import React from 'react';
import {List} from 'immutable';

const villains = List.of({id: '13', name:'Don Tattaglia'}, {id:'26', name:'Don Barzini'});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {villains: villains});
  }
});