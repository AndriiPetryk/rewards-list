import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as rewardAction from '../../action/RewardAction';
import CourseForm from './RewardForm';


export class AddOrEditRewardContainer extends React.Component {


    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            initialValues: null
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({initialValues: nextProps.initialValues});
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
                toastr.success('Reward saved');
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
                    initialValues={this.state.initialValues}
                />
            </div>
        );
    }
}


function mapStateToProps(state){
        return {
            initialValues: state.selectedRewardReducer.reward
        };

};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...rewardAction }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditRewardContainer);
