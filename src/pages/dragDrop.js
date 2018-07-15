import React from "react";
import axios from "axios";
import DragDrop from '../components/dragDrop';

class Index extends React.Component {
    static async getInitialProps(req) {
        return {};
    }
    render() {
        return (
            <DragDrop />
        )
    }
}

export default Index;
