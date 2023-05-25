import { useEffect, useRef } from "react";
import type {
  MessagePayload,
  PresenceState,
  TrackPresenceParams,
} from "../(realtime)/useRealtimeChannel";
import Login from "./Login";
import Message from "./Message";

type UsersProps = {
  presenceState: PresenceState;
};

const ChatRoom: React.FC<UsersProps> = ({ presenceState }) => {
  const userList = Object.values(presenceState).map((presence) => {
    return presence[0] ?? {};
  });

  return (
    <div>
      <h2 className="font-semibold uppercase">
        {userList.length} User{userList.length === 1 ? "" : "s"} online
      </h2>
      <ul className="mt-2">
        {userList.map(({ username, color }, index) => (
          <li key={index} style={{ color }} className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
            {username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoom;
