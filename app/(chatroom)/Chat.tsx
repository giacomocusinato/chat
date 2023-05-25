import { useEffect, useRef } from "react";
import type {
  MessagePayload,
  PresenceState,
  TrackPresenceParams,
} from "../(realtime)/useRealtimeChannel";
import Login from "./Login";
import classNames from "classnames";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

type ChatProps = {
  messages: MessagePayload[];
  presenceState: PresenceState;
  isPresenceTracked: boolean;
  trackPresence: (data: TrackPresenceParams) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
};

const ChatRoom: React.FC<ChatProps> = ({
  messages,
  presenceState,
  isPresenceTracked,
  trackPresence,
  sendMessage,
}) => {
  const requestTrackPresence = async (username: string) => {
    await trackPresence({ username, color: "red" });
  };

  return (
    <div className="flex h-[500px] w-[500px] flex-col rounded-[10px] border-3 border-black bg-white">
      <div className="flex h-[56px] w-full items-center gap-4 border-b-3 border-black px-4">
        <div className="box-content h-[15px] w-[15px] rounded-full border-3 border-black"></div>
        <div className="box-content h-[15px] w-[15px] rounded-full border-3 border-black"></div>
        <div className="box-content h-[15px] w-[15px] rounded-full border-3 border-black"></div>
        <div
          className={classNames([
            "relative ml-auto box-content h-[22.5px] w-[25px]",
            "before:content-[' '] before:absolute before:left-[14px] before:h-[22px] before:w-[3px] before:rotate-45 before:bg-black",
            "after:content-[' '] after:absolute after:left-[14px] after:h-[22px] after:w-[3px] after:-rotate-45 after:bg-black",
          ])}
        ></div>
      </div>

      {isPresenceTracked ? (
        <>
          <MessageList messages={messages} presenceState={presenceState} />
          <MessageInput sendMessage={sendMessage} />
        </>
      ) : (
        <Login requestLogin={requestTrackPresence}></Login>
      )}
    </div>
  );
};

export default ChatRoom;
