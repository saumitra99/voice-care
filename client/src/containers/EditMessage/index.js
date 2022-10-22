import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { displayDateFormat, isJsonValid } from "../../helpers/common";
import {
  allMessagesRequest,
  markAsSeenRequest,
  updateJsonRequest,
} from "../AllMessages/actions";
import "./styles.scss";
// {
//   "_id": "6352ce79d024ea3a0dd2f802",
//   "message": "some message",
//   "isSeen": 0,
//   "timeStamp": {
//       "$timestamp": "7157010300917514244"
//   },
//   "json": {
//       "uniqueId": 2,
//       "label": "some label",
//       "text": "some text"
//   }
// }
const EachEditFeild = ({ data, open }) => {
  const [openDropdown, setOpenDropdown] = useState(open);
  const dispatch = useDispatch();
  const [json, setJson] = useState({ value: data?.json, error: false });
  const [alreadySeen, setAlreadySeen] = useState(data?.isSeen);
  useEffect(() => {
    setJson({ value: JSON.stringify(data?.json), error: false });
  }, [data]);
  useEffect(() => {
    if (openDropdown && !data?.isSeen) {
      dispatch(markAsSeenRequest({ _id: data._id }));
      setAlreadySeen(true);
    }
  }, [openDropdown]);

  const handleSubmit = () => {
    if (!isJsonValid(json?.value)) {
      setJson((prev) => ({ ...prev, error: true }));
    } else {
      const param = { ...data };
      param.json = JSON.parse(json.value);
      console.log(param, "param");
      dispatch(updateJsonRequest(param));
    }
  };

  return (
    <div className="edit-message">
      <div className="edit-message-wrapper">
        <div className="edit-message-each">
          <div className="edit-message-each-left">
            <div className="edit-message-each-left-item">
              {displayDateFormat(data?.updatedAt)}
            </div>
            <div className="edit-message-each-left-item">
              {data?.json?.label}
            </div>
            <div className="edit-message-each-left-item">
              {data?.json?.uniqueId}
            </div>
            <div className="edit-message-each-left-item">
              {alreadySeen ? `Seen` : "UnSeen"}
            </div>
          </div>
          <div
            className="edit-message-each-right"
            aria-hidden
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <div className="edit-message-each-right-arrow">
              <IoIosArrowDown size="20px" />
            </div>
          </div>
        </div>
        {openDropdown && (
          <div className="edit-message-extend">
            <textarea
              style={{ border: `${json?.error ? "2px solid red" : ""}` }}
              name="uniqueJson"
              value={json?.value}
              onChange={(e) => setJson({ value: e.target.value })}
            />
            {json?.error && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Invalid JSON or JSON fields
              </p>
            )}
            <div className="center-div">
              <button type="button" name="save" onClick={handleSubmit}>
                Apply changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function EditMessage() {
  const dispatch = useDispatch();
  const AllMessagesData = useSelector((state) => state.AllMessagesData);
  const queryID = new URLSearchParams(window?.location?.search).get("id");
  useEffect(() => {
    dispatch(allMessagesRequest());
  }, []);

  return (
    <div className="edit-message">
      {AllMessagesData?.allMessages?.map((i) => (
        <EachEditFeild data={i} open={queryID === i._id} />
      ))}
    </div>
  );
}

export default EditMessage;
