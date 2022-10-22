import ALL_MESSAGES_CONSTANTS from "./constants";

const initialState = {
  allMessages: null,
  allMessagesLoading: true,
  allMessagesError: false,
  markSeen: false,
  markSeenError: false,
  updateJson: null,
  updateJsonLoading: false,
  updateJsonError: false,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_REQUEST:
      return {
        ...state,
        allMessagesLoading: true,
      };
    case ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_RECEIVE:
      return {
        ...state,
        allMessagesLoading: false,
        allMessages: action.data,
        allMessagesError: false,
      };
    case ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_FAILURE:
      return {
        ...state,
        allMessagesLoading: false,
        allMessagesError: true,
      };

    case ALL_MESSAGES_CONSTANTS.MARK_SEEN_REQUEST:
      return {
        ...state,
      };
    case ALL_MESSAGES_CONSTANTS.MARK_SEEN_RECEIVE:
      return {
        ...state,
        markSeen: action.data,
        markSeenError: false,
      };
    case ALL_MESSAGES_CONSTANTS.MARK_SEEN_FAILURE:
      return {
        ...state,
        allMessagesLoading: false,
        markSeenError: true,
      };

    case ALL_MESSAGES_CONSTANTS.UPDATE_JSON_REQUEST:
      return {
        ...state,
        updateJson: null,
        updateJsonLoading: true,
        updateJsonError: false,
      };
    case ALL_MESSAGES_CONSTANTS.UPDATE_JSON_RECEIVE:
      return {
        ...state,
        updateJson: action.data,
        updateJsonLoading: false,
        updateJsonError: false,
      };
    case ALL_MESSAGES_CONSTANTS.UPDATE_JSON_FAILURE:
      return {
        ...state,
        updateJsonLoading: false,
        updateJsonError: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default messagesReducer;
