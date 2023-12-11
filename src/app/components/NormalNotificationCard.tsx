import moment from "moment";
import { FaCircle } from "react-icons/fa";

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

const NormalNotificationCard:React.FC<{notification:Notification}> = ({ notification}) =>  {
  return (
    <>
      <div className="flex items-center">
        <div className="profile_picture h-9" style={{ width: "70px" }}>
          <img
            src={notification.user.profile_picture}
            alt=""
            height={"35px"}
            width={"35px"}
          />
        </div>
        <div className="w-1/7 h-10">
          <div className="flex-1 h-12" style={{ flexDirection: "column" }}>
            <p className="flex items-center">
              <span className="font-bold">
                {notification.user.first_name} {notification.user.last_name}{" "}
              </span>
              <span style={{marginLeft:5}}>{notification.event}{" "}</span>
                <>
                {
                  notification.action &&
                  <span className="text-blue-700 " style={{marginLeft:5}}>
                    {notification.action.title}{" "}
                  </span>
                  }
                  {notification.unread && (
                    <FaCircle className="text-red-500/80 ml-1" style={{width:8}}/>
                  )}
                </>
            </p>
            <div className="flex-1 h-12" style={{ opacity: "70%", fontSize: 13 }}>
              <p>{moment(notification.created_at).fromNow()}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 h-12"></div>
        <div className="w-1/7 h-12">
          {notification.message ? (
            <div className="bg-blue-100 px-4 py-3" style={{ borderRadius: 2 }}>
              <p style={{ fontSize: 13 }}>{notification.message}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default NormalNotificationCard;
