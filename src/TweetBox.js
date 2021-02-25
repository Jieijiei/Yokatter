import React, { useState, useEffect } from 'react';
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import db from './firebase';

function TweetBox(props) {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    var nowTime = new Date(); // 現在日時を得る
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => (
            setPosts(snapshot.docs.map((doc) => doc))
        ))
    }, []);

    const sendTweet = (e) => {
        e.preventDefault();

        if (tweetMessage.length !== 0) {
            db.collection("posts").add({
                displayName: props.username,
                username: 'cleverqazi',
                verified: true,
                text: tweetMessage,
                image: tweetImage,
                avatar:
                    props.avatar,
                favoritecount: 0,
                time: nowTime.getFullYear() + "/" + (nowTime.getMonth() + 1) + "/" + nowTime.getDate() + " " + nowTime.getHours() + ":" + nowTime.getMinutes() + "''" + nowTime.getSeconds()
            });
        }

        setTweetMessage("");
        setTweetImage("");
    };

    return (
    <div className="tweetbox">
        <form>
            <div className="tweetBox__input">
                <Avatar src={props.avatar}/>
                <input
                onChange={e => setTweetMessage(e.target.value)}
                value={tweetMessage}
                placeholder="あなたの良かった〜なことを教えて下さい"
                type="text"
                />
            </div>
            <input
                value={tweetImage}
                onChange={(e) => setTweetImage(e.target.value)}
                className="tweetBox__imageInput"
                placeholder="上げたい画像のURL"
                type="text"
            />

            <Button
                onClick={sendTweet}
                type="submit"
                className="tweetBox__tweetButton"
            >
                みんなに教える！
            </Button>
        </form>
    </div>
  );
}

export default TweetBox;