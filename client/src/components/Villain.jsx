import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getVillain: function(id) {
    return this.props.villains.get(id) || [];
  },
  getVillainId: function() {
      return this.props.params.id || "";
  },
  render: function() {
    return <div className="villainGroup">
      <p>Number {this.getVillainId()}</p>
      <h1>Everything you wanted to know about {this.getVillain(this.getVillainId()).name}</h1>
      <h3>Known associates:</h3>
    )}
    </div>;
  }
});