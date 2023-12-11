"use client";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import NormalNotificationCard from "./components/NormalNotificationCard";
import MediaCard from "./components/MediaCard";
import MessageCard from "./components/MessageCard";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
};

export type Action = {
  title: string;
  url: string;
};

export type Notification = {
  id: string;
  user: User;
  event: string;
  action: Action | null;
  message: string | null;
  media: string | null;
  created_at: string;
  unread?: boolean;
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://notifications-server.fly.dev/api/token?hiring_secret=m4v3H34l7H-5JJW"
        );
        const ws = new WebSocket(
          `wss://notifications-server.fly.dev/ws/notification/?token=${res.data.token}`
        );
        ws.addEventListener("message", (event) => {
          const newNotification = JSON.parse(event.data);
          newNotification["unread"] = true;

          setNotifications((prevNotifications) => {
            const updatedNotifications = [
              newNotification,
              ...prevNotifications,
            ];

            updatedNotifications.sort((a, b) =>
              moment(b.created_at).diff(moment(a.created_at))
            );

            return updatedNotifications;
          });
        });

        return () => {
          ws.close();
        };
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setUnread(
      notifications.filter((notification) => notification.unread).length
    );
  }, [notifications]);

  const handleMarkAllAsReadButton = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleMakeCardRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, unread: false } : notification
    );
    setNotifications(updatedNotifications);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "2%",
        padding: 20,
        paddingTop: 10,
      }}
      className="flex flex-col justify-between sm:w-full md:w-3/5 mt-4 md:mt-0 md:ml-[20%] border-2 border-white p-4 md:pt-2 bg-white rounded-lg"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 5,
          marginBottom: 15,
          alignItems: "center",
        }}
        className="flex justify-between w-full mt-2 mb-4 md:mb-8 items-center"
      >
        <div
          style={{
            display: "flex",
            width: "150px",
            justifyContent: "space-between",
          }}
        >
          <p className="text-black-900 font-bold">Notifications </p>
          <span
            className="flex rounded bg-blue-900 uppercase px-2 py-1 text-xs font-bold mr-4"
            style={{ opacity: "80%" }}
          >
            <p style={{ color: "white" }}>{unread > 100 ? "100+" : unread}</p>
          </span>
        </div>
        <button
          className="bg-transparent text-blue-700 hover:text-black py-2 px-4"
          onClick={handleMarkAllAsReadButton}
        >
          Mark all as read
        </button>
      </div>
      <div className="notifications">
        {notifications &&
          notifications.map((notification) => (
            <>
              {notification.media ? (
                <div
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                  className={`bg-${
                    notification["unread"] ? `blue` : `white`
                  }-100 px-4 py-3 flex mb-4  hover:cursor-pointer`}
                  onClick={() => handleMakeCardRead(notification.id)}
                >
                  <MediaCard notification={notification} />
                </div>
              ) : notification.message ? (
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className={`bg-${
                    notification["unread"] ? `blue` : `white`
                  }-100 px-4 py-3 flex mb-4  hover:cursor-pointer`}
                  onClick={() => handleMakeCardRead(notification.id)}
                >
                  <MessageCard notification={notification} />
                  <div
                    className="bg-blue-300 px-3 py-3"
                    style={{
                      borderRadius: 2,
                      width: "70%",
                    }}
                  >
                    <p style={{ fontSize: 13, opacity: "80%" }}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    borderRadius: 5,
                  }}
                  className={`bg-${
                    notification["unread"] ? `blue` : `white`
                  }-100 px-4 py-3 flex mb-4  hover:cursor-pointer`}
                  onClick={() => handleMakeCardRead(notification.id)}
                >
                  <NormalNotificationCard notification={notification} />
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
