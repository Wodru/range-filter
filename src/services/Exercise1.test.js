import "babel-polyfill"
import '@testing-library/jest-dom/extend-expect'
import {getLimits} from './Exercise1'
import api from '../api'


describe('Service Exercise 1', () => {
    const ApiLocation = process.env.API_HOST
    api.get = jest.fn((url) => {
        return url
    })

    test('getLimits', () => {
        expect(getLimits()).toBe(ApiLocation + '/limits')
    })

})

