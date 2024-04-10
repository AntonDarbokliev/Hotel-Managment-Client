import { it, expect, describe,vi } from 'vitest'
import { render, screen, } from '@testing-library/react'
import { Account } from '../../../components/Settings/Account/Account'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'


vi.mock("../../../stores/Auth", () => ({
    useAuthStore: (passedFunction: (data: object) => void) => {
        const data = {
            user: {
                fullName: 'Anton Darbokliev',
                role: "Owner",
                picture: "",
                id: "",
            },
            updateUser: vi.fn(),
            clearUser: vi.fn(),
        }

        return passedFunction(data);
    }
}));

describe('Account Page Testing', () => {

    let resetPasswordOption: HTMLElement;

    beforeEach(() => {
        render((
            <>
            <BrowserRouter>
                <Account/>
            </BrowserRouter>
            </>
        ))
        resetPasswordOption = screen.getByText('Reset',{exact: false})
    })

    it('renders component', async () => {
        expect(resetPasswordOption).toBeInTheDocument()
    })


    it('shows user info', async () => {
      
        const role =  screen.getByText('Owner',{exact: false})
        const name =  screen.getByText('Anton Darbokliev',{exact: false})

        expect(role).toBeInTheDocument()
        expect(name).toBeInTheDocument()

    })

    it('shows reset password modal', async () => {
        const user = userEvent.setup()

        user.click(resetPasswordOption)

        // expect(screen.getByText('Okay')).toBeInTheDocument()
        // expect(screen.getByRole('button',{name: 'Okay'})).toBeInTheDocument()
        
    })
})