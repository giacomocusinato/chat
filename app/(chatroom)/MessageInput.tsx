import React from "react";

type MessageInputProps = {
  sendMessage: (message: string) => Promise<void>;
};

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const requestMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(e.currentTarget.message.value);
  };

  return (
    <form onSubmit={requestMessageSend}>
      <input name="message" type="text" className="border p-2" />
      <button className="border p-2">Send</button>
    </form>
  );
};

export default React.memo(MessageInput);
