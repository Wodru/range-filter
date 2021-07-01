import api from '../api'

const ApiLocation = process.env.API_HOST

export const getLimits = () => {
    return api.get(ApiLocation + `/limits`)
}
