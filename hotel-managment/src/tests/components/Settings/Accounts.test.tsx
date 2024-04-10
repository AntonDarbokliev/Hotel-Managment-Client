import { it, expect, describe,vi,beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Account } from '../../../components/Settings/Account/Account'
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

describe('Account Testing', () => {
   
    beforeAll(() => {
        render((
            <>
            <BrowserRouter>
                <Account/>
            </BrowserRouter>
            </>
        )) 
    })

    it('renders component', async () => {
        const resetOption =  screen.getByText('Reset',{exact: false})

        expect(resetOption).toBeInTheDocument()

    })


    it('shows user info', async () => {
      
        const role =  screen.getByText('Owner',{exact: false})
        const name =  screen.getByText('Anton Darbokliev',{exact: false})

        expect(role).toBeInTheDocument()
        expect(name).toBeInTheDocument()

    })
})