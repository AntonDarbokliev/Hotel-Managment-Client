import { render,screen, waitFor } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { Employees } from '../../../../components/HotelDetails/Employees/Employees'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'


describe('Employees page', () => {
    beforeAll(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhZGEzMjc2NC00NDA5LTRkNmUtOTgzMi1mMzFlYTY4M2Y4MjAiLCJQcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R4eGp5cWJ6dC9yYXcvYXV0aGVudGljYXRlZC9zLS1QX2k4QWZjci0tL3YxNzExNTY2NzMxL1Byb2ZpbGVQaWN0dXJlcy83MTdkYThmNC01N2ViLTQxOTEtODg3Yi03ZmY5NGJmZjI3ZjYucG5nIiwiRnVsbE5hbWUiOiJBbnRvbiBEYXJib2tsaWV2Iiwicm9sZSI6Ik93bmVyIiwibmJmIjoxNzEyODUxMDMwLCJleHAiOjE3MTI4NjE4MzAsImlhdCI6MTcxMjg1MTAzMCwiaXNzIjoibXlpc3N1ZXIiLCJhdWQiOiJteWF1ZGllbmNlIn0.2A27wbbW3TvumaWIduKbp2JjBxS_5T1jyuhTraPqKHw')        
    })


    beforeEach(() => {
        render(<Employees/>)
    })

    it('renders', () => {
        expect(screen.getByText('Employees')).toBeInTheDocument()
        expect(screen.getByRole('button',{name: /add/i})).toBeInTheDocument()
    })

    it('opens add an employee modal',async () => {
        const user = userEvent.setup()

        act( async () => {
            await user.click(screen.getByTestId('add'))
        })

        await waitFor(() => {
            screen.getByText(/role/i)
        })
        expect(screen.getByRole('button',{name:/add/i})).toBeInTheDocument()
        expect(screen.getByText(/name/i)).toBeInTheDocument()
        expect( screen.getByText(/role/i)).toBeInTheDocument()
    })
})