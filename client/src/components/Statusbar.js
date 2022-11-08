import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;

    if (auth.loggedIn && store.currentList)
    {
        return (
            <div id="playlister-statusbar">
                <Typography variant="h4">{text}</Typography>
            </div>
        );
    } 
    return null
}

export default Statusbar;