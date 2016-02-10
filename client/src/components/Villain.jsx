import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

// Pure component: fully driven by props
export const Villain = React.createClass({
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

function mapStateToProps(state) {
    console.log(JSON.stringify(state.get('villains')));
    return {
        villains: state.get('villains')
    }
}

// Smart component: wraps the pure version with logic that will keep it in sync with the redux store.
export const ConnectedVillain = connect(mapStateToProps)(Villain);