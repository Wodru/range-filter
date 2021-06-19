import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import '@testing-library/jest-dom/extend-expect'
import Range from "./Range"


configure({adapter: new Adapter()})


const selectorInputMin = '[data-cy=input-range__input-min] input'
const selectorInputMax = '[data-cy=input-range__input-max] input'

describe('Range suit inputs', () => {
    afterEach(cleanup)

    test('Render ok', () => {
        const {container} = render(<Range/>)
        expect(container.childElementCount).toBeGreaterThan(0)
    })

    test('Render html minimum structure', () => {
        const {container} = render(<Range/>)

        const wrapper = container.querySelectorAll('[data-cy=input-range__wrapper]')
        const bar = container.querySelectorAll('[data-cy=input-range__bar]')
        const barBackground = container.querySelectorAll('[data-cy=input-range__bar-background]')
        const inputMin = container.querySelectorAll('[data-cy=input-range__input-min]')
        const inputMax = container.querySelectorAll('[data-cy=input-range__input-max]')
        const bulletMin = container.querySelectorAll('[data-cy=input-range__bullet-min]')
        const bulletMax = container.querySelectorAll('[data-cy=input-range__bullet-max]')

        expect(wrapper.length).toEqual(1)
        expect(bar.length).toEqual(1)
        expect(barBackground.length).toEqual(1)
        expect(inputMin.length).toEqual(1)
        expect(inputMax.length).toEqual(1)
        expect(bulletMin.length).toEqual(1)
        expect(bulletMax.length).toEqual(1)
    })

    const probesToSetInput = [
        {min: '1', changeMin: '', changeMax: '', max: '100', expectedMin: '1', expectedMax: '100'},
        {min: '1', changeMin: '25', changeMax: '50', max: '100', expectedMin: '25', expectedMax: '50'},
        {min: '1', changeMin: 'string', changeMax: 'string', max: '100', expectedMin: '1', expectedMax: '100'},
        {min: '1', changeMin: '-20', changeMax: '200', max: '100', expectedMin: '1', expectedMax: '100'},
        {min: '1', changeMin: '150', changeMax: '50', max: '100', expectedMin: '100', expectedMax: '100'},
    ]
    probesToSetInput.forEach(({min, changeMin, changeMax, max, expectedMin, expectedMax}) => {
        test(`Change current values with inputs ${min + ', ' + changeMin + ', ' + changeMax + ', ' + max + ', ' + expectedMin + ', ' + expectedMax}`, () => {
            const {container} = render(<Range min={1} max={100}/>)


            fireEvent.change(container.querySelector(selectorInputMin), {target: {value: changeMin}})
            fireEvent.blur(container.querySelector(selectorInputMin))
            expect(container.querySelector(selectorInputMin)).toHaveValue(expectedMin)

            fireEvent.change(container.querySelector(selectorInputMax), {target: {value: changeMax}})
            fireEvent.blur(container.querySelector(selectorInputMax))
            expect(container.querySelector(selectorInputMax)).toHaveValue(expectedMax)
        })
    })

    test(`Change value when are equals`, () => {
        const {container} = render(<Range min={1} max={100}/>)


        function changeMin(value) {
            fireEvent.change(container.querySelector(selectorInputMin), {target: {value: value}})
            fireEvent.blur(container.querySelector(selectorInputMin))
        }

        function changeMax(value) {
            fireEvent.change(container.querySelector(selectorInputMax), {target: {value: value}})
            fireEvent.blur(container.querySelector(selectorInputMax))
        }

        changeMin(50)
        changeMax(50)
        changeMax(80)
        changeMin(80)
        changeMin(20)
    })
    const probesSize = [
        {max: 5, expected: '1'},
        {max: 10, expected: '2'},
        {max: 100, expected: '3'},
    ]
    probesSize.forEach(({max, expected}) => {
        test(`Check sizes input ${max + ', ' + expected}`, () => {
            const {container} = render(<Range min={1} max={max}/>)

            expect(container.querySelector(selectorInputMin).getAttribute('size')).toBe(expected)
            expect(container.querySelector(selectorInputMax).getAttribute('size')).toBe(expected)

        })
    })


    const probesMinPercent = [
        {min: 0, currentMin: 50, max: 100, expected: 50},
        {min: 1, currentMin: 1, max: 100, expected: 0},
        {min: 0, currentMin: 50, max: 200, expected: 25},
        {min: 50, currentMin: 100, max: 150, expected: 50}
    ]
    probesMinPercent.forEach((probe) => {
        test(`calculateMinPercent ${probe.min} ${probe.max}`, () => {
            const wrapper = shallow(<Range min={probe.min} max={probe.max}/>)
            wrapper.setState({currentMin: probe.currentMin})

            expect(wrapper.instance().calculateLeftPercent()).toBe(probe.expected)
        })
    })
    const probesMaxPercent = [
        {min: 0, currentMin: 0, currentMax: 100, max: 100, expected: 100},
        {min: 0, currentMin: 20, currentMax: 100, max: 100, expected: 80},
        {min: 0, currentMin: 25, currentMax: 75, max: 100, expected: 50},
        {min: 0, currentMin: 25, currentMax: 25, max: 100, expected: 0},
    ]
    probesMaxPercent.forEach((probe) => {
        test(`calculateMaxPercent ${probe.min} ${probe.currentMin} ${probe.currentMax} ${probe.max}`, () => {
            const wrapper = shallow(<Range min={probe.min} max={probe.max}/>)
            wrapper.setState({currentMin: probe.currentMin, currentMax: probe.currentMax})

            expect(wrapper.instance().calculateWidthPercent()).toBe(probe.expected)
        })
    })


})

const selectorBulletMin = '[data-cy=input-range__bullet-min]'
const selectorBulletMax = '[data-cy=input-range__bullet-max]'

describe('Range suit mouse', () => {
    afterEach(cleanup)


    test('Bullets have cursor grab', () => {
        const {container} = render(<Range min={1} max={100}/>)

        expect(container.querySelector(selectorBulletMin)).toHaveClass('grab')
        expect(container.querySelector(selectorBulletMax)).toHaveClass('grab')
    })

    test('Bullets have cursor grabbing on clicking', () => {
        const {container} = render(<Range min={1} max={100}/>)

        expect(container.querySelector(selectorBulletMin)).toHaveClass('grab')
        expect(container.querySelector(selectorBulletMax)).toHaveClass('grab')

        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        expect(container.querySelector(selectorBulletMin)).toHaveClass('grabbing')
        fireEvent.mouseUp(container.querySelector(selectorBulletMin))
        expect(container.querySelector(selectorBulletMin)).toHaveClass('grab')

        fireEvent.mouseDown(container.querySelector(selectorBulletMax))
        expect(container.querySelector(selectorBulletMax)).toHaveClass('grabbing')
        fireEvent.mouseUp(container.querySelector(selectorBulletMax))
        expect(container.querySelector(selectorBulletMax)).toHaveClass('grab')
    })

    test('Move max bullet', () => {
        const {container} = render(<Range min={0} max={100}/>)
        Object.defineProperty(container.querySelector('[data-cy=input-range__bar-background]'), 'offsetWidth', {configurable: true, value: 100})


        fireEvent.mouseDown(container.querySelector(selectorBulletMax))
        fireEvent.mouseMove(window, {clientX: -50})
        fireEvent.mouseUp(container.querySelector(selectorBulletMax))

        expect(container.querySelector(selectorInputMax)).toHaveValue('50')


    })
    test('Move min bullet', () => {
        const {container} = render(<Range min={0} max={100}/>)
        Object.defineProperty(container.querySelector('[data-cy=input-range__bar-background]'), 'offsetWidth', {configurable: true, value: 100})


        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        fireEvent.mouseMove(window, {clientX: 50})
        fireEvent.mouseUp(container.querySelector(selectorBulletMin))

        expect(container.querySelector(selectorInputMin)).toHaveValue('50')


    })

    test('Move bullets do not cross between them', () => {
        const {container} = render(<Range min={0} max={100}/>)
        Object.defineProperty(container.querySelector('[data-cy=input-range__bar-background]'), 'offsetWidth', {configurable: true, value: 100})

        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        fireEvent.mouseMove(window, {clientX: 50})
        fireEvent.mouseUp(container.querySelector(selectorBulletMin))

        expect(container.querySelector(selectorInputMin)).toHaveValue('50')

        fireEvent.mouseDown(container.querySelector(selectorBulletMax))
        fireEvent.mouseMove(window, {clientX: -75})
        fireEvent.mouseUp(container.querySelector(selectorBulletMax))

        expect(container.querySelector(selectorInputMax)).toHaveValue('50')

        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        fireEvent.mouseMove(window, {clientX: 75})
        fireEvent.mouseUp(container.querySelector(selectorBulletMin))

        expect(container.querySelector(selectorInputMin)).toHaveValue('50')
    })

    test('Move min bullet don`t pass max or min', () => {
        const {container} = render(<Range min={0} max={100}/>)
        Object.defineProperty(container.querySelector('[data-cy=input-range__bar-background]'), 'offsetWidth', {configurable: true, value: 100})

        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        fireEvent.mouseMove(window, {clientX: -10})
        fireEvent.mouseUp(container.querySelector(selectorBulletMin))

        expect(container.querySelector(selectorInputMin)).toHaveValue('0')

        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        fireEvent.mouseMove(window, {clientX: 120})
        fireEvent.mouseUp(container.querySelector(selectorBulletMin))

        expect(container.querySelector(selectorInputMin)).toHaveValue('100')
    })

    test('Move max bullet don`t pass max or min', () => {
        const {container} = render(<Range min={0} max={100}/>)
        Object.defineProperty(container.querySelector('[data-cy=input-range__bar-background]'), 'offsetWidth', {configurable: true, value: 100})

        fireEvent.mouseDown(container.querySelector(selectorBulletMax))
        fireEvent.mouseMove(window, {clientX: -120})
        fireEvent.mouseUp(container.querySelector(selectorBulletMax))

        expect(container.querySelector(selectorInputMax)).toHaveValue('0')

        fireEvent.mouseDown(container.querySelector(selectorBulletMax))
        fireEvent.mouseMove(window, {clientX: 120})
        fireEvent.mouseUp(container.querySelector(selectorBulletMax))

        expect(container.querySelector(selectorInputMax)).toHaveValue('100')
    })

})
