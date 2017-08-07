import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SummonerSearch, ItemList } from './App.js';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/' component={App} />
      <Route exact path='/' component={SummonerSearch} />
      <Switch>
        <Route path='/summoners' component={SummonerSearch} />
        <Route path='/items' component={ItemList} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
