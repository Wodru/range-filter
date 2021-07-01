import "babel-polyfill"
import '@testing-library/jest-dom/extend-expect'
import {getOptions} from './getOptions'
import api from '../api'


describe('Service Exercise 2', () => {
    const ApiLocation = process.env.API_HOST
    api.get = jest.fn((url) => {
        return url
    })
    test('getOptions', () => {
        expect(getOptions()).toBe(ApiLocation + '/options')
    })

})

