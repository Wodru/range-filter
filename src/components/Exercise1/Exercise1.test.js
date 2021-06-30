import "babel-polyfill"
import React from 'react'
import {render, cleanup, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Exercise1 from "./Exercise1"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"


jest.mock('../Range/Range', () => (props) => <div data-testid="Range" {...props}/>)

describe('Exercise1', () => {
    afterEach(cleanup)
    let mock
    beforeEach(() => {
        mock = new MockAdapter(axios)
    })


    test('Render ok', async () => {
        mock.onGet(process.env.API_HOST + `/limits`).reply(200, {min: 5, max: 99})
        const {getByTestId} = render(<Exercise1/>)
        await waitFor(async () => {
            expect(await getByTestId('Range')).not.toBeNull()
        })
    })
    test('Render Range with props', async () => {
        mock.onGet(process.env.API_HOST + `/limits`).reply(200, {min: 5, max: 99})
        const {getByTestId} = render(<Exercise1/>)
        await waitFor(async () => {
            expect(await getByTestId('Range')).toHaveAttribute('min', '5')
            expect(await getByTestId('Range')).toHaveAttribute('max', '99')
        })
    })
})

