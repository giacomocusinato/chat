import React, { useEffect, useRef } from "react";
import { MessagePayload } from "../(realtime)/useRealtimeChannel";
import Message from "./Message";

type MessageListProps = {
  messages: MessagePayload[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [scrollRef, messages]);

  return (
    <ul
      ref={scrollRef}
      className="grow-1 h-full space-y-1 overflow-auto px-4 [&>*:first-child]:pt-3 [&>*:last-child]:pb-3"
    >
      {messages.map(({ message, user }, index) => (
        <li key={index}>
          <Message
            message={message}
            username={user.username}
            color={user.color}
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(MessageList);
