import Draggable from "react-draggable";
import "./Log.css"

function Log(){

    function close(){
        //this.state.render = false
    }

    return(
        <Draggable>
            <div id="log">
                <div className="window">
                    <div className="title-bar">
                        <div className="title-bar-text">Log</div>
                        <div className="title-bar-controls">
                            <button aria-label="Help" />
                            <button aria-label="Close" onClick={close()}/>
                        </div>
                    </div>
                    <div id="logData">todo import log wtf this shit hard</div>
                    <textarea id="logArea" disabled={true} value={"hi"}
                        scrollHeight = "0"
                    />
                </div>
            </div>
        </Draggable>
    );
}

export default Log