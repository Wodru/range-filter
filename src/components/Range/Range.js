import React from "react"
import './Range.scss'

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
            isGrabbing: false,
            startPositionX: 0,
            lastUsed: 'min'
        }
        this.bar = React.createRef()
        this.fixed = this.props.fixed ?? 0
        this.size = parseInt(props.max).toString().length + this.fixed
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUpMin)
        window.removeEventListener('mouseup', this.mouseUpMax)
    }


    calculateLeftPercent() {
        const diff = this.props.max - this.props.min
        return parseFloat((100 * (this.state.currentMin - this.props.min) / diff).toFixed(2))
    }

    calculateWidthPercent() {
        const diff = this.props.max - this.props.min
        const currentDiffMinOne = this.state.currentMax - this.state.currentMin
        return parseFloat((100 * (currentDiffMinOne) / diff).toFixed(2))
    }

    handleSetMin(value) {
        if (value !== '' && isFinite(value)) {
            if (parseFloat(value) < parseFloat(this.props.min)) value = this.props.min
            if (parseFloat(value) > parseFloat(this.state.currentMax)) value = this.state.currentMax
            this.setState({
                showInputCurrentMin: false,
                currentMin: parseFloat(parseFloat(value).toFixed(this.fixed)),
                tempCurrentMin: parseFloat(parseFloat(value).toFixed(this.fixed))
            })
        }
        else
            this.setState({tempCurrentMin: this.state.currentMin})

    }

    selectNearValue(value) {
        if (value !== '' && isFinite(value)) {
            if (parseFloat(value) > parseFloat(this.props.max)) value = this.props.max
            if (parseFloat(value) < parseFloat(this.state.currentMin)) value = this.state.currentMin

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

    handleSetMax(value) {
        if (value !== '' && isFinite(value)) {
            if (parseFloat(value) > parseFloat(this.props.max)) value = this.props.max
            if (parseFloat(value) < parseFloat(this.state.currentMin)) value = this.state.currentMin

            this.setState({
                showInputCurrentMax: false, currentMax: parseFloat(parseFloat(value).toFixed(this.fixed)), tempCurrentMax: parseFloat(parseFloat(value).toFixed(this.fixed))
            })


        }
        else
            this.setState({tempCurrentMax: this.state.currentMax})
    }

    mouseMoveMax = (e) => {
        const diff = e.clientX - this.state.startPositionX
        const increment = diff * ((this.props.max - this.props.min) / this.bar.current.offsetWidth)
        this.handleSetMax(this.state.startCurrentMax + increment)
    }

    mouseMoveMin = (e) => {
        const diff = e.clientX - this.state.startPositionX
        const increment = diff * ((this.props.max - this.props.min) / this.bar.current.offsetWidth)
        this.handleSetMin(this.state.startCurrentMin + increment)
    }

    mouseUpMin = () => {
        this.setState({isGrabbing: false})
        this.handleSetMin(this.selectNearValue(this.state.currentMin))
        window.removeEventListener('mousemove', this.mouseMoveMin)
        window.removeEventListener('mouseUp', this.mouseUpMin)
    }

    mouseUpMax = () => {
        this.setState({isGrabbing: false})
        this.handleSetMax(this.selectNearValue(this.state.currentMax))
        window.removeEventListener('mousemove', this.mouseMoveMax)
        window.removeEventListener('mouseUp', this.mouseUpMax)
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
                        <div className="wrapper_bullet" style={{zIndex: this.state.lastUsed === 'min' ? 10 : 1}} data-cy="input-range__wrapper-bullet-min">
                            <div className={`input-range__bullet input-range__bullet--min ${this.state.isGrabbing ? 'grabbing' : 'grab'}`} data-cy="input-range__bullet-min"
                                 onMouseDown={(e) => {
                                     e.stopPropagation()
                                     e.preventDefault()
                                     window.addEventListener('mousemove', this.mouseMoveMin)
                                     window.addEventListener('mouseup', this.mouseUpMin)
                                     this.setState({isGrabbing: true, startPositionX: e.clientX, startCurrentMin: this.state.currentMin, lastUsed: 'min'})
                                 }}
                            />
                        </div>
                        <div className="wrapper_bullet" style={{zIndex: this.state.lastUsed === 'max' ? 10 : 1}} data-cy="input-range__wrapper-bullet-max">
                            <div className={`input-range__bullet input-range__bullet--max ${this.state.isGrabbing ? 'grabbing' : 'grab'}`} data-cy="input-range__bullet-max"
                                 onMouseDown={(e) => {
                                     e.stopPropagation()
                                     e.preventDefault()
                                     window.addEventListener('mousemove', this.mouseMoveMax)
                                     window.addEventListener('mouseup', this.mouseUpMax)
                                     this.setState({isGrabbing: true, startPositionX: e.clientX, startCurrentMax: this.state.currentMax, lastUsed: 'max'})
                                 }}
                            />
                        </div>
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
