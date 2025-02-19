// import React from "react";

import "./topbar.css"

import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Topbar(){

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className = "topbarContainer">
            <div className="topbarLeft">
                <Link to = "/" style={{textDecoration: "none"}}>
                    <span className="logo">Lama social</span>
                </Link>
            </div>

            <div className="topbarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="Search for friends, post or video" className="searchInput" />
                </div>
            </div>

            <div className="topbarRight">
                
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">TimeLine</span>
                </div>

                <div className="topbarIcons">

                    <div className="topbarIconItem">
                        <PersonIcon/>
                        <span className="topbarIconBedge">1</span>
                    </div>

                    <div className="topbarIconItem">
                        <ChatIcon/>
                        <span className="topbarIconBedge">1</span>
                    </div>

                    <div className="topbarIconItem">
                        <NotificationsIcon/>
                        <span className="topbarIconBedge">1</span>
                    </div>

                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePictrue ? PF + user.profilePictrue : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}