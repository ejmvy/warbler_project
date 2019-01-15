import React, { Component } from 'react';
import errors from '../store/reducers/errors';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            profileImageUrl: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //determine the type of request to make
        const authType = this.props.signUp ? 'signup' : 'signin';
        this.props
            .onAuth(authType, this.state)
            .then(() => {
                console.log('signed in successfully!!!')
                this.props.history.push('/')
        }).catch(() => {
            return; 
        })
    }

    render() {
        const { email, username, password, profileImageUrl } = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;
        
        //listen on history if any change in route. if change then remove errors;
        history.listen(() => {
            removeError();
        })

        return(
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className='col-md-6'>
                        <form className="mainForm" onSubmit={this.handleSubmit}>
                            <h2 className="welcomeTitle">{heading}</h2>
                            {errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
                            <label htmlFor='email'>Email:</label>
                            <input 
                                className="form-control" 
                                id='email' 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email}
                                type='text'
                            />
                            <label htmlFor='password'>Password:</label>
                            <input 
                                className="form-control" 
                                id='password' 
                                name="password" 
                                onChange={this.handleChange}
                                type='password'
                            />
                            {signUp && (
                                <div>
                                    <label htmlFor='username'>Username:</label>
                                    <input 
                                        className="form-control" 
                                        id='username' 
                                        name="username" 
                                        onChange={this.handleChange} 
                                        value={username}
                                        type='text'
                                    />
                                    <label htmlFor='image-url'>Image URL::</label>
                                    <input 
                                        className="form-control" 
                                        id='image-url' 
                                        name="profileImageUrl" 
                                        onChange={this.handleChange}
                                        type='text'
                                        value={profileImageUrl}
                                    /> 
                                </div>
                            )}
                            <button type='submit' className="signupBtn">{buttonText}</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}