import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <NavbarContainer />
          <div className="App-header">
            <img src="http://www.capsulecomputers.com.au/wp-content/uploads/2011/11/League-of-Legends-Clear-Background-Logo-01.png" className="App-logo" alt="logo" />
          </div>
        </div>
    );
  }
};

class NavbarContainer extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">League of Legends</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>
            <Link to="/summoners">Summoners</Link>
          </NavItem>
          <NavItem>
            <Link to="/items">Items</Link>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
};






export class SummonerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.searchSummoners = this.searchSummoners.bind(this);
  }

  searchSummoners() {
    const parent = this;
    fetch('http://localhost:8080/api/summoner/'+this.state.summoner_name, {
      method: 'GET'
    }).then(function(response) {
      return response.json();
    }).then(function(response) {
      parent.setState({ summoner_data: response })
    });
  }

  handleChange(e) {
    this.setState({ summoner_name: e.target.value });
  }

  render() {
    return (
      <div className="SummonerSearch-cont">
        <h3>Search for Summoner</h3>
        <div className="input-group SummonerSearch-grp">
          <input type="text" className="form-control" onChange={ this.handleChange }/>
          <span className="input-group-btn">
            <button className="btn btn-primary" onClick={this.searchSummoners}>Search</button>
          </span>
        </div>
        <br/>
        {JSON.stringify(this.state.summoner_data)}
      </div>
    )
  } 
};







export class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {items: null};
    const parent = this;

    fetch('http://localhost:8080/api/items', {
      method: 'GET'
    }).then(function(response) {
      return response.json();
    }).then(function(response) {
      parent.setState({ items: response.data.data })
    });
  }

  _renderItem(key) {
    return (
      <div>
        {this.state.items[key]['name']}
      </div>
    );
  }

  render() {
    if (this.state.items) {
      return (
        <div className="App">
          <ul className="list-unstyled">
            {Object.keys(this.state.items).map((key, idx) => { return <li key={key}>{this._renderItem(key)}</li> }) }
          </ul>
        </div>
      )
    } else {
      return <ul></ul>
    }
  }
};

export default App;
