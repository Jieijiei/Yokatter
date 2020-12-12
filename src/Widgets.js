import React from 'react';
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
    return (
        <div className="widgets">
            <div className="widgets__input">
                <input type="text" />
            </div>
            <a className="widgets__gitbutton" href="https://github.com/Jieijiei/Twitter-clone" target="_blank">製作者のいえ</a>
        </div>
    );
}

export default Widgets;
