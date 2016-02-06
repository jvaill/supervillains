import React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'immutable';
import VillainGroup from './components/villainGroup';

const villains = List.of({id: '13', name:'Don Tattaglia'}, {id:'26', name:'Don Barzini'});

ReactDOM.render(
  <VillainGroup villains={villains} />,
  document.getElementById('app')
);