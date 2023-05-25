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
  return (
    <div>
      <h2 className="text-2xl">Users</h2>
    </div>
  );
};

export default ChatRoom;
