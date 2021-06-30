import "babel-polyfill"
import '@testing-library/jest-dom/extend-expect'
import api from './api'
import MockAdapter from "axios-mock-adapter"
import axios from "axios"


describe('Service Exercise 1', () => {
    let mock
    const ApiLocation = process.env.API_HOST
    beforeEach(() => {
        mock = new MockAdapter(axios)
    })
    test('check axios mock 200', () => {
        mock.onGet(ApiLocation + `/test`).reply(200, 'ok')
        return api.get(ApiLocation + `/test`).then((response) => {
            expect(response.status).toBe(200)
            expect(response.data).toBe('ok')
        })
    })

})

