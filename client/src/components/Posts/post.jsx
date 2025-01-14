// import React from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useContext, useEffect ,useState } from "react";
import axios from "axios";
import {Users} from "../../dummyData"
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export default function Post({post}){

    const [like, setLike] = useState(post.likes.length);
    // const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
        
    },[currentUser._id,post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            const res =  await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
        
    },[post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", {userId: currentUser._id});
        } catch (error) {
            
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return (
    <div className="post">
        <div className="postWrapper">

            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePictrue ? PF + user.profilePictrue : PF + "person/noAvatar.png"} alt="" />
                    {/* <img className="postProfileImg" src={Users.filter((u) => u.id === post?.userId)[0].profilePicture} alt="" /> */}
                    </Link>
                    <span className="postUserName">{user.username}</span>
                    {/* <span className="postUserName">{Users.filter((u) => u.id === post?.userId)[0].username}</span> */}
                    {/* <span className="postDate">{post.date}</span> */}
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>

                <div className="postTopRight">
                    <MoreVertIcon/>
                </div>
            </div>

            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF + post.img} alt="" />

                {/* <img className="postImg" src={ PF + post.photo} alt="" /> */}

            </div>

            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                    <img className="likeIcon" src={`${PF}heart.png`} alt="" />

                    {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="assets/heart.png" alt="" /> */}

                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>

        </div>
    </div>
    )
}