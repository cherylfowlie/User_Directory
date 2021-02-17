import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [], searchName: '', alphabetical: 'az' };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=150")
      .then(response => {
        this.setState({ users: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let sortedUsers;

    if (this.state.alphabetical === "az") {
      console.log("sort");
      sortedUsers = this.state.users.sort((a, b) =>
        a.name.first > b.name.first ? 1 : -1
      );
    } else {
      sortedUsers = this.state.users.sort((a, b) =>
        a.name.first < b.name.first ? 1 : -1
      );
    }

    let filteredUsers = sortedUsers;

    if (this.state.searchName)
      filteredUsers = this.state.users.filter(u =>
        u.name.first.startsWith(this.state.searchName)
      );

    const randomNames = filteredUsers.map(u => {
      return <User key={u.email} name={u.name.first} age={u.dob.age} />;
    });
    return (
      <div class="col" >
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for user:
            <input
              type="text"
              name="searchName"
              value={this.state.searchName}
              onChange={this.handleChange}
            />
          </label>
          <input class="btn btn-primary" type="submit" value="Submit" />
        </form>

        <select class="btn btn-secondary dropdown-toggle"
          name="alphabetical"
          value={this.state.alphabetical}
          onChange={this.handleChange}
        >
          <option selected value="az">
            A to Z
          </option>
          <option value="za">Z to A</option>
        </select>



        {randomNames}

      </div>
    );
  }
}

class User extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h3>{this.props.age}</h3>
      </div>
    );
  }
}

export default App;