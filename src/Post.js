import React, { forwardRef } from 'react';
import "./Post.css";
import { Avatar, Button } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import db from './firebase';

const goodcount = (e, id, favoritecount) => {
    e.preventDefault();

    db.collection('posts').doc(id).update({ favoritecount: favoritecount += 1})
};

const Post = forwardRef(
    ({ id, displayName, username, verified, text, image, avatar, favoritecount }, ref) => {
    return (
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src="https://cdn.discordapp.com/attachments/646896760555307009/781112162151694346/Screen_Shot_2020-11-25_at_20.00.22.png"/>
        </div>
        <div className="post__body">
            <div className="post__header">
                <div className="post__headerText">
                    <h3>
                        {displayName}{" "}
                        <span className="post__headerSpecial">
                            {verified && <VerifiedUserIcon className="post__badge"></VerifiedUserIcon>}
                        </span>
                    </h3>
                </div>
                <div className="post__headerDescription">
                    <p>{text}</p>
                </div>
            </div>
            <img
                src={image}
                alt=""
            />
            <Button
                onClick={(e) => goodcount(e, id, favoritecount)}
                type="submit"
            >
                よかったね<FavoriteBorderIcon fontSize="small" />{favoritecount}
            </Button>
            </div>
        </div>
    );
});

export default Post;
