import axios from "axios";
import html2canvas from "html2canvas";
import { config } from "../config/config.js";

import {
  SET_DATA_SUCCESS,
  SET_DATA_BLANK,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILED,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILED,
  POST_DATA_REQUEST,
  POST_DATA_SUCCESS,
  POST_DATA_FAILED,
  UPDATE_DATA_REQUEST,
  UPDATE_DATA_SUCCESS,
  UPDATE_DATA_FAILED,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  RENDER_PREVIEW_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILED,
  SET_TITLE,
  SET_PERSONAL_DETAILS,
  UPDATE_DATA,
} from "./actionTypes";

export const loginCheck = (user, callback) => {
  return (dispatch) => {
    dispatch(logInRequest());
    axios({
      url: `${config.REACT_APP_API_URL}/api/auth/login/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    })
      .then((response) => {
        const data = response.data;
        dispatch(logInSuccess(data.token));
        callback(data.token);
      })
      .catch((error) => {
        dispatch(logInFailure(error.message));
      });
  };
};

export const logInRequest = () => {
  return {
    type: LOG_IN_REQUEST,
  };
};

export const logInSuccess = (token) => {
  return {
    type: LOG_IN_SUCCESS,
    payload: token,
  };
};

export const logInFailure = (error) => {
  return {
    type: LOG_IN_FAILED,
    payload: error,
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logOutRequest());
    dispatch(logOutSuccess());
  };
};

export const logOutRequest = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const logOutSuccess = (token) => {
  localStorage.removeItem("token");
  return {
    type: LOG_OUT_SUCCESS,
    payload: null,
  };
};

export const logOutFailure = () => {
  return {
    type: LOG_OUT_FAILED,
  };
};

export const setData = (index, callback) => {
  return (dispatch) => {
    if (index === -1) dispatch(setDataBlank(index));
    else dispatch(setDataSuccess(index));
    callback();
  };
};

export const setDataSuccess = (index) => {
  return {
    type: SET_DATA_SUCCESS,
    payload: index,
  };
};

export const setDataBlank = (index) => {
  return {
    type: SET_DATA_BLANK,
    payload: index,
  };
};

export const fetchData = (token, callback) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axios
      .get(`${config.REACT_APP_API_URL}/api/resume/all/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
        callback();
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILED,
    payload: error,
  };
};

export const fetchUserData = (token, callback) => {
  return (dispatch) => {
    dispatch(fetchUserDataRequest());
    axios
      .get(`${config.REACT_APP_API_URL}/api/auth/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        dispatch(fetchUserDataSuccess(data));
        callback();
      })
      .catch((error) => {
        dispatch(fetchUserDataFailure(error.message));
      });
  };
};

export const fetchUserDataRequest = () => {
  return {
    type: FETCH_USER_DATA_REQUEST,
  };
};

export const fetchUserDataSuccess = (data) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchUserDataFailure = (error) => {
  return {
    type: FETCH_USER_DATA_FAILED,
    payload: error,
  };
};

export const postData = (token, resume) => {
  return (dispatch) => {
    dispatch(postDataRequest());

    console.log("Data being sent to backend:", resume);

    axios({
      url: `${config.REACT_APP_API_URL}/api/resume/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: resume,
    })
      .then((response) => {
        dispatch(postDataSuccess(response.data));
        alert("Resume saved successfully");
      })
      .catch((error) => {
        console.error("Error response:", error.response);
        if (error.response && error.response.status === 500) {
          // General 500 error
          dispatch(
            postDataFailure(
              "Server Error. A resume with same title may already exists. Try again by choosing a unique title."
            )
          );
          alert(
            "Server Error. A resume with same title may already exists. Try again by choosing a unique title."
          );
        } else if (error.response) {
          // Other HTTP errors (e.g., 400, 404)
          dispatch(
            postDataFailure(error.response.data.message || "An error occurred.")
          );
        } else {
          // Network errors or other unexpected errors
          dispatch(
            postDataFailure(
              error.message || "Network error. Please check your connection."
            )
          );
        }
      });
  };
};

export const postDataRequest = () => {
  return {
    type: POST_DATA_REQUEST,
  };
};

export const postDataSuccess = (data) => {
  return {
    type: POST_DATA_SUCCESS,
    payload: data,
  };
};

export const postDataFailure = (error) => {
  return {
    type: POST_DATA_FAILED,
    payload: error,
  };
};

export const updateData = (token, resume) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  const user = JSON.parse(window.atob(base64));

  const bodyData = {
    data: resume,
    user: user,
  };

  return (dispatch) => {
    dispatch(updateDataRequest());

    axios({
      url: `${config.REACT_APP_API_URL}/api/resume/${resume._id}/`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      data: JSON.stringify(bodyData),
    })
      .then((response) => {
        const data = response.data;
        dispatch(updateDataSuccess(data.data));
      })
      .catch((error) => {
        dispatch(updateDataFailure(error.message));
      });
  };
};

export const updateDataRequest = () => {
  return {
    type: UPDATE_DATA_REQUEST,
  };
};

export const updateDataSuccess = (data) => {
  return {
    type: UPDATE_DATA_SUCCESS,
    payload: data,
  };
};

export const updateDataFailure = (error) => {
  return {
    type: UPDATE_DATA_FAILED,
    payload: error,
  };
};

export const renderPreview = () => {
  return (dispatch) => {
    html2canvas(document.querySelector("#template")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      dispatch(renderPreviewSuccess(imgData));
    });
  };
};

export const renderPreviewSuccess = (image) => {
  return {
    type: RENDER_PREVIEW_SUCCESS,
    payload: image,
  };
};

export const updateUser = (newUser, token) => {
  return (dispatch) => {
    dispatch(updateUserRequest());
    console.log("Data being sent to backend to update:", newUser);
    axios({
      url: `${config.REACT_APP_API_URL}/api/auth/user/`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: newUser,
    })
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
        alert("User Update saved successfully");
      })
      .catch((error) => {
        console.error("Error response:", error.response);
        if (error.response && error.response.status === 500) {
          // General 500 error
          dispatch(
            updateUserFailure(
              "Server Error. Same Email may already exists. Try again by choosing a unique email."
            )
          );
          alert(
            "Server Error. Same Email may already exists. Try again by choosing a unique email."
          );
        } else if (error.response) {
          // Other HTTP errors (e.g., 400, 404)
          dispatch(
            updateUserFailure(
              error.response.data.message || "An error occurred."
            )
          );
        } else {
          // Network errors or other unexpected errors
          dispatch(
            updateUserFailure(
              error.message || "Network error. Please check your connection."
            )
          );
        }
      });
  };
};

export const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

export const updateUserSuccess = () => {
  return {
    type: UPDATE_USER_SUCCESS,
  };
};

export const updateUserFailure = (error) => {
  return {
    type: UPDATE_USER_FAILED,
    payload: error,
  };
};

export const deleteData = (token, resume) => {
  return (dispatch) => {
    dispatch(deleteDataRequest());

    axios({
      url: `${config.REACT_APP_API_URL}/api/resume/${resume.id}/`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(deleteDataSuccess());
        alert("Deleted successfully");
      })
      .catch((error) => {
        dispatch(deleteDataFailure(error.message));
      });
  };
};

export const deleteDataRequest = () => {
  return {
    type: DELETE_DATA_REQUEST,
  };
};

export const deleteDataSuccess = () => {
  return {
    type: DELETE_DATA_SUCCESS,
  };
};

export const deleteDataFailure = (error) => {
  return {
    type: DELETE_DATA_FAILED,
    payload: error,
  };
};

export const setTitle = (data) => {
  return {
    type: SET_TITLE,
    payload: data,
  };
};

export const setPersonalDetails = (data) => {
  return {
    type: SET_PERSONAL_DETAILS,
    payload: data,
  };
};

export const updateResumeData = (data) => {
  return {
    type: UPDATE_DATA,
    payload: data,
  };
};
