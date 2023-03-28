import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { UserContext } from '../Services/UserContext';
import { getUser } from "../Services/ApiClient";
import { useContext, useState } from 'react';


export const LoginPage = () => {
    const { setUser } = useContext(UserContext);
    const [ showLoadingAnimation, setShowLoadingAnimation ] = useState(false);

    return (
        <main id="LoginScreen" className="h-screen flex flex-col justify-between items-center">
            <h1 id="WelcomeMessage" className="mt-60 text-7xl">Welcome to MyDash</h1>
            
            {
                showLoadingAnimation && <img src="./LoadingAnimation.svg" alt="Loading Animation" />
            }

            <div id="LoginButton" className="mb-40">
                <GoogleLogin onSuccess={async (credentialResponse: CredentialResponse) => {
                    setShowLoadingAnimation(true);
                    const user = await getUser(credentialResponse.credential as string);
                    setUser(user);
                }} onError={() => {
                    console.log("Google Authentication Failed")
                }}
                    useOneTap auto_select
                />
            </div>
        </main>
    )
}
