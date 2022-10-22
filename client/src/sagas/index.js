import { all } from "redux-saga/effects";
import watchAllMessagesRequest from "../containers/AllMessages/saga";

export default function* rootSaga() {
  yield all([watchAllMessagesRequest()]);
}
