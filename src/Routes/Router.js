import React from "react"
import { BrowserRouter as Router, Switch,Route} from "react-router-dom"
import GodOfWar from "./GodOfWar"
import Displacement from "./Displacement"
import Quiz from "./Quiz/Quiz"
import CreativeAnimation from "./CreativeAnimation/creativeAnimation"
const Routes = () => {
    return (
        <Router>
        <Switch>
        <Route path="/gow" component={GodOfWar}></Route>
        <Route path="/" exact component={Displacement}></Route>
        <Route path="/quiz" component={Quiz} />
        <Route path="/creative" component={CreativeAnimation} />
        </Switch>
        </Router>
    )
}

export default Routes;