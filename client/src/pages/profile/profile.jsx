// import React from "react";
// import Home from "../home/home"

import Topbar from "../../components/Topbar/topbar"
import Sidebar from "../../components/Sidebar/sidebar"
import Feed from "../../components/Feed/feed"
import Rightbar from "../../components/Rightbar/rightbar"

import "./profile.css"
import { useState, useEffect } from "react"
import axios from "axios"
import {useParams} from "react-router"



export default function Profile(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;


    useEffect(() => {
        const fetchUser = async () => {
            const res =  await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
        
    },[username]);

    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                
                <div className="profileRightTop">

                    <div className="profileCover">
                        <img className="profileCoverImg" src={user.coverPictrue ? PF + user.coverPictrue : PF + "person/noCover.png"} alt="" />
                        <img className="profileUserImg" src={user.profilePictrue ? PF + user.profilePictrue : PF + "person/noAvatar.png"} alt="" />

                        {/* <img className="profileCoverImg" src={`${PF}post/3.jpeg`} alt="" />
                        <img className="profileUserImg" src={`${PF}person/7.jpeg`} alt="" /> */}

                        {/* <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
                        <img className="profileUserImg" src="assets/person/7.jpeg" alt="" /> */}

                        {/* <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
                        <img className="profileUserImg" src="assets/person/7.jpeg" alt="" /> */}

                    </div>

                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>

                        {/* <h4 className="profileInfoName">Safak Kocaoglu</h4>
                        <span className="profileInfoDesc">Hello, my friend</span> */}
                    </div>

                </div>

                <div className="profileRightBottom">
                    <Feed username = {username}/>
                    {/* <Feed /> */}
                    <Rightbar user = {user}/>
                </div>
                
            </div>
        </div>

    </>
    )
}