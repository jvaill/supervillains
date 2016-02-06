import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getVillain: function(id) {
    return this.props.villains || [];
  },
  getVillainId: function() {
      return this.props.params.id || "";
  },
  render: function() {
    return <div className="villainGroup">
      <h1>Everything you wanted to know about {this.getVillainId}</h1>
      <p>get villains name from getVillain. Pass in villain information as map, not list!</p>
      <h3>Known associates:</h3>
    )}
    </div>;
  }
});