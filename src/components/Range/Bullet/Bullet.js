import React from "react"
import './Bullet.scss'
import {handleValueLimits} from '../utils'

/**
 * Bullet component
 *
 * @component
 * @example
 * <Bullet
 *      type="min" //{string} asd complete the selector data-cy
 *      isLastUsed={false} // change z-index 10
 *      isGrabbing={false} // Add class for cursor
 *      value={0} // determine the current Value
 *      handleSetValue={()=>{}} // Function to change Value
 *      onMouseDown={()=>{}} // Function to call on mouse down
 *      onMouseUp={()=>{}} // Function to call on mouse Up, call windows.onMouseUp too
 *      getWidthOfBar={()=>{}} // Function should return width of bar, need for calculate the conversion factor for response
 *      startPositionX={0} // determine the start value
 *      startCurrentValue={0} // determine the current value
 *      min={0} // Min value
 *      max={100} // Max value
 *      options={undefined}
 * />
 */
class Bullet extends React.Component {

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.mouseMove)
        window.removeEventListener('mouseUp', this.mouseUp)
    }

    /**
     * Calculate the displacement of the bullet
     * @param {MouseEvent} e
     * @returns {number}
     */
    getMouseMove = (e) => {
        const diff = e.clientX - this.props.startPositionX
        const increment = diff * ((this.props.max - this.props.min) / this.props.getWidthOfBar())
        return this.props.startCurrentValue + increment
    }

    /**
     * Call the method to save the bullet position
     * @param {MouseEvent} e
     */
    mouseMove = (e) => {
        this.props.handleSetValue(this.getMouseMove(e))
    }

    /**
     * Call the method to save the bullet position and remove events (mouseMove and mouseUp)
     */
    mouseUp = () => {
        this.props.handleSetValue(this.selectNearValue(this.props.value))
        window.removeEventListener('mousemove', this.mouseMove)
        window.removeEventListener('mouseUp', this.mouseUp)
        this.props.onMouseUp()
    }

    /**
     * Calculate the closest value to the number received
     * @param {number|string} value - Value to check
     * @returns {number} Valid fixed number
     */
    selectNearValue(value) {
        if (value !== '' && isFinite(value)) {
            value = handleValueLimits(parseFloat(value), this.props.min, this.props.max)

            if (this.props.options) {
                let minorOption = this.props.min
                this.props.options.forEach(option => {
                    minorOption = (option > minorOption && option <= value) ? option : minorOption
                })
                let majorOption = this.props.max
                this.props.options.forEach(option => {
                    majorOption = (option < majorOption && option >= value) ? option : majorOption
                })
                const diffMinorOption = value - minorOption
                const diffMajorOption = majorOption - value

                if (diffMajorOption >= diffMinorOption) value = minorOption
                else value = majorOption

            }
        }
        return value
    }

    render() {
        return (
            <div className={`wrapper_bullet ${this.props.isLastUsed ? 'wrapper_bullet--last-used' : ''}`} data-cy={`input-range__wrapper-bullet-${this.props.type}`}>
                <div className={`input-range__bullet input-range__bullet--min ${this.props.isGrabbing ? 'grabbing' : 'grab'}`} data-cy={`input-range__bullet-${this.props.type}`}
                     role="slider"
                     aria-valuenow={this.props.value}
                     tabIndex={0}
                     onMouseDown={(e) => {
                         e.stopPropagation()
                         e.preventDefault()
                         window.addEventListener('mousemove', this.mouseMove)
                         window.addEventListener('mouseup', this.mouseUp)
                         this.props.onMouseDown(e)
                     }}
                />
            </div>

        )
    }


}

export default Bullet
