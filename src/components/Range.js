import React from "react"

class Range extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMin: props.min,
            tempCurrentMin: props.min,
            currentMax: props.max,
            tempCurrentMax: props.max
        }
    }

    calculateLeftPercent() {
        const diff = this.props.max - this.props.min
        return parseFloat((100 * (this.state.currentMin - this.props.min) / diff).toFixed(2))
    }

    calculateWidthPercent() {
        const diff = this.props.max - this.props.min
        const currentDiffMinOne = (this.state.currentMax - this.state.currentMin) > 1 ? this.state.currentMax - this.state.currentMin : 1
        return parseFloat((100 * (currentDiffMinOne) / diff).toFixed(2))
    }

    handleSetMin(value) {
        if (value !== '' && isFinite(value)) {
            if (parseFloat(value) < parseFloat(this.props.min)) value = this.props.min
            if (parseFloat(value) > parseFloat(this.state.currentMax)) value = this.state.currentMax
            this.setState({showInputCurrentMin: false, currentMin: value, tempCurrentMin: value})
        }
        else
            this.setState({tempCurrentMin: this.state.currentMin})

    }

    handleSetMax(value) {
        if (value !== '' && isFinite(value)) {
            if (parseFloat(value) > parseFloat(this.props.max)) value = this.props.max
            if (parseFloat(value) < parseFloat(this.state.currentMin)) value = this.state.currentMin
            this.setState({showInputCurrentMax: false, currentMax: value, tempCurrentMax: value})
        }
        else
            this.setState({tempCurrentMax: this.state.currentMax})
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


                    <div className="input-range__bar-background" data-cy="input-range__bar-background">
                        <div style={{left: this.calculateLeftPercent() + '%', width: this.calculateWidthPercent() + '%', minWidth: '30px'}} className="input-range__bar"
                             data-cy="input-range__bar">
                            <div className="wrapper_bullet">
                                <div className="input-range__bullet input-range__bullet--min" data-cy="input-range__bullet-min"/>
                            </div>
                            <div className="wrapper_bullet">
                                <div className="input-range__bullet input-range__bullet--max" data-cy="input-range__bullet-max" style={{backgroundColor: 'red'}}/>
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
