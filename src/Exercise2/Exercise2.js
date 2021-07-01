import React from "react"

import {getOptions} from "../services/getOptions"
import Range from "../components/Range/Range"


class Exercise2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        getOptions().then((response) => {
            if (response.status === 200) {
                const options = response.data.options
                let fixed = 0
                options.forEach(option => {
                    const numberOfDecimals = option.toString().split('.')[1] ? option.toString().split('.')[1].length : 0
                    fixed = numberOfDecimals > fixed ? numberOfDecimals : fixed
                })
                this.setState({
                    min: options.reduce((acc, val) => acc <= val ? acc : val),
                    max: options.reduce((acc, val) => acc >= val ? acc : val),
                    options: options,
                    fixed: fixed,
                    isLoading: false
                })
            }
            else {
                this.setState({alert: response.statusText, isLoading: false})
            }

        })
    }


    render() {
        if (this.state.isLoading) return <div>Is Loading...</div>
        if (this.state.alert) return <div>{this.state.alert}</div>
        return (
            <div>
                <Range min={this.state.min} max={this.state.max} options={this.state.options} fixed={this.state.fixed}/>
            </div>
        )
    }
}

export default Exercise2

