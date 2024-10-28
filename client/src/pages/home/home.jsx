// import React from "react";
import Topbar from "../../components/Topbar/topbar"
import Sidebar from "../../components/Sidebar/sidebar"
import Feed from "../../components/Feed/feed"
import Rightbar from "../../components/Rightbar/rightbar"
import "./home.css"



export default function Home(){
    return (

    <>
        <Topbar/>
        <div className="homeContainer">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
        </div>

    </>

    )
}