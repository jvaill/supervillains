import React from 'react';
import ReactDOM from 'react-dom';
import villainGroup from './components/villainGroup';

const villains = [{id: '13', name:'Don Tattaglia'}, {id:'26', name:'Don Barzini'}];

ReactDOM.render(
  <villainGroup villains={villains} />,
  document.getElementById('app')
);