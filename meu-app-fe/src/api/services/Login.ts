import {useEffect, useState} from "react";
import axios from "axios";

const useAxiosGet = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Dependency array ensures refetching if the URL changes

    return { data, loading, error };
};

export default useAxiosGet;
