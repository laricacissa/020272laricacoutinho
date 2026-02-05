import axios from 'axios';
import {showErrorAxios} from "./Util.ts";

const url = "http://localhost:8080/api/albuns";

export const useGetAlbunsService = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        showErrorAxios(error);
    }
}

export const useGetAlbunsPorArtistaService = async (id) => {
    try {
        const response = await axios.get(url + "/artista", {
            params: {
                idArtista: id
            }
        });
        return response.data;
    } catch (error) {
        showErrorAxios(error);
    }
}

export const usePostCadtAlbumService = async (nome, id) => {
    const data = {
        nomeAlbum: nome,
        idArtista: id,
    };

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        showErrorAxios(error);
    }
}

