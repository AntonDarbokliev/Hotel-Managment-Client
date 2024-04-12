import { render, screen } from '@testing-library/react'
import { it, expect, describe, beforeEach } from 'vitest'
import { Rooms } from '../../../../components/HotelDetails/Rooms/Rooms'
import { Room } from '../../../../types/RoomType'
import userEvent from '@testing-library/user-event'


vi.mock('../../../../hooks/Rooms/useRooms',() => ({
    useRooms: () => {
        const rooms: Room[] = [

            {
                floor: {
                floorNumber: 1,
                id: 'hm11mu4d14su'
            },
            id: '5126hrn1cm91h9',
            isBooked: false,
            isCleaned: false,
            roomExtras: [],
            roomNumber: 1
        },

        {
            floor: {
            floorNumber: 2,
            id: 'hm11mu4d14su'
        },
        id: '5126hrn1cm91h9',
        isBooked: true,
        isCleaned: true,
        roomExtras: [{name: 'Extra',roomId: '5126hrn1cm91h9'}],
        roomNumber: 1
    },

        ]

        return {
            rooms
        }
    } 
}))

describe('Rooms page ', () => {
    beforeEach(() => {
        render(<Rooms/>)
    })

    it('renders', () => {
        expect(screen.getByRole( 'button',{name: /add a room/i})).toBeInTheDocument()
        expect(screen.getByRole( 'button',{name: /add a floor/i})).toBeInTheDocument()
    })

    it('renders rooms',(() => {
        const user = userEvent.setup()
        //TODO: Click on dropdown, then on floor, fix the useRooms hook mock if u have to.
    }))
})