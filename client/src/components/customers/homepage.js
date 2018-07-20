import React, { Component } from 'react';
import './homepage.css';

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      customers: [],
      name: ""
    }
  }
  componentDidMount() {
    fetch('/api/getUserInfo')
      .then(res => res.json())
      .then(customers => {
        this.setState({ customers }, () => {
          console.log("user fetched...", customers);
        })

        this.setState({ name: customers[0].firstName });
      }

      )
  }
  render() {
    return (
      <div className="">
        <h2>Welcome {this.state.name}</h2>
      </div>
    );
  }
}

export default HomePage;
