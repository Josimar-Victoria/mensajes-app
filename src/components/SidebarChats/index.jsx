import { Avatar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../features/chatSlice";
import style from "./styles.module.css";
export default function SidebarChats({ id, chatName }) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className={style.sidebarChats}
    >
      <Avatar />
      <div className={style.sidebarChats__info}>
        <h4>{chatName}</h4>
        <p>Last message sent...</p>
        <small>timestamp: 2015</small>
      </div>
    </div>
  );
}
