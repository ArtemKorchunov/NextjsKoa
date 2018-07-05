import React from "react";
import axios from "axios";
import LoginForm from '../components/forms/login';

class Main extends React.Component {
  static async getInitialProps(req) {
    return {
      2: "fads",
      user: {
        email: '',
        social: {
          facebook: '',
          twitter: '',
        }
      }
    };
  }
  render() {
    console.log(this.props.user);
    return <div><LoginForm user={this.props.user} /></div>;
  }
}

export default Main;
