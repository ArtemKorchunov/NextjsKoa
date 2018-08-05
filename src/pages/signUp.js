import React from "react";
import Link from 'next/link'
import axios from 'axios';
import SignUpForm from '../components/forms/register';

class Main extends React.Component {
    static async getInitialProps(req) {
        return {};
    }
    onSubmit = async (values) => {
        try {
            const res = await axios.post('/auth/token', {
                data: values
            })
        } catch (err) {
            console.log(err.response.data);
        }

    }
    render() {
        return (
            <div className="page-wrap center">
                <SignUpForm
                    user={this.props.user}
                    onSubmit={this.onSubmit}
                    className="form-wrap"
                    formClass="form-column"
                />
                <style jsx>{`
                    .page-wrap {
                        display: flex;
                        justify-content: center;
                    }
                `}</style>
            </div>
        )
    }
}

export default Main;
