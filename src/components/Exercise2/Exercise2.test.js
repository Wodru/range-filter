import "babel-polyfill"
import React from 'react'
import {render, cleanup, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Exercise2 from "./Exercise2"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

jest.mock('../Range/Range', () => (props) => <div data-testid="Range" {...props}/>)

describe('Exercise2', () => {
    afterEach(cleanup)
    let mock
    beforeEach(() => {
        mock = new MockAdapter(axios)
    })


    test('Render ok', async () => {
        mock.onGet(process.env.API_HOST + `/options`).reply(200, {options: [5, 1, 10]})
        const {getByTestId} = render(<Exercise2/>)
        await waitFor(async () => {
            expect(await getByTestId('Range')).not.toBeNull()
        })
    })
    test('Render Range with props', async () => {
        mock.onGet(process.env.API_HOST + `/options`).reply(200, {options: [5, 1, 10.25, 20.1]})
        const {getByTestId} = render(<Exercise2/>)
        await waitFor(async () => {
            expect(await getByTestId('Range')).toHaveAttribute('min', '1')
            expect(await getByTestId('Range')).toHaveAttribute('max', '20.1')
            expect(await getByTestId('Range')).toHaveAttribute('fixed', '2')
            expect(await getByTestId('Range')).toHaveAttribute('options', [5, 1, 10.25, 20.1].toString())
        })
    })
})

