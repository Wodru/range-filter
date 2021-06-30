import api from "../api"

const ApiLocation = process.env.API_HOST

export const getOptions = () => {
    return api.get(ApiLocation + `/options`)
}
