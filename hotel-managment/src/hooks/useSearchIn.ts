import { useEffect, useRef } from "react"

interface objectInCollection {
    [key:string]: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useSearchIn = (searchInArray: any[], searchFunction: (x: objectInCollection) => boolean, searchValue:string) => {
    const filteredArr = useRef<any[]>([])

    useEffect(() => {
           filteredArr.current = searchInArray.filter(searchFunction)            
    },[searchValue])

    return {
        searchedArr: filteredArr.current
    }
}
