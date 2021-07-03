import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import '@testing-library/jest-dom/extend-expect'
import Bullet from "./Bullet"


configure({adapter: new Adapter()})

describe('Range suit inputs', () => {
    afterEach(cleanup)

    test('Render ok', () => {
        const {container} = render(<Bullet
            type="min"
            value={1}
        />)
        expect(container.childElementCount).toBeGreaterThan(0)
    })
    const selectorBulletMin = '[data-cy=input-range__bullet-min]'
    const selectorWrapperBulletMin = '[data-cy="input-range__wrapper-bullet-min"]'
    const selectorBulletMax = '[data-cy=input-range__bullet-max]'
    const selectorWrapperBulletMax = '[data-cy="input-range__wrapper-bullet-max"]'

    test('Render with data-cy min', () => {
        const {container} = render(<Bullet
            type="min"
        />)
        expect(container.querySelector(selectorBulletMin)).toBeVisible()
        expect(container.querySelector(selectorWrapperBulletMin)).toBeVisible()
    })

    test('Render with data-cy max', () => {
        const {container} = render(<Bullet
            type="max"
        />)
        expect(container.querySelector(selectorBulletMax)).toBeVisible()
        expect(container.querySelector(selectorWrapperBulletMax)).toBeVisible()
    })

    test('No is last used', () => {
        const {container} = render(<Bullet type="min"/>)
        expect(container.querySelector(selectorWrapperBulletMin)).not.toHaveClass('wrapper_bullet--last-used')
    })
    test('Is last used', () => {
        const {container} = render(<Bullet isLastUsed type="min"/>)
        expect(container.querySelector(selectorWrapperBulletMin)).toHaveClass('wrapper_bullet--last-used')
    })

    test('No is grabbing', () => {
        const {container} = render(<Bullet type="min"/>)
        expect(container.querySelector(selectorBulletMin)).toHaveClass('grab ')
        expect(container.querySelector(selectorBulletMin)).not.toHaveClass('grabbing')
    })
    test('Is grabbing', () => {
        const {container} = render(<Bullet isGrabbing type="min"/>)
        expect(container.querySelector(selectorBulletMin)).toHaveClass('grabbing')
    })

    test('Is grabbing', () => {
        const {container} = render(<Bullet isGrabbing type="min"/>)
        expect(container.querySelector(selectorBulletMin)).toHaveClass('grabbing')
    })


    test('Events and functions', () => {
        const mockOnMouseDown = jest.fn()
        const mockOnMouseUp = jest.fn()
        const MockHandleSetValue = jest.fn(result => result)

        const {container} = render(<Bullet
            type="min"
            value={0}
            handleSetValue={MockHandleSetValue}
            onMouseDown={mockOnMouseDown}
            onMouseUp={mockOnMouseUp}
            getWidthOfBar={() => 200}
            startPositionX={0}
            startCurrentValue={0}
            min={0} max={100}
        />)

        fireEvent.mouseDown(container.querySelector(selectorBulletMin))
        expect(mockOnMouseDown.mock.calls.length).toBe(1)

        fireEvent.mouseMove(window, {clientX: 50})
        expect(MockHandleSetValue.mock.calls.length).toBe(1)
        expect(MockHandleSetValue.mock.results[0].value).toBe(25)

        fireEvent.mouseUp(container.querySelector(selectorBulletMin))
        expect(mockOnMouseUp.mock.calls.length).toBe(1)
        expect(MockHandleSetValue.mock.calls.length).toBe(2)
        expect(MockHandleSetValue.mock.results[1].value).toBe(0)
    })

    const probesMinPercent = [
        {min: 0, max: 100, selectValue: 1, options: [1, 4, 30, 80], expected: 1},
        {min: 0, max: 100, selectValue: 2, options: [1, 4, 30, 80], expected: 1},
        {min: 0, max: 100, selectValue: 5, options: [1, 4, 30, 80], expected: 4},
        {min: 0, max: 100, selectValue: 25, options: [1, 4, 30, 80], expected: 30},
        {min: 0, max: 100, selectValue: 100, options: [1, 4, 30, 80], expected: 100}
    ]
    probesMinPercent.forEach((probe) => {
        test(`selectNearValue ${probe.min} ${probe.max} ${probe.selectValue} with options`, () => {
            const wrapper = shallow(<Bullet min={probe.min} max={probe.max} options={probe.options}/>)
            expect(wrapper.instance().selectNearValue(probe.selectValue)).toBe(probe.expected)
        })
    })

})
