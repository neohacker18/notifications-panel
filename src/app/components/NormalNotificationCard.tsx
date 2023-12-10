import moment from "moment";
import React from "react";

const NormalNotificationCard = ({notification}) => {
  return (
    <>
      <div className="profile_picture h-9" style={{ width: "70px" }}>
        <img
          src={notification.user.profile_picture}
          alt=""
          height={"35px"}
          width={"35px"}
        />
      </div>
      <div
        className="w-1/7 h-10"
        // style={{ border: "1px solid black" }}
      >
        <div
          className="flex-1 h-12"
          style={{
            flexDirection: "column",
            // border: "1px solid black"
          }}
        >
          <p>
            <span className="font-bold">
              {notification.user.first_name} {notification.user.last_name}{" "}
            </span>
            <span>{notification.event} </span>
            <span className="text-blue-700">{notification.action?.title}</span>
          </p>
          <div
            className="flex-1 h-12 "
            style={{ opacity: "70%", fontSize: 13 }}
          >
            <p>{moment(notification.created_at).fromNow()}</p>
          </div>
        </div>
      </div>
      <div
        className="flex-1 h-12"
        // style={{ border: "1px solid black" }}
      >
        {/* <p className="text-blue-700">{notification.action?.title}</p> */}
      </div>
      <div className="w-1/7 h-12">
        {notification.message ? (
          <div className="bg-blue-100 px-4 py-3" style={{ borderRadius: 2 }}>
            <p style={{ fontSize: 13 }}>{notification.message}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NormalNotificationCard;
