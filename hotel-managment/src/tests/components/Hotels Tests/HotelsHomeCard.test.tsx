import { it, expect, describe } from 'vitest'
import { RenderResult, render,screen, waitFor } from '@testing-library/react'
import { HotelsHomeCard } from '../../../components/HotelsHome/HotelsHomeCard/HotelsHomeCard'
import { BrowserRouter, RouterProvider, createMemoryRouter} from 'react-router-dom'
import { Hotel } from '../../../types/HotelTypes'
import userEvent from '@testing-library/user-event'

const testHotel: Hotel = {
    address: 'Test Address',
    email: 'test@gmail.com',
    id: '123456789',
    name: 'Test Hotel',
    profilePicture: 'https://test'
}

let lastMount: RenderResult;
describe('Hotels Home Card', () => {
    
    const setupMyTest = () => {
        const router = createMemoryRouter(
          [
            {
              path: '/hotels/123456789/rooms',
              element: <>Navigated from Start</>,
            },
            {
              path: '/hotels',
              element: <HotelsHomeCard hotel={testHotel}/>,
            },
          ],
          {
            initialEntries: ['/hotels'],
          }
        )
      
        render(<RouterProvider router={router} />)
    
        return { router }
      }

    beforeEach(() => {
        lastMount = render(<HotelsHomeCard hotel={testHotel}/>,{wrapper: BrowserRouter})
    })

    it('renders', () => {
        expect(screen.getByRole('img')).toBeInTheDocument()
        expect(screen.getByText('Test Address')).toBeInTheDocument()
        expect(screen.getByText('Test Hotel')).toBeInTheDocument()
    })

    it('redirects to hotel details', async () => {
        lastMount.unmount()
        const { router } = setupMyTest()
        expect(router.state.location.pathname).toEqual('/hotels')

        const user = userEvent.setup()
        await user.click(screen.getByText('Test Hotel'))
        await waitFor(() => {
            expect(router.state.location.pathname).toEqual('/hotels/123456789/rooms')
        })
    })
})