import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const selectedRewardReducer = (state = initialState.selectedRewardReducer, action) => {
    switch(action.type) {

        case ActionType.GET_REWARD_RESPONSE: {
            return {
                ...state,
                reward: _.assign(action.reward)
            };
        }


        default: { return state; }
    }
};


export default selectedRewardReducer;