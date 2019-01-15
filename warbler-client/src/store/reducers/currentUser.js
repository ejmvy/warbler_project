import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,  // will be true when logged in
    user: {}  // all the user info when theyre logged in
};

export default(state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                // isAuthenticated: Object.keys(action.user).length > 0;
                //turn empty obj into false or if there are keys, true
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default: 
            return state;
    }
}