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
};

const notification: Notification = {
  id: "clpomy9970005a8or7calnm1h",
  user: {
    id: 5,
    first_name: "Kimberly",
    last_name: "Smith",
    profile_picture: "https://api.multiavatar.com/5.svg",
  },
  event: "has joined your group",
  action: {
    title: "Football Club",
    url: "#",
  },
  message: null,
  media: null,
  created_at: "2023-11-28T04:09:02.491400",
};

export default function Home() {
  return (
    <main>
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "60%",
        marginTop: "5%",
        marginLeft: "20%",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h1>Notifications [unread messages]</h1>
        <button style={{backgroundColor:'black',color:'white'}}>Mark all as read</button>
      </div>
      <div className="notifications" style={{ border: "1px solid black" }}>
        <div
          className="notification_card"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="profile_picture">
            <img
              src={notification.user.profile_picture}
              alt=""
              height={50}
              width={50}
            />
          </div>
          <div className="first_name">{notification.user.first_name}</div>
          <div className="last_name">{notification.user.last_name}</div>
          <div className="notification_event">{notification.event}</div>
          <div className="notification_title">{notification.action?.title}</div>
        </div>
      </div>
      <div className="notifications" style={{ border: "1px solid black" }}>
        <div
          className="notification_card"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="profile_picture">
            <img
              src={notification.user.profile_picture}
              alt=""
              height={50}
              width={50}
            />
          </div>
          <div className="first_name">{notification.user.first_name}</div>
          <div className="last_name">{notification.user.last_name}</div>
          <div className="notification_event">{notification.event}</div>
          <div className="notification_title">{notification.action?.title}</div>
        </div>
      </div>
      <div className="notifications" style={{ border: "1px solid black" }}>
        <div
          className="notification_card"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="profile_picture">
            <img
              src={notification.user.profile_picture}
              alt=""
              height={50}
              width={50}
            />
          </div>
          <div className="first_name">{notification.user.first_name}</div>
          <div className="last_name">{notification.user.last_name}</div>
          <div className="notification_event">{notification.event}</div>
          <div className="notification_title">{notification.action?.title}</div>
        </div>
      </div>
      <div className="notifications" style={{ border: "1px solid black" }}>
        <div
          className="notification_card"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="profile_picture">
            <img
              src={notification.user.profile_picture}
              alt=""
              height={50}
              width={50}
            />
          </div>
          <div className="first_name">{notification.user.first_name}</div>
          <div className="last_name">{notification.user.last_name}</div>
          <div className="notification_event">{notification.event}</div>
          <div className="notification_title">{notification.action?.title}</div>
        </div>
      </div>
    </div>
    </main>
  )
}
