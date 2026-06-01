import Draggable from "react-draggable";
import { useState } from "react";
import "./Log.css"

function Log({ messages = [] }){
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
                    <div id="logData">
                        {messages.map((m, i) => {
                            const isSystem = m.from === 'system';
                            const isAnon = m.from === 'anon';
                            const moodAt = typeof m.moodAt === 'number' ? m.moodAt : 50;
                            let customClass = '';

                            if (isSystem) customClass = 'system';
                            else if (!isAnon) customClass = 'user';

                            if (moodAt < 0) customClass += ' mood-low';
                            if (moodAt > 100) customClass += ' mood-high';

                            return (
                                <div key={m.ts + '-' + i} className={`message ${customClass.trim()}`}>
                                    <span className="from">{m.from}:</span>
                                    <span className="text">{m.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default Log