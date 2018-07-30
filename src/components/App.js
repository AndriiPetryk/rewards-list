import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import RewardListContainer from './course/RewardListContainer';
import AddOrEditRewardContainer from './course/AddOrEditRewardContainer';
import HeaderNavContainer from './landing/HeaderNavContainer';

const App = () => {
    return (
        <div >
            <Router>
                <div>
                    <HeaderNavContainer />
                    <Switch>
                        <Route exact path="/" component={Home} render={() => (
                            <Redirect from="/" to="/rewards"/>
                        )}/>
                        />
                        <Route path="/rewards" component={RewardListContainer} />
                        <Route path="/rewards/:tab" component={RewardListContainer} />
                        <Route exact path="/reward" component={AddOrEditRewardContainer} />
                        <Route path="/reward/:id" component={AddOrEditRewardContainer} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>

            </Router>
        </div>
    );
};


export default App;