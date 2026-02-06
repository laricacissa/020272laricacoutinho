import axios from 'axios';
import {showErrorAxios} from "./Util.ts";

const url = "http://localhost:8080/api/login";

export const useGetVerificarLoginService = async (user, pwd) => {
    try {
        const response = await axios.get(url, {
            params: {
                username: user,
                senha: pwd,
            }
        });
        return response.data;
    } catch (error) {
        showErrorAxios(error);
    }
}

