import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as rewardAction from '../../action/RewardAction';
import CourseForm from './RewardForm';


export class AddOrEditRewardContainer extends React.Component {


    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }


    componentDidMount() {

        this.props.action.getRewardAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });
    }

    handleSave(values) {
        const reward = {
            id: values.id,
            user: values.user,
            experience: values.experience,
            date: values.date,
            status: values.status,
        };

        this.props.action.saveRewardAction(reward)
            .then(() => {
                toastr.success('Course saved');
                this.props.history.push('/rewards');
            }).catch(error => {
                toastr.error(error);
            });
    }


    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/rewards');
    }


    render() {
        const heading = 'Edit';

        return (
            <div className="container">
                <CourseForm
                    heading={heading}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const rewardId = ownProps.match.params.id;
    console.log("rewardId", rewardId);
    // console.log("state.selectedRewardReducer.reward", state.selectedRewardReducer.reward);
    if (rewardId && state.selectedRewardReducer.reward !=undefined && rewardId === state.selectedRewardReducer.reward.id) {
        return {
            initialValues: state.selectedRewardReducer.reward,
        };
    }else{
        return {
            initialValues: state.selectedRewardReducer.reward,
        };
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...rewardAction }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditRewardContainer);
