import "./Friends.css"

import a from "../data/users/07.gif"
import b from "../data/users/08.gif"
import c from "../data/users/29.jpg"
import d from "../data/users/35.gif"
import e from "../data/users/75.gif"



function Friends(){

    const users = [a, b, c, d, e]
    const display = users.map((user, index) => (
        <img key={index} src={user} width={30} alt={`friend-${index + 1}`} />
    ));

    return(
        <div className="window">
            <div className="title-bar">
                    <div className="title-bar-text">FriendScape</div>
                    <div className="title-bar-controls">
                        <button aria-label="Help" />
                        <button aria-label="Close" />
                    </div>
            </div>
            <p>all of your friends!!</p>
            <div className="friendContainer">{display}</div>
        </div>
    );
}
export default Friends