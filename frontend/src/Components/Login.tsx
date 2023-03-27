import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { UserContext } from '../Services/UserContext';
import { getUser } from "../Services/ApiClient";
import { useContext } from 'react';
import '../CSS/App.css';

export const LoginPage = () => {
    const { setUser } = useContext(UserContext);

    return <main className="LoginScreen">
        <h1>Welcome to MyDash</h1>
        <div className="LoginScreen--LoginButton">
            <GoogleLogin onSuccess={async (credentialResponse: CredentialResponse) => {
                const user = await getUser(credentialResponse.credential as string);
                setUser(user);
            }} onError={() => {
                console.log("Google Authentication Failed")
            }}
                useOneTap
            />
        </div>

    </main>
}
