import React from "react";

const Message: React.FC<{
  message: string;
  username: string;
  color: string;
}> = ({ message, username, color }) => {
  return (
    <div>
      <span className="font-bold" style={{ color }}>
        {username}
      </span>
      {message}
    </div>
  );
};

export default React.memo(Message);
