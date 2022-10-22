import React, { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { DatePicker } from "antd";
import { allMessagesRequest } from "./actions";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import io from "socket.io-client";
import "./styles.scss";
import { getEpoch } from "../../helpers/common";
import ConditionalRender from "../../components/ConditionalRender";
import dayjs from "dayjs";

var socket;
function AllMessages({ history }) {
  const dispatch = useDispatch();
  const [allMessages, setAllMessages] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const AllMessagesData = useSelector((state) => state.AllMessagesData);
  const { RangePicker } = DatePicker;

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

  const handleDateSelection = (start, days) => {
    console.log(
      days,
      days[0],
      days[1],
      [getEpoch(days[0]), getEpoch(days[1])],
      "date"
    );
    // setSelectedDate((prev) => [getEpoch(days[0]), getEpoch(days[1])]);
    setSelectedDate((prev) => ({
      start: dayjs(days[0]).unix(),
      end: dayjs(days[1]).unix(),
    }));
  };
  useEffect(() => {
    if (AllMessagesData) {
      setAllMessages(AllMessagesData.allMessages);
    }
  }, [AllMessagesData]);
  if (AllMessagesData?.allMessagesLoading) return <PageLoader />;

  return (
    <div className="all-messages">
      <div className="all-messages-date-range">
        <RangePicker format={"DD/MM/YYYY"} onChange={handleDateSelection} />
      </div>

      <div className="all-messages-box">
        <ConditionalRender
          condition={selectedDate?.start <= selectedDate?.end}
          childrenA={
            <>
              {allMessages
                ?.filter(
                  (i) =>
                    getEpoch(i?.createdAt) >= selectedDate?.start &&
                    getEpoch(i?.createdAt) <= selectedDate?.end
                )
                ?.sort((prev, curr) => prev?.createdAt - curr?.createdAt)
                ?.map((i) => (
                  <div className="all-messages-box-each">
                    {console.log(
                      getEpoch(i?.createdAt),
                      "getEpoch(i?.createdAt)"
                    )}
                    <div
                      className={`all-messages-box-each-status ${
                        i?.isSeen ? "color-red" : "color-green"
                      }`}
                    >
                      {i?.isSeen ? "Seen" : "UnSeen"}
                    </div>
                    <div className="all-messages-box-each-message">
                      Unique ID {i?.json?.uniqueId} to Understand which request
                      Failed
                    </div>
                    <div
                      className="all-messages-box-each-arrow"
                      onClick={() => history.push(`/edit-message?id=${i?._id}`)}
                    >
                      <FaArrowRight style={{ width: "50px" }} />
                    </div>
                  </div>
                ))}
            </>
          }
          childrenB={allMessages?.map((i) => (
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
        />
      </div>
    </div>
  );
}
AllMessages.propType = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default AllMessages;
