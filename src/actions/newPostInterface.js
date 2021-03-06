import {
  NEW_POST_MODAL,
  NEW_POST_FORM,
  NEW_POST_IS_ERROR,
  NEW_POST_ERROR_MSG,
  EDITING_EXISTING_POST,
  CHANGE_NEW_POST_REBLOGGING_STATUS
} from "./types";

export const newPostModal = props => dispatch => {
  dispatch({
    type: NEW_POST_MODAL,
    payload: props
  });
};
export const newPostForm = props => dispatch => {
  dispatch({
    type: NEW_POST_FORM,
    payload: props
  });
};
export const newPostIsError = props => dispatch => {
  dispatch({
    type: NEW_POST_IS_ERROR,
    payload: props
  });
};
export const newPostErrorMsg = props => dispatch => {
  dispatch({
    type: NEW_POST_ERROR_MSG,
    payload: props
  });
};
export const editingExistingPost = props => dispatch => {
  dispatch({
    type: EDITING_EXISTING_POST,
    payload: props
  });
};
export const newPostIsReblogging = props => dispatch => {
  dispatch({
    type: CHANGE_NEW_POST_REBLOGGING_STATUS,
    payload: props
  });
};
