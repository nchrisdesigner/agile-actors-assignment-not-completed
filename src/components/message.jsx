import React from "react";

export const Message = ({text}) => (
  <div className="text-center">
    <h3 className="message-header">{text}</h3>
    <div className="message-body">
      {"We will reply to your message in next 24h. Have a nice day! ;-)"}
    </div>
  </div>
);
