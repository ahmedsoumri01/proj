import axios from 'axios';

export const checkIfUserExists = async (name, email) => {
  try {
    const response = await axios.get('/users', { params: { name, email } });
    return response.data.exists;
  } catch (error) {
    console.error(error);
  }
};

export const addUserToDatabase = async (user) => {
  try {
    const response = await axios.post('/users', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = (url ,username, password,msg) => {
  return axios.post(url, { username, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      console.log('ok')
      return { success: true };
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data.message === msg) {
          return { success: false, message1: error.response.data.message };
        } else {
          return { success: false, message2: error.response.data.message };
        }
      } else if (error.request) {
        return { success: false, message2: 'Unable to reach server. Please try again later.' };
      } else {
        return { success: false, message2: 'An error occurred. Please try again later.' };
      }
    });
};

/*export const loginUserr = (username, password, incorrectUsernameMsg, serverErrorMsg, genericErrorMsg) => {
    return axios.post('http://localhost:8050/login', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        console.log('ok')
        return { success: true };
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.message === 'Username is incorrect') {
            return { success: false, message: incorrectUsernameMsg };
          } else {
            return { success: false, message: serverErrorMsg };
          }
        } else if (error.request) {
          return { success: false, message: serverErrorMsg };
        } else {
          return { success: false, message: genericErrorMsg };
        }
      });
  };*/


/*
const makeApiCall = (url, data, token = null) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios({
    method: 'post',
    url,
    data,
    headers,
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error.message;
    }
  });
};



// Signup example
import makeApiCall from './makeApiCall';

export const signupUser = (username, password, email) => {
  const data = { username, password, email };
  return makeApiCall('http://localhost:8050/signup', data)
    .then((response) => {
      localStorage.setItem('token', response.token);
      return { success: true };
    })
    .catch((error) => {
      return { success: false, message: error.message };
    });
};
// Login example
/*import makeApiCall from './makeApiCall';

export const loginUser = (username, password) => {
  const data = { username, password };
  return makeApiCall('http://localhost:8050/login', data)
    .then((response) => {
      localStorage.setItem('token', response.token);
      return { success: true };
    })
    .catch((error) => {
      if (error.message === 'Username is incorrect') {
        return { success: false, message1: error.message };
      } else {
        return { success: false, message2: error.message };
      }
    });
};*/