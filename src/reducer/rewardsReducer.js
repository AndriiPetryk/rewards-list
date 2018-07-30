import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';



const rewardsReducer = (state = initialState.rewardsReducer, action) => {
    switch(action.type) {
        case ActionType.GET_REWARDS_RESPONSE: {
            return {
                ...state, 
                rewards: _.assign(action.rewards)
            };
        }


        default: { return state; }
    }
};



export default rewardsReducer;