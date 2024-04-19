export interface ErrorObj {
    error?: string,
    errors: {
        [key:string]: string[] 
    }
}