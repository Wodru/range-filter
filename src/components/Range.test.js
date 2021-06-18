import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import '@testing-library/jest-dom/extend-expect'
import Range from "./Range"

configure({adapter: new Adapter()})


describe('Range suit', () => {
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
        const labelMin = container.querySelectorAll('[data-cy=input-range__label-min]')
        const labelMax = container.querySelectorAll('[data-cy=input-range__label-max]')

        expect(wrapper.length).toEqual(1)
        expect(bar.length).toEqual(1)
        expect(barBackground.length).toEqual(1)
        expect(labelMin.length).toEqual(1)
        expect(labelMax.length).toEqual(1)
    })

    test('show min and max labels', () => {

        const {container} = render(<Range min={1} max={10}/>)

        const labelMin = container.querySelector('[data-cy=input-range__label-min]')
        const labelMax = container.querySelector('[data-cy=input-range__label-max]')

        expect(labelMin).toHaveTextContent('1')
        expect(labelMax).toHaveTextContent('10')
    })

    test('show input on click labels and hidden when lost focus or push Enter', () => {
        const {container} = render(<Range min={1} max={10}/>)

        fireEvent.click(container.querySelector('[data-cy=input-range__label-min] span'))
        expect(container.querySelector('[data-cy=input-range__input-min]')).not.toBeNull()
        fireEvent.blur(container.querySelector('[data-cy=input-range__input-min] input'))
        expect(container.querySelector('[data-cy=input-range__input-min]')).toBeNull()

        fireEvent.click(container.querySelector('[data-cy=input-range__label-min] span'))
        expect(container.querySelector('[data-cy=input-range__input-min]')).not.toBeNull()
        fireEvent.keyDown(container.querySelector('[data-cy=input-range__input-min] input'), {key: "Enter", code: 13})

        expect(container.querySelector('[data-cy=input-range__input-min]')).toBeNull()


        fireEvent.click(container.querySelector('[data-cy=input-range__label-max] span'))
        expect(container.querySelector('[data-cy=input-range__input-max]')).not.toBeNull()
        fireEvent.blur(container.querySelector('[data-cy=input-range__input-max] input'))
        expect(container.querySelector('[data-cy=input-range__input-max]')).toBeNull()

        fireEvent.click(container.querySelector('[data-cy=input-range__label-max] span'))
        expect(container.querySelector('[data-cy=input-range__input-max]')).not.toBeNull()
        fireEvent.keyDown(container.querySelector('[data-cy=input-range__input-max] input'), {key: "Enter", code: 13})
        expect(container.querySelector('[data-cy=input-range__input-max]')).toBeNull()
    })

    const probesToSetInput = [
        {min: 1, changeMin: undefined, changeMax: undefined, max: 100, expectedMin: 1, expectedMax: 100},
        {min: 1, changeMin: 25, changeMax: 50, max: 100, expectedMin: 25, expectedMax: 50},
        {min: 1, changeMin: 'string', changeMax: 'string', max: 100, expectedMin: 1, expectedMax: 100},
        {min: 1, changeMin: -20, changeMax: 200, max: 100, expectedMin: 1, expectedMax: 100},
        {min: 1, changeMin: 150, changeMax: 50, max: 100, expectedMin: 100, expectedMax: 100},
    ]
    probesToSetInput.forEach(({min, changeMin, changeMax, max, expectedMin, expectedMax}) => {
        test(`Change current values with inputs ${min + ', ' + changeMin + ', ' + changeMax + ', ' + max + ', ' + expectedMin + ', ' + expectedMax}`, () => {
            const {container} = render(<Range min={1} max={100}/>)

            const selectorLabelMin = '[data-cy=input-range__label-min] span'
            const selectorInputMin = '[data-cy=input-range__input-min] input'
            const selectorLabelMax = '[data-cy=input-range__label-max] span'
            const selectorInputMax = '[data-cy=input-range__input-max] input'

            fireEvent.click(container.querySelector(selectorLabelMin))
            fireEvent.change(container.querySelector(selectorInputMin), {target: {value: changeMin}})
            fireEvent.blur(container.querySelector(selectorInputMin))
            expect(container.querySelector(selectorLabelMin)).toHaveTextContent(expectedMin)


            fireEvent.click(container.querySelector(selectorLabelMax))
            fireEvent.change(container.querySelector(selectorInputMax), {target: {value: changeMax}})
            fireEvent.blur(container.querySelector(selectorInputMax))
            expect(container.querySelector(selectorLabelMax)).toHaveTextContent(expectedMax)
        })
    })

    test(`Change value when are equals`, () => {
        const {container} = render(<Range min={1} max={100}/>)

        const selectorLabelMin = '[data-cy=input-range__label-min] span'
        const selectorInputMin = '[data-cy=input-range__input-min] input'
        const selectorLabelMax = '[data-cy=input-range__label-max] span'
        const selectorInputMax = '[data-cy=input-range__input-max] input'

        function changeMin(value) {
            fireEvent.click(container.querySelector(selectorLabelMin))
            fireEvent.change(container.querySelector(selectorInputMin), {target: {value: value}})
            fireEvent.blur(container.querySelector(selectorInputMin))
            expect(container.querySelector(selectorLabelMin)).toHaveTextContent(value)
        }

        function changeMax(value) {
            fireEvent.click(container.querySelector(selectorLabelMax))
            fireEvent.change(container.querySelector(selectorInputMax), {target: {value: value}})
            fireEvent.blur(container.querySelector(selectorInputMax))
            expect(container.querySelector(selectorLabelMax)).toHaveTextContent(value)
        }

        changeMin(50)
        changeMax(50)
        changeMax(80)
        changeMin(80)
        changeMin(20)
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
        {min: 0, currentMin: 25, currentMax: 75, max: 100, expected: 50}
    ]
    probesMaxPercent.forEach((probe) => {
        test(`calculateMaxPercent ${probe.min} ${probe.currentMin} ${probe.currentMax} ${probe.max}`, () => {
            const wrapper = shallow(<Range min={probe.min} max={probe.max}/>)
            wrapper.setState({currentMin: probe.currentMin, currentMax: probe.currentMax})

            expect(wrapper.instance().calculateWidthPercent()).toBe(probe.expected)
        })
    })


})
