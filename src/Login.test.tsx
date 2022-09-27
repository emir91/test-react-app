import ReactDOM from 'react-dom/client'
import { fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Login  from './Login'
import { LoginService } from './services/LoginService'

describe("Login test suite", () => {
    let container: HTMLDivElement;
    const loginSpy = jest.spyOn(LoginService.prototype, 'login')    

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
        act(() => {
            ReactDOM.createRoot(container).render(<Login/>)
        })
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    test('Renders correctly initial document', () => {
        const form = container.querySelector(`[data-test="login-form"]`)
        const usernameInput = container.querySelector(`[data-test="username-input"]`)
        const passwordInput = container.querySelector(`[data-test="password-input"]`)
        const submitInput = container.querySelector(`[data-test="submit-input"]`)
        
        expect(form).toBeInTheDocument()        
        expect(usernameInput?.getAttribute('name')).toBe('username')
        expect(passwordInput?.getAttribute('name')).toBe('password')
        expect(submitInput?.getAttribute('type')).toBe('submit')        
    })

    test('Passes credentials correctly', () => {
        const inputs = container.querySelectorAll('input')
        const usernameInput = inputs[0]
        const passwordInput = inputs[1]
        const submitInput = inputs[2]
        
        act(() => {
            fireEvent.change(usernameInput, { target: { value: 'someUser' } })
            fireEvent.change(passwordInput, { target: { value: 'somePass' } })
            fireEvent.click(submitInput)
        })
        expect(loginSpy).toBeCalledWith('someUser', 'somePass')
    })
})