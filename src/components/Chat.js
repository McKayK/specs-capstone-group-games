import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [show, setShow] = useState(false);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      console.log("hit chat");
      console.log(messageData);
      setMessageList((preValue) => [...preValue, messageData]);
      setCurrentMessage("");
    }
  };

  const changeShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((preValue) => [...preValue, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((elem) => {
              return (
                <div
                  key={elem}
                  className="message"
                  id={username === elem.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{elem.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{elem.time}</p>
                      <p id="author">{elem.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Message"
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyPress={(event) => event.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
