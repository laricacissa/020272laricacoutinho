export const showErrorAxios = (error) => {
    console.log(error)
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded:', error.response.data);
        console.error('Status code:', error.response.status);
    } else if (error.request) {
        // The request was made but no response was received (Network Error falls here)
        console.error('No response received:', error.request);
        console.error('Error message:', error.message);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error creating request:', error.message);
    }
}
