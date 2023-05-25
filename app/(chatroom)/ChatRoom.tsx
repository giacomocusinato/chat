import useRealtimeChannel from "../(realtime)/useRealtimeChannel";
import Chat from "./Chat";
import Users from "./Users";

export default function ChatRoom() {
  const { presenceState, messages, trackPresence, sendMessage } =
    useRealtimeChannel("general");

  return (
    <div className="flex gap-20">
      <Users presenceState={presenceState} />
      <Chat
        presenceState={presenceState}
        messages={messages}
        sendMessage={sendMessage}
        trackPresence={trackPresence}
      ></Chat>
    </div>
  );
}
