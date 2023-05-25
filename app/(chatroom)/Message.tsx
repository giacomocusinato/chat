import React from "react";

const Message: React.FC<{
  message: string;
  username: string;
  color: string;
}> = ({ message, username, color }) => {
  return (
    <div className="font-mono text-[12px]">
      <span className="font-bold" style={{ color }}>
        {username}{" "}
      </span>
      <span className=" text-gray-600">{message}</span>
    </div>
  );
};

export default React.memo(Message);
