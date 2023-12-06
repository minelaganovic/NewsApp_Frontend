import {UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_ACCESS_TOKEN,UPDATE_USER_PROFILE, UPDATE_USER_PROFILE_ERROR,
    UPDATE_SELECTED_OPTION
} from '../constants';

const initialState = {
    isOnboardingDisabled: false,
    isLoggedIn: false,
    user: {},
    accessToken: "",
    selectedOption: "0"
}


const authReducer = (state = initialState, action) => {
    const {status, type, isLoggedIn, user, accessToken} = action;

    switch(type) {
        case UPDATE_ONBOARDING_STATUS:
            return {...state, isOnboardingDisabled: status};

        case UPDATE_USER_LOGIN:
            return {...state, user, isLoggedIn};

        case UPDATE_USER_ACCESS_TOKEN:
           return {...state, accessToken};
        
        case UPDATE_USER_PROFILE:
            return {
              ...state,
              user: action.payload,
              error: null,
            };
        case UPDATE_USER_PROFILE_ERROR:
            return {
              ...state,
              error: action.payload,
            };
      
        
        case 'LOGOUT_USER':
            return {
              ...initialState,
            };

        case UPDATE_SELECTED_OPTION:
                return {
                  ...state,
                  selectedOption: payload.selectedOption 
                };
        default:
            return state;
    }
};


export default authReducer;