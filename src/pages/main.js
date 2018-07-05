import React from "react";
import axios from "axios";

class Main extends React.Component {
  static async getInitialProps(req) {
    console.log(arguments);
    return { 2: "fads" };
  }
  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:3002/api/test')
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return <div>ASfsad</div>;
  }
}

export default Main;
