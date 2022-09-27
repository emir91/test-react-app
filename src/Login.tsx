import * as React from 'react';
import { LoginService } from './services/LoginService';

interface CredentialState {
    username: string,
    password: string,
    isLoggedIn: boolean,
    loginAttempted: boolean
}

class Login extends React.Component<{}, CredentialState> {

    state: CredentialState = {
        username: "",
        password: "",
        isLoggedIn: false,
        loginAttempted: false
    }

    private loginService: LoginService = new LoginService()

    private async handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        console.log('CLICK !!!');
        const loginResponse = await this.loginService.login(this.state.username, this.state.password)
        this.setState({
            loginAttempted: true,
            isLoggedIn: loginResponse
        })
    }

    private setPassword(event: React.ChangeEvent) {
        const element = event.target as HTMLInputElement
        this.setState({password: element.value})
    }

    private setUsername(event: React.ChangeEvent) {
        const element = event.target as HTMLInputElement
        this.setState({username: element.value})
    }

    render() {
        let loginLabel;
        if(this.state.loginAttempted) {
            if(this.state.isLoggedIn) {
                loginLabel = <label>Login successful</label>
            } else {
                loginLabel = <label>Login failed</label>
            }
        }
        return (
            <div>
                <form data-test="login-form" onSubmit={e => this.handleSubmit(e)}>
                    <input data-test="username-input" name='username' value={this.state.username} onChange={e => this.setUsername(e)} /> <br/>
                    <input data-test="password-input" type="password" name="password" value={this.state.password} onChange={e => this.setPassword(e)} />    
                    <input data-test="submit-input" type="submit" value="Login" />
                </form>
                {loginLabel}                
            </div>
        );
    }
}

export default Login;