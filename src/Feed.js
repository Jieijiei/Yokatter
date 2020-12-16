import React, { useState, useEffect } from 'react';
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import db from './firebase';
import FlipMove from "react-flip-move";

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map((doc) => doc))
        ))
    }, []);
    const N = posts.length;

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            <TweetBox username={props.username} />

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
    );
}

export default Feed