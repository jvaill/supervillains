import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
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
      {this.getVillains().map((villain, id) =>
        <div>
          <h1><a href={this.getUrl(id)}>{villain.name}</a></h1>
        </div>
      )}
    </div>;
  }
});