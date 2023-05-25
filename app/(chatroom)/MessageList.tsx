import React, { useEffect, useRef } from "react";
import {
  MessagePayload,
  PresenceState,
} from "../(realtime)/useRealtimeChannel";
import Message from "./Message";

type MessageListProps = {
  messages: MessagePayload[];
  presenceState: PresenceState;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  presenceState,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [scrollRef, messages]);

  return (
    <div ref={scrollRef} className="fx-g-1 h-full overflow-auto bg-red-200">
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
  );
};

export default React.memo(MessageList);
