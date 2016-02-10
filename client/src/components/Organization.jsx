import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

// Pure component: fully driven by props
export const Organization = React.createClass({
  mixins: [PureRenderMixin],
  getVillains: function() {
    return this.props.villains || [];
  },
  getUrl: function(id) {
      console.log("Get URL: "+"/"+id);
    return "/#/"+id;
  },
  render: function() {
    return <div className="villainGroup">
      {this.getVillains().valueSeq().map((villain, id) =>
        <div>
          <h1><a href={this.getUrl(id)}>{villain.name}</a></h1>
        </div>
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
export const ConnectedOrganization = connect(mapStateToProps)(Organization); 