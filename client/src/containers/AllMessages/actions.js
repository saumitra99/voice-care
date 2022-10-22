import ALL_MESSAGES_CONSTANTS from "./constants";

export const allMessagesRequest = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_REQUEST,
  data,
});

export const allMessagesSuccess = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_RECEIVE,
  data,
});

export const allMessagesFailure = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_FAILURE,
  data,
});

export const markAsSeenRequest = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.MARK_SEEN_REQUEST,
  data,
});

export const markAsSeenSuccess = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.MARK_SEEN_RECEIVE,
  data,
});

export const markAsSeenFailure = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.MARK_SEEN_FAILURE,
  data,
});

export const updateJsonRequest = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.UPDATE_JSON_REQUEST,
  data,
});

export const updateJsonSuccess = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.UPDATE_JSON_RECEIVE,
  data,
});

export const updateJsonFailure = (data) => ({
  type: ALL_MESSAGES_CONSTANTS.UPDATE_JSON_FAILURE,
  data,
});
