import React from 'react';
import { Component } from 'react';
import timezones from '../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../server/shared/validations/signup';
import TextFieldGroup from './common/TextFieldGroup';


class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if(!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()){
            this.setState({errors: {}, isLoading:true});
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have signed up successfully, Welcome!'
                    })
                    this.context.router.push('/');
                },
                ({ data }) => this.setState({errors: data, isLoading:false})
            );
        }
    }
    render() {
        const { errors } = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                    <TextFieldGroup
                        error={errors.username}
                        label='UserName'
                        onChange={this.onChange}
                        value={this.state.username}
                        field='username'
                    />

                    <TextFieldGroup
                        error={errors.email}
                        label='Email'
                        onChange={this.onChange}
                        value={this.state.email}
                        field='email'
                        type='email'
                    />

                    <TextFieldGroup
                        error={errors.password}
                        label='Password'
                        onChange={this.onChange}
                        value={this.state.password}
                        field='password'
                        type='password'
                    />

                    <TextFieldGroup
                        error={errors.passwordConfirmation}
                        label='passwordConfirmation'
                        onChange={this.onChange}
                        value={this.state.passwordConfirmation}
                        field='passwordConfirmation'
                        type='password'
                    />

                <div className={classnames('from-group', {'has-error':errors.timezone})}>
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
                    {errors.timezone && <span className='help-block'>{errors.timezone}</span>}
                </div>

                <div className='form-group'>
                    <button disabled={this.state.isLoading } className='btn btn-primary btn-lg'>
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignupForm;
