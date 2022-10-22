import React, { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { allMessagesRequest } from "./actions";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import "./styles.scss";

var socket;
function AllMessages({ history }) {
  const dispatch = useDispatch();
  const [allMessages, setAllMessages] = useState([]);
  const AllMessagesData = useSelector((state) => state.AllMessagesData);

  const getData = (data) => {
    setAllMessages(data);
    // this.setState({ food_data: foodItems });
  };

  // const changeData = () => socket.emit("initial_data");
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, "process.env.REACT_APP_API_URL");
    socket = io(process.env.REACT_APP_API_URL);
    dispatch(allMessagesRequest());
    // var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", getData);
    return () => {
      socket.off("get_data");
    };
  }, []);

  // const markSeen = (id) => {
  //   // console.log(predicted_details);
  //   socket.emit("mark_seen", id);
  // };

  useEffect(() => {
    if (AllMessagesData) {
      setAllMessages(AllMessagesData.allMessages);
    }
  }, [AllMessagesData]);
  if (AllMessagesData?.allMessagesLoading) return <PageLoader />;

  return (
    <div className="all-messages">
      <div className="all-messages-box">
        {allMessages?.map((i) => (
          <div className="all-messages-box-each">
            <div
              className={`all-messages-box-each-status ${
                i?.isSeen ? "color-red" : "color-green"
              }`}
            >
              {i?.isSeen ? "Seen" : "UnSeen"}
            </div>
            <div className="all-messages-box-each-message">
              Unique ID {i?.json?.uniqueId} to Understand which request Failed
            </div>
            <div
              className="all-messages-box-each-arrow"
              onClick={() => history.push(`/edit-message?id=${i?._id}`)}
            >
              <FaArrowRight style={{ width: "50px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllMessages;
