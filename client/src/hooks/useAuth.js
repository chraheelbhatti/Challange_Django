import {useContext, useDebugValue} from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
    const auth = useContext(AuthContext);  // Correctly access the entire context

    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out");

    return auth;  // Return the entire context, including user and other properties
}
