import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import {get, isEqual} from 'lodash';
import * as rewardAction from '../../action/RewardAction';
import RewardList from './RewardList';



export class RewardListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.base = {
            matchTab: get(this.props, 'match.params.tab', null)
        }
    }

    componentWillReceiveProps(nextProps){
        const { match: { params } } = nextProps;
        if (!isEqual(params.tab, this.base.matchTab)) {
             this.base.matchTab = params.tab;
         }
    }

    componentDidMount() {
        this.props.action.getRewardsAction()
            .catch(error => {
                toastr.error(error);
            });
    }

    render() {
        const { rewards } = this.props;

        if (!rewards) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Rewards list</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <RewardList rewards={rewards} history={this.props.history} tab={this.base.matchTab} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    rewards: state.rewardsReducer.rewards
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(rewardAction, dispatch)

});


export default connect(mapStateToProps, mapDispatchToProps)(RewardListContainer);
