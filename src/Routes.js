import React from "react"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Range from "./components/Range"


class Routes extends React.Component {


    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={'/exercise1'} component={() =>
                        <div className="wrapper" style={{background: 'lightblue', width: '400px'}}>
                            <Range min={1} max={100}/>
                        </div>
                    }/>
                    <Route path={'/exercise2'} component={() => 'exercise 2'}/>
                    {/*<Route path={'/'} component={HelloWorld}/>*/}
                    <Route path={'/'} component={() =>
                        <div className="wrapper" style={{padding: '25px', background: 'lightblue', width: '400px', height: '200px'}}>
                            <Range min={0} max={200}/>
                        </div>
                    }/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes

