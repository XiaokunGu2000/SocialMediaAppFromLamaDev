// import React from "react";
import "./closefriend.css"

export default function Closefriend({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={PF + user.profilePictrue} alt="" />
        {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" /> */}
        <span className="sidebarFriendName">{user.username}</span>
    </li>
    )
}