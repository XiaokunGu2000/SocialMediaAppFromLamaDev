import axios from "axios"
export const loginCall = async (userCredentials, dispath) => {
    dispath({type:"LOGIN_START"});
    try {
        const res = await axios.post("auth/login", userCredentials);
        dispath({type:"LOGIN_SUCCESS", payload:res.data});
    } catch (error) {
        dispath({type:"LOGIN_FAILURE", payload:error});
    }
}