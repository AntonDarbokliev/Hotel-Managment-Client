import { useEffect, useState } from "react"
import { floorServiceFactory } from "../../services/floors"
import { useParams } from "react-router-dom"
import { FormValues } from "../../types/FormValues"

export const useSetFloors = (formValues: FormValues) => {

    const [floors, setFloors ] = useState<{floorNumber:number,id:string }[]>([])
    const [ floor, setFloor] = useState<{floorNumber:number,id:string }>({floorNumber:0,id:'0' })

    const floorService = floorServiceFactory()
    const params = useParams()

    useEffect(() => {
        floorService.get(String(params.id))
        .then( data => setFloors(data.floors))
        .catch(err => console.error(err))
    },[])

    useEffect(() => {
        if(formValues.floorValue !== ''){
            const currentFloor = floors.find(x => String(x.floorNumber) == formValues.floorValue)
            if(currentFloor)
            setFloor(currentFloor)
        }else {
            setFloor({floorNumber:0,id:'0' })
        }
    },[formValues.floorValue])
    
    return {
        floors,
        floor,
        setFloors
    }
}