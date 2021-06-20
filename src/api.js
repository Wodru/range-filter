import axios from 'axios'

const ApiLocation = process.env.API_HOST

axios.defaults.headers.common['Content-Type'] = 'application/json'

export const getLimits = () => {
    return axios.get(ApiLocation + `/limits`)
}

export const getOptions = () => {
    return axios.get(ApiLocation + `/options`)
}
