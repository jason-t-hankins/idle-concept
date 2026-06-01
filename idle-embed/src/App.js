import { useCallback, useEffect, useRef, useState } from "react";
import './App.css';
import Three from './Three';
import cart from './data/cart.png';
import gift from './data/gift.png';
import heart from './data/heart.png';
import house from './data/house.png';
import lightning from './data/lightning.png';
import world from './data/world.png';
import Friends from "./Components/Friends";

const CHATTER = [
    "hey cutie", 
    "WTFFF LOL", 
    "r u realll", 
    "ur pussy, er describe it", 
    "TROLLLLLL", 
    "I will kill you", 
    "is this google search okay show me big bobs woman",
    "is this a simulation?",
    "#depression",
    "#derpression",
];

function App() {
    const petName = 'jj';
    const [chatWindow, setChatWindow] = useState("hidden");


    const [mood, setMood] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [coins, setCoins] = useState(10);
    const [talk, setTalk] = useState("successfully logged in, " + petName + " Welcome!");
    const talkBoxRef = useRef(null);
    const hungerWarningShown = useRef(false);
    const moodWarningShown = useRef(false);

    useEffect(() => {
        document.title = petName;
    }, [petName]);

    const appendTalk = useCallback((from, message) => {
        setTalk((prev) => `${prev}\n${from}: ${message}`);
    }, []);


    //+++ Game Loop +++
    useEffect(() => {
        const loop = setInterval(() => {
            setHunger(h => h - 1);
            setMood(m => m - 1);
            setCoins(c => c + 1);
            appendTalk("anon", CHATTER[Math.floor(Math.random() * CHATTER.length)]);
        }, 3000);
        return () => {
            clearInterval(loop);
        };
    }, [appendTalk]);

    useEffect(() => {
        if (hunger <= 10 && !hungerWarningShown.current) {
            appendTalk("system", "energy low... maybe take a break.");
            hungerWarningShown.current = true;
        }

        if (hunger > 10) {
            hungerWarningShown.current = false;
        }
    }, [appendTalk, hunger]);

    useEffect(() => {
        if (mood <= 10 && !moodWarningShown.current) {
            appendTalk("system", "doomscrolling spiral detected.");
            moodWarningShown.current = true;
        }

        if (mood > 10) {
            moodWarningShown.current = false;
        }
    }, [appendTalk, mood]);

    useEffect(() => {
        if (talkBoxRef.current) {
            talkBoxRef.current.scrollTop = talkBoxRef.current.scrollHeight;
        }
    }, [talk]);


   function chat() {
        setChatWindow("visible");
    }

    function hello() {
        setMood(m => m + 5);
        appendTalk(petName, "Hello lovers!!!");
    }

    function eat() {
        if (coins < 5) {
            appendTalk("system", "not enough coins to kill time.");
            return;
        }

        setHunger(h => h + 5);
        setCoins(c => c - 5);
        appendTalk(petName, "sandwich time brb ily");
    }

  return (
    <div className="App">
        <div className='window' style={{width: 300+'px'}}>
                <div className="title-bar" style={{width: 297+'px'}}>
                    <div className="title-bar-text">Welcome to Space, <b id="petName">{petName}</b></div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" />
                    </div>
                </div>
            <table id="petTable" className="interactive">
                <thead>
                    <tr>
                        <td>Mood: <b id="mood">{mood}</b></td>
                        <td>Hunger: <b id="hunger">{hunger}</b></td>
                        <td>Coins: <b id="coins">{coins}</b></td>
                    </tr>
                </thead>
                <tbody className="window-body">
                    <tr style={{zIndex: -1}}>
                        <td colSpan="2">
                            <div id="map">
                                <Three />
                                {/*<div id="underlay"></div>*/}
                                {/*<div id="pet" className="pet">
                                    <div id="petName-tag"></div>
                                </div>*/}
                            </div>
                            <div id="overlay" style={{visibility: chatWindow}}>
                                <Friends />
                            </div>
                            {/*<div onClick={pettPet()} id="overlay-pet-interact"></div>*/}
                        </td>

                        <td className="controls" colSpan="1">
                            <b>Programs: </b>
                            <img className="shopitem" src={cart} /*onClick="feedPet(0);"*/ alt="." />
                            <img className="shopitem" src={gift} /*onClick="feedPet(0);"*/ alt="." />
                            <img className="shopitem" onClick={() => chat()} src={heart} alt="chat with friends!" />
                            <br />
                            <img className="shopitem" src={house} /*onClick="feedPet(2);"*/ alt="." />
                            <img className="shopitem" src={lightning} /*onClick="feedPet(1);"*/ alt="." />
                            <img className="shopitem" src={world} /*onClick="feedPet(1);"*/ alt="." />
                            <b>Actions:</b>
                            <button onClick={() => hello()}>Hello</button><br></br>
                            <button onClick={() => eat()}>Kill Time</button><br></br>
                            <button disabled /*onClick={() => party()}*/>Goodbye</button><br></br>
                        </td>
                    </tr>
                </tbody>
                <tfoot /*style={{height: 100+'px'}}*/>
                    <tr>
                        <td colSpan="3">
                            <textarea id="talk" disabled={true} value={talk} ref={talkBoxRef} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <label>test by butteredroll</label>
    </div>
  );
}

export default App;
