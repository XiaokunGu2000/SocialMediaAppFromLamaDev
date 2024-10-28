// import React from "react";
import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../Online/online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({ user }){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext);
    
    const[followed, setFollowed] = useState(currentUser.followings.includes(user?.id));



    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriends();
    },[user]);

    const handleClick = async () => {
        try {
            if(followed){
                await axios.put("/users/" + user._id+ "/unfollow",{userId:currentUser._id});
                dispatch({type:"UNFOLLOW", payload:user._id});
            }
            else{
                await axios.put("/users/" + user._id+ "/follow",{userId:currentUser._id});
                dispatch({type:"FOLLOW", payload:user._id});
            }
        } catch (error) {
            console.log(error);
        }
        setFollowed(!followed);
    }

    const HomeRightbar = () => {
        return (
            <>

                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText"> 
                        <b>Pola Foster</b> and <b>3 other friends</b> had a birthday today 
                    </span>
                </div>
            
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=>(
                        <Online key = {u._id} user = {u}/>
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () =>{
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <RemoveIcon/> : <AddIcon/>}
                </button>
            )}
                <h4 className="rightbarTitle">UserInformation</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="righbarInfoKey">City:</span>
                        <span className="righbarInfoValue">{user.city}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="righbarInfoKey">From:</span>
                        <span className="righbarInfoValue">{user.from}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="righbarInfoKey">Relationship:</span>
                        <span className="righbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>

                </div>

                <h4 className="rightbarTitle">User Friends</h4>

                <div className="rightbarFollowings">
                    {friends.map( (friend) => (
                        <Link to = {"/profile/" + friend.username} style={{textDecoration: "none"}}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePictrue ? PF + friend.profilePictrue : PF + "person/noAvatar.png"} alt="" className="rightbarfollowingImg" />
                                {/* <img src="assets/person/1.jpeg" alt="" className="rightbarfollowingImg" /> */}
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                    

                    
                </div>
            </>
        )
    }

    return (
    <div className="rightbar">
        <div className="rightbarWrapper">
            
            {user ? <ProfileRightbar/> : <HomeRightbar/>}

        </div>
    </div>
    )
}