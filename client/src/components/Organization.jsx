import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getVillains: function() {
    return this.props.villains || [];
  },
  render: function() {
    return <div className="villainGroup">
    <img src="/img/logo.png" />
      {this.getVillains().map(villain =>
        <div>
          <h1>{villain.id} {villain.name}</h1>
        </div>
      )}
    </div>;
  }
});