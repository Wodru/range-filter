import React from "react"

import {getLimits} from "../services/getLimits"
import Range from "../components/Range/Range"
import './Exercise1.scss'


class Exercise1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({min: 0, max: 100, isLoading: false})

        // getLimits().then((response) => {
        //     if (response.status === 200) {
        //         this.setState({min: response.data.min, max: response.data.max, isLoading: false})
        //     }
        //     else {
        //         this.setState({alert: response.statusText, isLoading: false})
        //     }
        //
        // })
    }


    render() {
        if (this.state.isLoading) return <div>Is Loading...</div>
        if (this.state.alert) return <div>{this.state.alert}</div>
        return (
            <div className="wrapper_exercise wrapper_exercise_1">
                <Range min={this.state.min} max={this.state.max}/>
            </div>
        )
    }
}

export default Exercise1

