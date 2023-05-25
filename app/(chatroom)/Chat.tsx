import { useEffect, useRef } from "react";
import type {
  MessagePayload,
  PresenceState,
  TrackPresenceParams,
} from "../(realtime)/useRealtimeChannel";
import Login from "./Login";
import Message from "./Message";

type ChatProps = {
  messages: MessagePayload[];
  presenceState: PresenceState;
  trackPresence: (data: TrackPresenceParams) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
};

const ChatRoom: React.FC<ChatProps> = ({
  messages,
  presenceState,
  trackPresence,
  sendMessage,
}) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) {
      return;
    }

    chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
  }, [chatRef, messages]);

  const requestTrackPresence = async (username: string) => {
    await trackPresence({ username, color: "red" });
  };

  const requestMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(e.currentTarget.message.value);
  };

  return (
    <div className="flex flex-col gap-10">
      <Login requestLogin={requestTrackPresence}></Login>

      <div ref={chatRef} className="w-[400px] h-[400px] bg-white overflow-auto">
        {messages.map(({ message, userId }, index) => {
          const presence = presenceState[userId][0];
          return (
            <Message
              key={index}
              message={message}
              username={presence.username}
              color={presence.color}
            />
          );
        })}
      </div>

      <form onSubmit={requestMessageSend}>
        <input name="message" type="text" className="border p-2" />
        <button className="border p-2">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
