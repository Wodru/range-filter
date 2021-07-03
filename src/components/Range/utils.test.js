import {handleValueLimits} from './utils'

describe('handleValueLimits suit', () => {

    test('set good value', () => {
        expect(handleValueLimits(10, 0, 100)).toBe(10)
    })

    test('set below min limit value', () => {
        expect(handleValueLimits(-20, 0, 100)).toBe(0)
    })

    test('set over max limit value', () => {
        expect(handleValueLimits(200, 0, 100)).toBe(100)
    })
})

