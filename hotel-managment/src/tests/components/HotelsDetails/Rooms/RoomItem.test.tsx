import { render, screen, waitFor } from '@testing-library/react'
import { it, expect, describe} from 'vitest'
import { RoomItem } from '../../../../components/HotelDetails/Rooms/RoomItem/RoomItem'
import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('Room item', () => {

    it('renders', () => {
        render(<RoomItem id='1234567' number={1}/>,{wrapper: BrowserRouter})
        expect(screen.getByText('1')).toBeTruthy()
    })

    it('redirects to correct page', async () => {
        const router = createMemoryRouter(
            [
              {
                path: '/room/1234567/info',
                element: <>Navigated from Start</>,
              },
              {
                path: '/hotels/1234567/rooms',
                element: <RoomItem id='1234567' number={1}/>,
              },
            ],
            {
              initialEntries: ['/hotels/1234567/rooms'],
            }
          )
        
          render(<RouterProvider router={router} />)
      
          expect(router.state.location.pathname).toEqual('/hotels/1234567/rooms')

          const user = userEvent.setup()
          await user.click(screen.getByText('1'))
          
          await waitFor(() => {
              expect(router.state.location.pathname).toEqual('/room/1234567/info')
          })
    })
})