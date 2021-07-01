import {cleanup, render, screen} from '@testing-library/react'
import React from 'react'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import Routes from './Routes'
import {createBrowserHistory} from 'history'


jest.mock('./Exercise1/Exercise1', () => (props) => <div data-testid="Exercise1" {...props}/>)
jest.mock('./Exercise2/Exercise2', () => (props) => <div data-testid="Exercise2" {...props}/>)


describe('Routes suit', () => {
    beforeEach(cleanup)
    test('home', () => {
        const history = createBrowserHistory()
        history.push('/')
        render(
            <Router history={history}>
                <Routes/>
            </Router>
        )
        expect(screen.getByText(/hello world/i)).toBeInTheDocument()
    })
    test('exercise 1', () => {
        const history = createBrowserHistory()
        history.push('/exercise1')
        render(
            <Router history={history}>
                <Routes/>
            </Router>
        )
        expect(screen.getByTestId('Exercise1')).toBeInTheDocument()
    })
    test('exercise 2', () => {
        const history = createBrowserHistory()
        history.push('/exercise2')
        render(
            <Router history={history}>
                <Routes/>
            </Router>
        )
        expect(screen.getByTestId('Exercise2')).toBeInTheDocument()
    })

})
