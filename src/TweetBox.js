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
    var N = 9999999;
    N -= posts.length;

    const sendTweet = (e) => {
        e.preventDefault();

        db.collection("posts").doc((N).toString()).set({
            displayName: props.username,
            username: 'cleverqazi',
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar:
                "https://cdn.discordapp.com/attachments/646896760555307009/781112162151694346/Screen_Shot_2020-11-25_at_20.00.22.png",
            favoritecount: 0,
            time: nowTime.getFullYear() + "/" + nowTime.getMonth() + "/" + nowTime.getDate() + " " + nowTime.getHours() + ":" + nowTime.getMinutes() + "'" + nowTime.getSeconds()
        });

        setTweetMessage("");
        setTweetImage("");
    };

    return (
    <div className="tweetbox">
        <form>
            <div className="tweetBox__input">
                <Avatar src="https://cdn.discordapp.com/attachments/646896760555307009/781112162151694346/Screen_Shot_2020-11-25_at_20.00.22.png"/>
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