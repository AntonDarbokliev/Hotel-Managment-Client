import { RenderResult, render,screen, waitFor } from '@testing-library/react'
import { it, expect, describe,beforeEach } from 'vitest'
import { RoomReservartions } from '../../../components/RoomDetails/RoomReservations/RoomReservations'
import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { RoomReservation } from '../../../types/RoomReservation';
import userEvent from '@testing-library/user-event';


const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const now = new Date();
const currentMonth = now.getMonth() + 1
const year = now.getFullYear()

vi.mock('../../../hooks/Rooms/useReservations',() => ({
    useReservations: () => {
        const reservations: RoomReservation[] = [
            {
                from:  `${year}/${currentMonth}/23`,
                to: `${year}/${currentMonth}/24`,
                id: '123456789'
            },
        ]

        return {
            reservations,
            isLoading: false
        }
    }
}))

let lastMount: RenderResult;
describe('Room reservations', () => {

        const selectTwoDatesTest = async () => {
            const days = screen.getAllByTestId('day-card')
            const user = userEvent.setup()

            await user.click(days[28])
            await user.click(days[29])
            await waitFor(() => {
            expect(screen.getByText(/Make a reservation/i)).toBeInTheDocument() 
            })
        }

        const setUpRouteTest = ( ) => {
            const router = createMemoryRouter(
                [
                  {
                    path: '/room/123456789/reservations/123456789',
                    element: <>Navigated from Start</>,
                  },
                  {
                    path: '/room/123456789/reservations',
                    element: <RoomReservartions/>,
                  },
                ],
                {
                  initialEntries: ['/room/123456789/reservations'],
                }
              )
            
              render(<RouterProvider router={router} />)

              return {
                router
              }
        }

        beforeEach(() => {
            lastMount = render(<RoomReservartions />,{wrapper: BrowserRouter})
        })

        beforeAll(() => {
            localStorage.setItem('token','test')
        })

        it('displays correct month/year', async() => {
          
            await waitFor(() => {
                expect(screen.getByTestId('month')).toHaveTextContent(monthNames[currentMonth - 1])
                expect(screen.getByTestId('year')).toHaveTextContent(String(year))
            })
        })

        it('switches to next month correctly', async () => {
            const user = userEvent.setup()
            await user.click(screen.getByTestId('next-month'))
            
            if(monthNames[currentMonth - 1] == monthNames[11]){
                expect(screen.getByTestId('month')).toHaveTextContent(monthNames[0])
                expect(screen.getByTestId('year')).toHaveTextContent(String(year + 1))

            }else {
                expect(screen.getByTestId('month')).toHaveTextContent(monthNames[currentMonth - 1 + 1])
                expect(screen.getByTestId('year')).toHaveTextContent(String(year))

            }
        })

        it('hides/shows previous button when it should', async () => {
            
            if(screen.getByTestId('month').textContent == monthNames[currentMonth - 1] && 
             screen.getByTestId('year').textContent == String(year)
            ){
                expect(screen.queryByTestId('previous-month')).not.toBeInTheDocument()
            }else {
                expect(screen.queryByTestId('previous-month')).toBeInTheDocument()
            }

        })

        it('switches to previous month correctly', async () => {
            const user = userEvent.setup()
            await user.click(screen.getByTestId('next-month'))

            await user.click(screen.getByTestId('previous-month'))
            
                expect(screen.getByTestId('month')).toHaveTextContent(monthNames[currentMonth - 1])
                expect(screen.getByTestId('year')).toHaveTextContent(String(year ))
        })

        it('shows correct amount of days', () => {
            const totalDays = new Date(year, currentMonth, 0).getDate()

            expect(screen.getAllByTestId('day-card')).toHaveLength(totalDays)
        })

        it('shows add reservation button when selecting two dates', async () => {
            selectTwoDatesTest()
        })

        it('opens reservation modal', async () => {
            await selectTwoDatesTest()
            const user = userEvent.setup()
            await user.click(screen.getByText(/Make a reservation/i))
            expect(screen.getByText(/Reserve/i)).toBeInTheDocument()

        })

        it('redirects to reservation details on click', async () => {
            lastMount.unmount()
            const {router} = setUpRouteTest()
            const days = screen.getAllByTestId('day-card')
            const user = userEvent.setup()  

            await user.click(days[23])

            await waitFor(() => {
                expect(router.state.location.pathname).toEqual('/room/123456789/reservations/123456789')
            })

        })
        
})