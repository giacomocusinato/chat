import React from "react";

type MessageInputProps = {
  sendMessage: (message: string) => Promise<void>;
};

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage }) => {
  const requestMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(e.currentTarget.message.value);
    e.currentTarget.message.value = "";
  };

  return (
    <form
      className="flex border-t-3 border-black"
      onSubmit={requestMessageSend}
    >
      <input
        name="message"
        type="text"
        placeholder="Type message..."
        className="grow-1 block w-full px-4 outline-none"
      />
      <button className="p-2">Send</button>
    </form>
  );
};

export default React.memo(MessageInput);
