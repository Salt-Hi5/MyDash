import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { UserContext } from '../Services/UserContext';
import { getUser } from "../Services/ApiClient";
import { useContext } from 'react';
import '../../dist/output.css';


export const LoginPage = () => {
    const { setUser } = useContext(UserContext);

    return (
        <main id="LoginScreen" className="">
            <h1>Welcome to MyDash</h1>
            <div id="LoginButton" className="">
                <GoogleLogin onSuccess={async (credentialResponse: CredentialResponse) => {
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
