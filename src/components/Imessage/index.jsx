import React from "react";
import Chat from "../Chat";
import Sidebar from "../Sidebar";
import style from "./styles.module.css";
export default function Imessage() {
  return (
    <div className={style.imessage}>
      {/*SIDEBAR*/}
      <Sidebar />

      {/*cHAT*(¡/)*/}
      <Chat />
    </div>
  );
}
