import { call, put, takeLatest, all, delay } from "redux-saga/effects";
import {
  getAllMessages,
  postMarkAsSeen,
  postUpdatedJson,
} from "../../api/AllMessagesApi";
import {
  allMessagesSuccess,
  allMessagesFailure,
  markAsSeenSuccess,
  markAsSeenFailure,
  updateJsonSuccess,
  updateJsonFailure,
} from "./actions";
import ALL_MESSAGES_CONSTANTS from "./constants";

export function* handleAllMessages(action) {
  try {
    const response = yield call(getAllMessages, action.data); // API CALL
    yield put(allMessagesSuccess(response.data)); // DISPATCH ACTION
  } catch (error) {
    yield put(allMessagesFailure(error));
  }
}

export function* handleUpdateJson(action) {
  try {
    const response = yield call(postUpdatedJson, action.data); // API CALL
    yield put(updateJsonSuccess(response.data)); // DISPATCH ACTION
  } catch (error) {
    yield put(updateJsonFailure(error));
  }
}

export function* handleMarkAsSeen(action) {
  try {
    const response = yield call(postMarkAsSeen, action.data); // API CALL
    yield put(markAsSeenSuccess(response.data)); // DISPATCH ACTION
  } catch (error) {
    yield put(markAsSeenFailure(error));
  }
}

export default function* watchAllMessagesRequest() {
  yield all([
    takeLatest(ALL_MESSAGES_CONSTANTS.ALL_MESSAGES_REQUEST, handleAllMessages),
    takeLatest(ALL_MESSAGES_CONSTANTS.MARK_SEEN_REQUEST, handleMarkAsSeen),
    takeLatest(ALL_MESSAGES_CONSTANTS.UPDATE_JSON_REQUEST, handleUpdateJson),
  ]);
}

// export const markAsSeenRequest = (data) => ({
//   type: ALL_MESSAGES_CONSTANTS.MARK_SEEN_REQUEST,
//   data,
// });

// export const markAsSeenSuccess = (data) => ({
//   type: ALL_MESSAGES_CONSTANTS.MARK_SEEN_RECEIVE,
//   data,
// });

// export const markAsSeenFailure = (data) => ({
//   type: ALL_MESSAGES_CONSTANTS.MARK_SEEN_FAILURE,
//   data,
// });
