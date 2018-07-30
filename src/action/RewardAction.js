import * as ActionType from './ActionType';
import RewardApi from '../api/RewardApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';



export const getRewardsResponse = rewards => ({
    type: ActionType.GET_REWARDS_RESPONSE,
    rewards
});


export function getRewardsAction() {
    return (dispatch) => {

        dispatch(ApiCallBeginAction());


        return RewardApi.getAllRewards()
            .then(rewards => {
                dispatch(getRewardsResponse(rewards));
            }).catch(error => {
                throw error;
            });
    };
}


export const addNewReawrdResponse = () => ({
    type: ActionType.ADD_NEW_REWARD_RESPONSE
});



export const updateExistingRewardResponse = () => ({
    type: ActionType.UPDATE_EXISTING_REWARD_RESPONSE
});


export function saveRewardAction(rewardBeingAddedOrEdited) {
    return function (dispatch) {
        dispatch(ApiCallBeginAction());
        return RewardApi.saveReward(rewardBeingAddedOrEdited)
            .then(() => {
                if (rewardBeingAddedOrEdited.id) {
                    dispatch(updateExistingRewardResponse());
                } else {
                    dispatch(addNewReawrdResponse());
                }
            }).then(() => {
                dispatch(getRewardsAction());
            }).catch(error => {
                dispatch(ApiCallErrorAction());
                throw (error);
            });
    };
}

export const getRewardResponse = rewardFound => ({
    type: ActionType.GET_REWARD_RESPONSE,
    reward: rewardFound
});



export function getRewardAction(rewardId) {
    return (dispatch) => {
        dispatch(ApiCallBeginAction());
        return RewardApi.getReward(rewardId)
            .then(reward => {
                // console.log("rewardId getReward", rewardId);
                dispatch(getRewardResponse(reward));
            }).catch(error => {
                throw error;
            });
    };
}