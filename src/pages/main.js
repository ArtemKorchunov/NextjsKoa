import React from "react";
import axios from "axios";
import Link from 'next/link'
import LoginForm from '../components/forms/login';

class Main extends React.Component {
  static async getInitialProps(req) {
    return {
      user: {
        email: '',
        password: '',
      }
    };
  }
  render() {
    return <div>
      <Link href="/dragDrop"><a>Go to drag and drop</a></Link>
      <Link href="/signup"><a>SignUp</a></Link>
      <LoginForm user={this.props.user} />
    </div>;
  }
}

export default Main;
