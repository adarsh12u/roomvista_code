import { Link } from "react-router-dom";
import "./card.scss";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { Socket } from "socket.io-client";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};
function Card({ item }) {
  const [chatID , setChatId] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{
    
    setOpen(true)
    handleOpenChat(item?.userId);
  };
  const handleClose = () => setOpen(false);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.post("/chats/" ,{receiverId: id});
      // if (!res.data.seenBy.includes(currentUser.id)) {
      //   decrease();
      // }
      setChatId(res?.data?.id);
      console.log("response",res)
      // setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chatID, { text });
      // setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      // Socket.emit("sendMessage", {
      //   receiverId: item?.userId,
      //   data: res.data,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              {/* <img src="/save.png" alt="" /> */}
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" onClick={handleOpen} />
            </div>
          </div>
        </div>
      </div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <textarea
        name="text"
        placeholder="Type your message..."
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',
          fontSize: '14px',
        }}
      />
      <button
        type="submit"
        style={{
          alignSelf: 'flex-end',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </form>
  </Box>
</Modal>
    </div>
  );
}

export default Card;
