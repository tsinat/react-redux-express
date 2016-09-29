import React from 'react';
import { Component } from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map';
import axios from 'axios';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timeZone: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('/api/users', { user: this.state });
    }
    render() {
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>
                <div className='from-group'>
                    <label className='control-label'>UserName:</label>
                    <input
                        value={this.state.username}
                        onChange={this.handleChange}
                        type='text'
                        name='username'
                        className='form-control'
                    />
                </div>
                <div className='from-group'>
                    <label className='control-label'>Email:</label>
                    <input
                        value={this.state.email}
                        onChange={this.handleChange}
                        type='email'
                        name='email'
                        className='form-control'
                    />
                </div>
                <div className='from-group'>
                    <label className='control-label'>Password:</label>
                    <input
                        value={this.state.password}
                        onChange={this.handleChange}
                        type='password'
                        name='password'
                        className='form-control'
                    />
                </div>
                <div className='from-group'>
                    <label className='control-label'>Password Confirmation:</label>
                    <input
                        value={this.state.passwordConfirmation}
                        onChange={this.handleChange}
                        type='password'
                        name='passwordConfirmation'
                        className='form-control'
                    />
                </div>
                <div className='from-group'>
                    <label className='control-label'>Timezone:</label>
                    <select
                        className='form-control'
                        name='timezone'
                        value={this.state.timezone}
                        onChange={this.handleChange}
                    >
                    <option value='' disabled>Choose Your Timezone</option>
                    {options}
                    </select>
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary btn-lg'>
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm;
