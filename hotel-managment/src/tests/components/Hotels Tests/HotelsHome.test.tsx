import { RenderResult, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe,beforeEach } from 'vitest';
import { HotelsHome } from '../../../components/HotelsHome/HotelsHome';
import { BrowserRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

let lastMount: RenderResult;
describe('Hotels Home Page', () => {

    beforeAll(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZGEzMjc2NC00NDA5LTRkNmUtOTgzMi1mMzFlYTY4M2Y4MjAiLCJQcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R4eGp5cWJ6dC9yYXcvYXV0aGVudGljYXRlZC9zLS1QX2k4QWZjci0tL3YxNzExNTY2NzMxL1Byb2ZpbGVQaWN0dXJlcy83MTdkYThmNC01N2ViLTQxOTEtODg3Yi03ZmY5NGJmZjI3ZjYucG5nIiwiRnVsbE5hbWUiOiJBbnRvbiBEYXJib2tsaWV2Iiwicm9sZSI6Ik93bmVyIiwibmJmIjoxNzEyODUxMDMwLCJleHAiOjE3MTI4NjE4MzAsImlhdCI6MTcxMjg1MTAzMCwiaXNzIjoibXlpc3N1ZXIiLCJhdWQiOiJteWF1ZGllbmNlIn0.2A27wbbW3TvumaWIduKbp2JjBxS_5T1jyuhTraPqKHw')        
    })

    const setupMyTest = () => {
        const router = createMemoryRouter(
          [
            {
              path: '/add',
              element: <>Navigated from Start</>,
            },
            {
              path: '/hotels',
              element: <HotelsHome />,
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
        lastMount = render(<HotelsHome/>, {wrapper: BrowserRouter})
    })

    it('renders', () => {
        expect(screen.getByText(/more hotels?/i)).toBeInTheDocument()
        expect(screen.getByText(/Add/i)).toBeInTheDocument()
    })

    it('redirects to add hotel page', async () => {
        lastMount.unmount()
        const { router } = setupMyTest()

        expect(router.state.location.pathname).toEqual('/hotels')

        const user =  userEvent.setup()
        const addBtn = screen.getByText(/Add/i)
        await user.click(addBtn)

        await waitFor(() => {
            expect(router.state.location.pathname).toEqual('/add')
        })
    })
})
