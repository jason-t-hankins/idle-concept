import Draggable from "react-draggable";
import { useState } from "react";
import "./Log.css"

function Log(){
    const [isOpen, setIsOpen] = useState(true);

    function close(){
        setIsOpen(false);
    }

    if (!isOpen) {
        return null;
    }

    return(
        <Draggable>
            <div id="log">
                <div className="window">
                    <div className="title-bar">
                        <div className="title-bar-text">Log</div>
                        <div className="title-bar-controls">
                            <button aria-label="Help" />
                            <button aria-label="Close" onClick={close} />
                        </div>
                    </div>
                    <div id="logData">todo import log wtf this shit hard</div>
                    <textarea id="logArea" disabled={true} value={"hi"} readOnly />
                </div>
            </div>
        </Draggable>
    );
}

export default Log