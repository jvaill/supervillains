import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {getInfoIfNeeded} from '../actions';

// Pure component: fully driven by props
export const Villain = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() { 
      return this.props.componentDidMount(this.props.id);
  },
  render: function() {
    const { id, name, isFetching, fetched, wiseGuys, lastUpdated } = this.props;
    return <div className="villainGroup">
      <p>Number {id}</p>
      <h1>Everything you wanted to know about {name}</h1>
      <h3>Known associates:</h3>
      {isFetching &&
        <p>Fetching...</p>
      }
      {fetched && wiseGuys.length === 0 &&
        <p>None. {name} is an underdog.</p>
      }
      {fetched && wiseGuys.length !== 0 &&
        <p>A few wiseguys: {wiseGuys}.</p>
      }
      <p>Last updated at {lastUpdated}.</p>
    </div>;
  }
});

function mapStateToProps(state, ownProps) {
    console.log("Villain.mapStateToProps: " + JSON.stringify(state));
    var villainId = ownProps.params.id;
    var villain = state.villains.get(parseInt(villainId));
    return {
        villain: villain,
        id: villainId,
        name: villain.name,
        wiseGuys: villain.villains || [],
        lastUpdated: new Date(villain.lastUpdated).toLocaleTimeString(),
        fetched: villain.fetched,
        isFetching: villain.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        componentDidMount: function(id) {
            dispatch(getInfoIfNeeded(id));            
        }
    }
}

// Smart component: wraps the pure version with logic that will keep it in sync with the redux store.
export const ConnectedVillain = connect(mapStateToProps, mapDispatchToProps)(Villain);