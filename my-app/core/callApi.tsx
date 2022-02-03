import axios, { AxiosRequestConfig } from 'axios'

export enum method {
    post = "post",
    get = "get",
    put = "put",
    delete = "delete"
}

export const callService = async ({ method, url, data }: AxiosRequestConfig) => {
    // const token = Cookies.get("token")
    const response = await axios({
        method,
        // headers: { Authorization: `Bearer ${token}` },
        url,
        data,
    })
        .then((res) => res)
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                   
                }
                if (
                    error.response.data.response?.error === undefined ||
                    error.response.data.response?.error === '' ||
                    error.response.data.response?.error === null 
                ) {
                    return 'server error'
                }
                return error.response.data.response
            }
            if (error.request) {
                return 'request error'
            }
            return error
        })
    return response
}