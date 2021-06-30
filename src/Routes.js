import React from "react"
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Exercise1 from "./components/Exercise1/Exercise1"
import Exercise2 from "./components/Exercise2/Exercise2"
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()


class Routes extends React.Component {


    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path={'/exercise1'} component={() =>
                        <div className="wrapper" style={{padding: '25px', width: '400px'}}>
                            <Exercise1/>
                        </div>
                    }/>
                    <Route path={'/exercise2'} component={() =>
                        <div className="wrapper" style={{padding: '25px', width: '400px'}}>
                            <Exercise2/>
                        </div>}/>
                    <Route path={'/'} component={() =>
                        <div>
                            <span>hello world</span>
                            <ul>
                                <li><Link to="/exercise1">Exercise 1</Link></li>
                                <li><Link to="/exercise2">Exercise 2</Link></li>
                            </ul>
                        </div>
                    }/>
                </Switch>
            </Router>
        )
    }
}

export default Routes

