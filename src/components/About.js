import React, { Component } from 'react';
import UserClass from './UserClass';
import User from './User';

class About extends Component {
  constructor (props) {
    super(props);
    console.log('Parent constructor');
    this.state = {
      userIfnfo: {
        name: 'Dummy',
        location: 'dummy',
        contact: 'dummy'
      }
    }
  }

  async componentDidMount() {
    console.log('Parent Component Did Mount');
    const data = await fetch("https://api.github.com/users/optimusvish");
    const json = await data.json();
    this.setState({
      userIfnfo: json
    });
  }

  render() {
    console.log('parent render');
    const {name, location, login, avatar_url} = this.state.userIfnfo;
    return (
      <div className='about-us'>
        <h1>About Us</h1>
        <p>Hello, This is Swiggy Clone App</p>
        {/* <User 
          name={name}
        /> */}
        <UserClass name={name} location={location} contact={'@' + login} avatar_url={ avatar_url }/>
    </div>
    );
  }
};


// const About = () => {
//   return (
//     <div className='about-us'>
//         <h1>About Us</h1>
//         <p>Hello, This is Swiggy Clone App</p>
//         {/* <User 
//           name={'Vishnuvardhan (function)'}
//         /> */}
//         <UserClass name={'Vishnuvardhan (Class)'} location={'Kurnool (class)'} contact={'@optimusvish (class)'}/>
//     </div>
//   )
// }

export default About;
