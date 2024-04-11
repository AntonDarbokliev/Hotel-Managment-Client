import { it, expect, describe,vi } from 'vitest'
import { render, screen, waitFor, } from '@testing-library/react'
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

describe('Account Page', () => {

    let resetPasswordOption: HTMLElement;

    beforeEach(() => {
        render(<Account/>, {wrapper: BrowserRouter})
        resetPasswordOption = screen.getByText(/Reset/i,{exact: false})
    })

    it('renders component', async () => {
        expect(resetPasswordOption).toBeInTheDocument()
        expect(screen.getByText(/Anton Darbokliev/i)).toBeInTheDocument()
    })


    it('shows user info', async () => {
      
        const role =  screen.getByText('Owner',{exact: false})
        const name =  screen.getByText('Anton Darbokliev',{exact: false})

        expect(role).toBeInTheDocument()
        expect(name).toBeInTheDocument()

    })

    it('shows reset password modal', async () => {
        const user = userEvent.setup()

        user.click(screen.getByTestId('reset-pass'))
        
        await waitFor(() => screen.getByText(/Okay/i))
        expect(screen.getByText(/Okay/i)).toBeInTheDocument()
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument()
    })
})