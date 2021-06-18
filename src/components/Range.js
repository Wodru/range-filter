import React from "react"

class Range extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // currentMin: 10,
            currentMin: props.min,
            // currentMax: 80
            currentMax: props.max
        }
    }

    calculateLeftPercent() {
        const diff = this.props.max - this.props.min
        return parseFloat((100 * (this.state.currentMin - this.props.min) / diff).toFixed(2))
    }

    calculateWidthPercent() {
        const diff = this.props.max - this.props.min
        return parseFloat((100 * (this.state.currentMax - this.state.currentMin) / diff).toFixed(2))
    }

    handleSetMin(value) {
        if (isFinite(value)) {
            if (value < this.props.min) value = this.props.min
            if (value > this.state.currentMax) value = this.state.currentMax
            this.setState({showInputCurrentMin: false, currentMin: value})
        }
        else
            this.setState({showInputCurrentMin: false})

    }

    handleSetMax(value) {
        if (isFinite(value)) {
            if (value > this.props.max) value = this.props.max
            if (value < this.state.currentMin) value = this.state.currentMin
            this.setState({showInputCurrentMax: false, currentMax: value})
        }
        else
            this.setState({showInputCurrentMax: false})
    }


    render() {
        return (
            <div className="input-range" data-cy="input-range__wrapper">
                <div className="input-range__bar-background" data-cy="input-range__bar-background">
                    <div style={{left: this.calculateLeftPercent() + '%', width: this.calculateWidthPercent() + '%'}} className="input-range__bar" data-cy="input-range__bar">
                        {this.state.showInputCurrentMin ?
                            <div className="input-range__input input-range__input--min" data-cy="input-range__input-min">
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.code === '13' || e.keyCode === 13) this.handleSetMin(e.currentTarget.value)
                                }}
                                       onBlur={(e) => this.handleSetMin(e.target.value)}
                                       defaultValue={this.state.currentMin}
                                       autoFocus={true}
                                />
                            </div>
                            :
                            <div className="input-range__label input-range__label--min" data-cy="input-range__label-min">
                                <span onClick={() => this.setState({showInputCurrentMin: true})}>{this.state.currentMin}</span>
                            </div>

                        }
                        {this.state.showInputCurrentMax ?
                            <div className="input-range__input input-range__input--max" data-cy="input-range__input-max">
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.code === '13' || e.keyCode === 13) this.handleSetMax(e.currentTarget.value)
                                }}
                                       onBlur={(e) => this.handleSetMax(e.target.value)}
                                       defaultValue={this.state.currentMax}
                                       autoFocus={true}
                                />
                            </div>
                            :
                            <div className="input-range__label input-range__label--max" data-cy="input-range__label-max">
                                <span onClick={() => this.setState({showInputCurrentMax: true})}>{this.state.currentMax}</span>
                            </div>
                        }
                    </div>
                </div>
                {/*//TODO: quitar el botón de pruebas*/}
                <div style={{marginTop: '50px'}} onClick={() => this.setState({currentMin: 20, currentMax: 80})}>change state</div>
            </div>
        )
    }
}

export default Range
