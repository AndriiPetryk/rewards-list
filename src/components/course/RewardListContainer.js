import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as rewardAction from '../../action/RewardAction';
import RewardList from './RewardList';



export class RewardListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedRewardId: undefined};
        // this.handleRowSelect = this.handleRowSelect.bind(this);
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
                        <RewardList rewards={rewards} d={this.props} handleRowSelect={this.handleRowSelect}/>
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
