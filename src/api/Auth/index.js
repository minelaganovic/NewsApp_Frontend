import axios from 'axios';

export const loginUser = (values) => {
    const url = 'api/users/login';
  
    return axios.post(url, values)
        .then(response => response.data)
        .catch(error => {
            console.error("Greška prilikom slanja zahteva:", error);
            throw error; // 
        });
  } 


// Register User
export const registerUser = (values) => {
    const url = 'api/users';

    return axios.post(url, values)
        .then(response => response.data);
}

export const updateUserProfile = (userData) => async (dispatch) => {
    try {
      const response = await axios.put('api/users/profile', userData);
      if (response && response.status === 200) {
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: response.data });
      } else {
        dispatch({ type: 'UPDATE_USER_PROFILE_ERROR', payload: 'Neuspešan zahtev za ažuriranje profila.' });
      }
    } catch (error) {
      // Rukovanje greškom
      console.error('Greška prilikom ažuriranja profila:', error);
      dispatch({ type: 'UPDATE_USER_PROFILE_ERROR', payload: 'Došlo je do greške prilikom ažuriranja profila.' });
    }
  };
  