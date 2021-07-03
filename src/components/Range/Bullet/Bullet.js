import React from "react"
import './Bullet.scss'
import {handleValueLimits} from '../utils'

class Bullet extends React.Component {

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.mouseMove)
        window.removeEventListener('mouseUp', this.mouseUp)
    }

    getMouseMove = (e) => {
        const diff = e.clientX - this.props.startPositionX
        const increment = diff * ((this.props.max - this.props.min) / this.props.getWidthOfBar())
        return this.props.startCurrentValue + increment
    }

    mouseMove = (e) => {
        this.props.handleSetValue(this.getMouseMove(e))
    }

    mouseUp = () => {
        this.props.handleSetValue(this.selectNearValue(this.props.value))
        window.removeEventListener('mousemove', this.mouseMove)
        window.removeEventListener('mouseUp', this.mouseUp)
    }

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
                     onMouseUp={() => {
                         this.props.onMouseUp()
                     }}
                />
            </div>

        )
    }


}

export default Bullet
