import { Details } from "../Shared/Details/Details"

export const Settings = () => {
    // Temporary variables
    const isLoading = false
    const title = 'Settings'
    
    const tabs = ['Account', 'Employees','Preferences']

    return (
        <Details route='settings' isLoading={isLoading} title={title} tabs={tabs}></Details>
    )
}