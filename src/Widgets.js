import React, { useState, useEffect } from 'react';
import "./Widgets.css";
import Post from "./Post";
import "./Feed.css";
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import FlipMove from "react-flip-move";


  function Widgets() {
    var [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map((doc) => doc))
        ))
    }, []);
    
    posts.sort((a, b)=> {
        if (a.data().favboritecount < b.data().favoritecount) return 1;
        if (a.data().favoritecount > b.data().favoritecount) return -1;
        return 0;
    });
    // top5
    posts = posts.slice(0, 5)

    return (
        <div className="widgets">
            <div className="widget__input">
                <SearchIcon className="widgets__searchIcon" />
                <input placeholder="Search Twitter" type="text" />
            </div>

            <div className="widgets__widgetContainer">
            <h2>よかったねTOP5</h2>

            <FlipMove>
            {posts.map((post) => (
                <Post
                    id={post.id}
                    displayName={post.data().displayName}
                    username={post.data().username}
                    verified={post.data().verified}
                    text={post.data().text}
                    avatar={post.data().avatar}
                    image={post.data().image}
                    favoritecount={post.data().favoritecount}
                    time={post.data().time}
            />
            ))}
            </FlipMove>
           </div>
           <a className="widgets__gitbutton" href="https://github.com/Jieijiei/Twitter-clone" target="_blank">製作者のいえ</a>
        </div>
    );
}

export default Widgets;
