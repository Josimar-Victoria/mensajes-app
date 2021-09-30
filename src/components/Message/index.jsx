import { Avatar } from "@material-ui/core";
import React from "react";
import style from "./styles.module.css";
export default function Message({
  id,
  contents: { timestamp, message, displayName, email, phone, uid },
}) {
  return (
    <div className={style.message}>
      <Avatar src={phone} />
      <p>{message}</p>
      <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
  );
}
