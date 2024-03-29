import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1 className="text-center">Sign In</h1>
        <SignInForm />
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error })
            })

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div className="d-flex align-items-center flex-column">
                <div className="jumbotron w-50">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="email"
                                placeholder="Email Address"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Sign In
                        </button>

                        {error && <p className="text-danger">{error.message}</p>}
                    </form>
                </div>

                <PasswordForgetLink />
                <SignUpLink />
            </div>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };