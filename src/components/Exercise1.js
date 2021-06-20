import React from "react"

import {getLimits} from "../api"
import Range from "./Range"


class Exercise1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        getLimits().then((response) => {
            if (response.status === 200) {
                this.setState({min: response.data.min, max: response.data.max, isLoading: false})
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
                <Range min={this.state.min} max={this.state.max}/>
            </div>
        )
    }
}

export default Exercise1

