import React from "react"
import './Range.scss'
import Bullet from "./Bullet/Bullet"
import {handleValueLimits} from "./utils"

/**
 * Slider with 2 bullets
 *
 * @component
 * @example
 * <div> <!-- custom width -->
 *     <Range
 *          min={0} //{number} determine min value
 *          max={100} //{number} determine max value
 *     />
 * </div>
 * <div> <!-- custom width -->
 *     <Range
 *          min={0} //{number} determine min value
 *          max={100} //{number} determine max value
 *          options={[10,20,30,40,50,60]} //{array:number} determine the values that can be set
 *          fixed={0} //{number} determine of decimals and size inputs
 *     />
 * </div>
 *
 */
class Range extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMin: props.min,
            tempCurrentMin: props.min,
            startCurrentMin: props.min,
            currentMax: props.max,
            tempCurrentMax: props.max,
            startCurrentMax: props.max,
            startCurrentValue: 0,
            isGrabbing: false,
            startPositionX: 0,
            lastUsed: 'min'
        }
        this.bar = React.createRef()
        this.fixed = this.props.fixed ?? 0
        this.size = parseInt(props.max).toString().length + this.fixed
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    /**
     * Calculate the percentage of the left space
     * @returns {number} [0-100]
     */
    calculateLeftPercent() {
        const diff = this.props.max - this.props.min
        return parseFloat((100 * (this.state.currentMin - this.props.min) / diff).toFixed(2))
    }

    /**
     * Calculate the percentage of the space between bullets
     * @returns {number} [0-100]
     */
    calculateWidthPercent() {
        const diff = this.props.max - this.props.min
        const currentDiffMinOne = this.state.currentMax - this.state.currentMin
        return parseFloat((100 * (currentDiffMinOne) / diff).toFixed(2))
    }

    /**
     * checks the value and saves it in the component state
     * @param {string|number} value
     */
    handleSetMin(value) {
        if (value !== '' && isFinite(value)) {
            value = handleValueLimits(parseFloat(value), this.props.min, this.state.currentMax)
            this.setState({
                currentMin: parseFloat(value.toFixed(this.fixed)),
                tempCurrentMin: parseFloat(value.toFixed(this.fixed))
            })
        }
        else
            this.setState({tempCurrentMin: this.state.currentMin})

    }

    /**
     * checks the value and saves it in the component state
     * @param {string|number} value
     */
    handleSetMax(value) {
        if (value !== '' && isFinite(value)) {
            value = handleValueLimits(parseFloat(value), this.state.currentMin, this.props.max)

            this.setState({
                currentMax: parseFloat(parseFloat(value).toFixed(this.fixed)),
                tempCurrentMax: parseFloat(parseFloat(value).toFixed(this.fixed))
            })
        }
        else
            this.setState({tempCurrentMax: this.state.currentMax})
    }

    /**
     * current width of the slider
     * @returns {number} width
     */
    getWidthOfBar() {
        return this.bar.current.offsetWidth
    }


    render() {
        return (
            <div className="input-range" data-cy="input-range__wrapper">
                <div className="input-range__input input-range__input--min" data-cy="input-range__input-min">
                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.code === '13' || e.keyCode === 13) this.handleSetMin(e.currentTarget.value)
                    }}
                           onBlur={(e) => this.handleSetMin(e.target.value)}
                           onChange={(e) => this.setState({tempCurrentMin: e.target.value})}
                           size={this.size}
                           value={this.state.tempCurrentMin}
                           disabled={this.props.options}
                    />
                </div>


                <div ref={this.bar} className="input-range__bar-background" data-cy="input-range__bar-background">
                    <div style={{left: this.calculateLeftPercent() + '%', width: this.calculateWidthPercent() + '%', transition: this.state.isGrabbing ? '0s' : '0.4s'}}
                         className="input-range__bar"
                         data-cy="input-range__bar">
                        <Bullet
                            type="min"
                            isLastUsed={this.state.lastUsed === 'min'}
                            isGrabbing={this.state.isGrabbing}
                            value={this.state.tempCurrentMin}
                            handleSetValue={value => this._isMounted ? this.handleSetMin(value) : null}
                            onMouseDown={(e) => {
                                this.setState({isGrabbing: true, startPositionX: e.clientX, startCurrentValue: this.state.currentMin, lastUsed: 'min'})
                            }}
                            onMouseUp={() =>
                                this._isMounted ? this.setState({isGrabbing: false}) : null
                            }
                            getWidthOfBar={() => this.getWidthOfBar()}
                            startPositionX={this.state.startPositionX}
                            startCurrentValue={this.state.startCurrentValue}
                            min={this.props.min}
                            max={this.props.max}
                            options={this.props.options}
                        />
                        <Bullet
                            type="max"
                            isLastUsed={this.state.lastUsed === 'max'}
                            isGrabbing={this.state.isGrabbing}
                            value={this.state.tempCurrentMax}
                            handleSetValue={value => this._isMounted ? this.handleSetMax(value) : null}
                            onMouseDown={(e) => {
                                this.setState({isGrabbing: true, startPositionX: e.clientX, startCurrentValue: this.state.currentMax, lastUsed: 'max'})
                            }}
                            onMouseUp={() =>
                                this._isMounted ? this.setState({isGrabbing: false}) : null
                            }
                            getWidthOfBar={() => this.getWidthOfBar()}
                            startPositionX={this.state.startPositionX}
                            startCurrentValue={this.state.startCurrentValue}
                            min={this.props.min}
                            max={this.props.max}
                            options={this.props.options}
                        />
                    </div>
                </div>

                <div className="input-range__input input-range__input--max" data-cy="input-range__input-max">
                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.code === '13' || e.keyCode === 13) this.handleSetMax(e.currentTarget.value)
                    }}
                           onBlur={(e) => this.handleSetMax(e.target.value)}
                           onChange={(e) => this.setState({tempCurrentMax: e.target.value})}
                           size={this.size}
                           value={this.state.tempCurrentMax}
                           disabled={this.props.options}
                    />
                </div>

            </div>
        )
    }


}

export default Range
