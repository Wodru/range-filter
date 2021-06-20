import React from "react"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Range from "./components/Range"
import Exercise1 from "./components/Exercise1"
import Exercise2 from "./components/Exercise2"


class Routes extends React.Component {


    render() {
        return (
            <BrowserRouter>
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
                    {/*<Route path={'/'} component={HelloWorld}/>*/}
                    <Route path={'/'} component={() =>
                        <div className="wrapper" style={{padding: '25px', background: 'lightblue', width: '400px', height: '200px'}}>
                            <Range min={0} max={200} fixed={2} options={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}/>
                        </div>
                    }/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes

