import { combineReducers } from "redux";
import AllMessagesReducer from "../containers/AllMessages/reducer";

const rootReducer = combineReducers({
  AllMessagesData: AllMessagesReducer,
});

export default rootReducer;
