import { render, screen } from '@testing-library/react'
import Login  from './Login'

describe("Login test suite", () => {
    

    beforeEach(() => {
        render(<Login/>)
    })

    

    test('Renders correctly initial document', () => {
        const usernameInput = screen.getByRole('textbox', {name: /username/i})
        const passwordInput = screen.getByRole('textbox', {name: /password/i})
        const submit = screen.getByRole('button', {name: /Login/i})
       
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
    })

})