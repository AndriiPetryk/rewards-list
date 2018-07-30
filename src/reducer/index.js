import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import rewardsReducer from './rewardsReducer';
import selectedRewardReducer from './selectedRewardReducer';
import apiReducer from './apiReducer';

export default combineReducers({
    rewardsReducer,
    selectedRewardReducer,
    apiReducer,
    form: formReducer    
});


