import React from 'react';
import { Component } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions';

class SignupPage extends Component {
    render() {
        const { userSignupRequest } = this.props
        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-3'>
                    <SignupForm userSignupRequest={userSignupRequest}/>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest})(SignupPage);
