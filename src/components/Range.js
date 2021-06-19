import React from "react"

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
        }
        this.bar = React.createRef()
        this.fixed = 0
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


    render() {
        return (
            <div>
                <div className="input-range" data-cy="input-range__wrapper">
                    <div className="input-range__input input-range__input--min" data-cy="input-range__input-min">
                        <input onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.code === '13' || e.keyCode === 13) this.handleSetMin(e.currentTarget.value)
                        }}
                               onBlur={(e) => this.handleSetMin(e.target.value)}
                               onChange={(e) => this.setState({tempCurrentMin: e.target.value})}
                               size={this.props.max ? this.props.max.toString().length : 1}
                               value={this.state.tempCurrentMin}
                               autoFocus={true}
                        />
                    </div>


                    <div ref={this.bar} className="input-range__bar-background" data-cy="input-range__bar-background">
                        <div style={{left: this.calculateLeftPercent() + '%', width: this.calculateWidthPercent() + '%'}} className="input-range__bar"
                             data-cy="input-range__bar">
                            <div className="wrapper_bullet">
                                <div className={`input-range__bullet input-range__bullet--min ${this.state.isGrabbing ? 'grabbing' : 'grab'}`} data-cy="input-range__bullet-min"
                                     onMouseDown={(e) => {
                                         e.stopPropagation()
                                         e.preventDefault()
                                         window.addEventListener('mousemove', this.mouseMoveMin)
                                         window.addEventListener('mouseup', () => window.removeEventListener('mousemove', this.mouseMoveMin))
                                         this.setState({isGrabbing: true, startPositionX: e.clientX, startCurrentMin: this.state.currentMin})
                                     }}
                                     onMouseUp={() => {
                                         window.removeEventListener('mousemove', this.mouseMoveMin)
                                         this.setState({isGrabbing: false})
                                     }}
                                     onMouseLeave={() => {
                                         this.setState({isGrabbing: false})
                                     }}
                                />
                            </div>
                            <div className="wrapper_bullet">
                                <div className={`input-range__bullet input-range__bullet--max ${this.state.isGrabbing ? 'grabbing' : 'grab'}`} data-cy="input-range__bullet-max"
                                     onMouseDown={(e) => {
                                         e.stopPropagation()
                                         e.preventDefault()
                                         window.addEventListener('mousemove', this.mouseMoveMax)
                                         window.addEventListener('mouseup', () => window.removeEventListener('mousemove', this.mouseMoveMax))
                                         this.setState({isGrabbing: true, startPositionX: e.clientX, startCurrentMax: this.state.currentMax})
                                     }}
                                     onMouseUp={() => {
                                         window.removeEventListener('mousemove', this.mouseMoveMax)
                                         this.setState({isGrabbing: false})
                                     }}
                                     onMouseLeave={() => {
                                         this.setState({isGrabbing: false})
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
                               size={this.props.max ? this.props.max.toString().length : 1}
                               value={this.state.tempCurrentMax}
                               autoFocus={true}
                        />
                    </div>

                </div>
                {/*//TODO: quitar el botón de pruebas */}
                <div style={{marginTop: '50px'}} onClick={() => this.setState({currentMin: 20, tempCurrentMin: 20, currentMax: 80, tempCurrentMax: 80})}>change state</div>
                {/*//TODO: quitar el botón de pruebas */}
            </div>
        )
    }
}

export default Range
