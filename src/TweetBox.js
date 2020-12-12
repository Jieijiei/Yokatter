import React, { useState } from 'react';
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import db from './firebase';

function TweetBox(props) {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");

    const sendTweet = (e) => {
        e.preventDefault();

        db.collection("posts").add({
            displayName: props.username,
            username: 'cleverqazi',
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar:
                "https://cdn.discordapp.com/attachments/646896760555307009/781112162151694346/Screen_Shot_2020-11-25_at_20.00.22.png",
            favoritecount: 0
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