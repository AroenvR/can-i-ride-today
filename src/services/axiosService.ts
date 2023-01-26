import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'https://',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

/**
 * Generic HTTPS GET request.
 * @param url to request from.
 * @returns a Promise with the response data.
 */
export const httpsGet = async (url: string): Promise<any> => {
    return axiosService.get(url)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            console.error("httpsGet error:", error);
        });
}

/**
 * Generic HTTPS POST request.
 * @param url to post to.
 * @param payload to send.
 * @returns a PPromise with the response data.
 */
export const httpsPost = async (url: string, payload: object): Promise<any> => {
    return axiosService.post(url, payload)
        .then(resp => {
            if (resp.status === 201) {
                return resp.data;
            }
        })
        .catch(err => {
            console.error("httpPost error:", err);
            throw err;
        });
}