import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

// Pure component: fully driven by props
export const Villain = React.createClass({
  mixins: [PureRenderMixin],
  getVillain: function(id) {
    console.log("getVillain " + id);
    console.log("Getting " + JSON.stringify((this.props.villains.get(parseInt(id)))));
    return this.props.villains.get(parseInt(id)) || [];
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

function mapStateToProps(state) {
    console.log("Villain.mapStateToProps: " + JSON.stringify(state));
    return {
        villains: state.villains
    }
}

// Smart component: wraps the pure version with logic that will keep it in sync with the redux store.
export const ConnectedVillain = connect(mapStateToProps)(Villain);