import { UPDATE_ONBOARDING_STATUS ,UPDATE_USER_LOGIN, UPDATE_USER_ACCESS_TOKEN,UPDATE_USER_PROFILE} from "../constants";

export const updateOnboarding = (status) => {
    return {
        type: UPDATE_ONBOARDING_STATUS,
        status
    }
}

export const updateUserLogin = (user, isLoggedIn) => {
    return {
        type: UPDATE_USER_LOGIN,
        user,
        isLoggedIn
    };
};

export const updateUserAccessToken = (accessToken) => {
    return {
        type: UPDATE_USER_ACCESS_TOKEN,
        accessToken
    };
};

export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    };
  };

  export const updateUserProfileError = (error) => ({
    type: UPDATE_USER_PROFILE_ERROR,
    payload: error,
  });

  