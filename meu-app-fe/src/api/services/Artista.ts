import axios from 'axios';
import {showErrorAxios} from "./Util.ts";

const url = "http://localhost:8080/api/artistas";

export const useGetArtistasService = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        showErrorAxios(error);
    }
}

export const usePostCadtArtistaService = async (nome) => {
    const data = {
        nomeArtista: nome,
    };

    try {

        console.log(nome);
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        showErrorAxios(error);
    }
}

