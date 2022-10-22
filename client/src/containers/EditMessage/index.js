import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { displayDateFormat, isJsonValid } from "../../helpers/common";
import {
  allMessagesRequest,
  markAsSeenRequest,
  updateJsonRequest,
} from "../AllMessages/actions";
import PropTypes from "prop-types";
import "./styles.scss";
import { Spin } from "antd";

const EachEditFeild = ({ data, open }) => {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(open);
  const [json, setJson] = useState({
    value: data?.json,
    error: false,
    notChanged: true,
  });
  const [alreadySeen, setAlreadySeen] = useState(data?.isSeen);
  const jsonUpdatedSuccess = useSelector(
    (state) => state?.AllMessagesData?.updateJson
  );
  const jsonUpdatedLoading = useSelector(
    (state) => state?.AllMessagesData?.updateJsonLoading
  );

  // as soon as each dropdown gets there data this will stringify the json
  useEffect(() => {
    setJson({ value: JSON.stringify(data?.json), error: false });
  }, [data]);

  // once the dropdown is open it will mark it as seen
  useEffect(() => {
    if (openDropdown && !data?.isSeen) {
      dispatch(markAsSeenRequest({ _id: data._id }));
      setAlreadySeen(true);
    }
  }, [openDropdown]);

  // after updating the json i am making
  // notChanged to true so to stop the update api call if the
  // user repeatedly clicks on it
  useEffect(() => {
    console.log(jsonUpdatedSuccess, jsonUpdatedLoading, "jsonUpdatedLoading");
    if (jsonUpdatedSuccess) {
      setJson((prev) => ({ ...prev, notChanged: true }));
    }
    return () => {};
  }, [jsonUpdatedSuccess]);

  // this func will validate the json and the post it to the server
  const handleSubmit = () => {
    if (!isJsonValid(json?.value)) {
      setJson((prev) => ({ ...prev, error: true }));
    } else {
      const param = { ...data };
      param.json = JSON.parse(json.value);
      console.log(param, "param");
      if (JSON.stringify(param) !== JSON.stringify(data) && !json?.notChanged) {
        dispatch(updateJsonRequest(param));
      }
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
              {openDropdown ? (
                <IoIosArrowUp size="20px" />
              ) : (
                <IoIosArrowDown size="20px" />
              )}
            </div>
          </div>
        </div>
        {openDropdown && (
          <div className="edit-message-extend">
            <textarea
              style={{ border: `${json?.error ? "2px solid red" : ""}` }}
              name="uniqueJson"
              value={json?.value}
              onChange={(e) =>
                setJson({
                  value: e.target.value,
                  error: false,
                  notChanged: false,
                })
              }
            />
            {json?.error && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Invalid JSON or JSON fields
              </p>
            )}
            <div className="center-div">
              <button
                type="button"
                name="save"
                onClick={() => {
                  if (!jsonUpdatedLoading) handleSubmit();
                }}
              >
                {jsonUpdatedLoading ? <Spin /> : "Apply changes"}
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

  // this is to all the all messages api
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
EachEditFeild.propType = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
};
export default EditMessage;
