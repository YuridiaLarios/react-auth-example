import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { API_URL } from './../constants';
import axios from 'axios';
import './Ping.css';

class Ping extends Component {

   // CONSTRUCTOR
   constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: ''
    }
  }

    
  // componentWillMount() {
  //   this.setState({ 
  //     message: '',
  //     allUsers: [],
  //     error: false
  //  });
  // }


  // componentDidMount(){
  //   axios.get(`http://localhost:3001/api/allusers`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({
  //       allUsers: data
  //     })
  //   })
  //   .catch((error) => {
  //     this.setState({
  //       error: true
  //     })
  //   });
  // }


  // componentDidMount() {
  //   const url = `${API_URL}/allUsers`;

  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       this.setState({
  //         users: data
  //       })
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         error: true
  //       })
  //     });
  // }



  ping() {
    axios.get(`${API_URL}/public`)
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedPing() {
    const { getAccessToken } = this.props.auth;
    console.log(`this is the token: ${getAccessToken()}`)
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.get(`${API_URL}/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  
  getSecuredAllUsers() {
    console.log("running  function");
    const url = `${API_URL}/allUsers`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          users: data
        })
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  }




  render() {
    console.log(this.state.allUsers);
    const { isAuthenticated } = this.props.auth;
    const { message } = this.state;
    return (
      <div className="container">
        <h1>Make a Call to the Server</h1>
        {
          !isAuthenticated() &&
            <p>Log in to call a private (secured) server endpoint.</p>
        }
        <Button bsStyle="primary" onClick={this.ping.bind(this)}>Ping</Button>
        {' '}
        {
          isAuthenticated() && (
              <Button bsStyle="primary" onClick={this.securedPing.bind(this)}>
                Call Private
              </Button>
            )
        }
        {' '}
        {
          isAuthenticated() && (
              <Button bsStyle="primary" onClick={this.getSecuredAllUsers.bind(this)}>
                Get All users
              </Button>
            )
        }

        <h2>{message}</h2>
        
        <div>
          <h4>All users:</h4> 
          <ul>
            {
              this.state.users.map(function(item, i){
              return (
                <div>
                  <li key={i}>{item.username} | {item.email} |
                   <img className="thumbnail" src={item.thumbnailFile}  alt="Profile picture"></img>
                  </li> 
                </div>
              );
            })  
            }
          </ul>
        </div>        
      </div>
    );
  }
}

export default Ping;
