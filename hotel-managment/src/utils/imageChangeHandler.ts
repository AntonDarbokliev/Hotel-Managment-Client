import { FormEvent } from "react"

export const onImageChangeHandler = (e: FormEvent, imageSetter: React.Dispatch<React.SetStateAction<File | undefined>>) =>{
    const target = e.target as HTMLInputElement & {
        files: FileList
    }
    imageSetter(target.files[0])
}
