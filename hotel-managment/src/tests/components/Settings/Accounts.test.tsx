import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Account } from '../../../components/Settings/Account/Account'
import { BrowserRouter } from 'react-router-dom'
// import { useAuthStore } from '../../../stores/Auth'

describe('Account Testing', () => {
    it('renders component', () => {
        // const user = useAuthStore(s => s.)
        render((
            <>
            <BrowserRouter>
                <Account/>
            </BrowserRouter>
            </>
        )) 
        const header = screen.getByText('Name')
        expect(header).toBeVisible()
        expect(header).toHaveTextContent('Name:')

    })
})