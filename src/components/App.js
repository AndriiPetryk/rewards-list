import React from 'react';
import { Router, Route, Switch} from 'react-router';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import RewardListContainer from './course/RewardListContainer';
// import RewardList from './course/RewardList';
import AddOrEditRewardContainer from './course/AddOrEditRewardContainer';
import HeaderNavContainer from './landing/HeaderNavContainer';
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <HeaderNavContainer />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/rewards" component={RewardListContainer} />
                        <Route path="/reward/:tab" component={RewardListContainer} />
                        <Route exact path="/user" component={AddOrEditRewardContainer} />
                        <Route path="/user/:id" component={AddOrEditRewardContainer} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>
            </Router>
        </div>
    );
};


export default App;