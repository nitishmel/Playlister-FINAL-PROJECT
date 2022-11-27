import { Button } from '@mui/material';
import mainLogo from'../logo.png';
import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <img  src={mainLogo} style={{width: 300, paddingLeft: 225}} />
            <button
                style = {{
                    width: 100,
                    height: 50,
                    fontSize: '14pt',
                    transform: 'translate(-650%, 645%)'
                }}
            >
                <Link to='/register/'>Create Account</Link>
            </button>

            <button
                style = {{
                    width: 100,
                    height: 50,
                    fontSize: '14pt',
                    transform: 'translate(-300%, 630%)'
                }}
            >
                <Link to='/login'>Login</Link>
            </button>

            <button
                style = {{
                    width: 100,
                    height: 50,
                    fontSize: '14pt',
                    transform: 'translate(5%, 660%)'
                }}
            >
                <Link to='/login'>Continue As Guest</Link>
            </button>

            <h1 style={{fontSize: "2rem", paddingRight: 70, color: 'black', transform: 'translate(0%, 10%)'}}>Welcome to Playlister!</h1>
            <h1 style={{fontSize: "1.3rem", paddingRight: 70, color: 'black', transform: 'translate(0%, 100%)'}}>With this application, you can create and edit your own playlists, browse others' playlists, and so much more. Welcome, and enjoy Playlister!</h1>
            <h1 style={{fontSize: "0.7rem", paddingRight: 70, color: 'black', transform: 'translate(45%, 1800%)'}}>Developed By Nitish Meloottu</h1>
        </div>
    )
}