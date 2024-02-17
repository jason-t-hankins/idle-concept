import { useEffect, useRef, useState } from "react";
import './App.css';
import Three from './Three';
import cart from './data/cart.png';
import gift from './data/gift.png';
import heart from './data/heart.png';
import house from './data/house.png';
import lightning from './data/lightning.png';
import world from './data/world.png';

//idle friend sim
//friends over the world
//getting depressed kms


function App() {
    //Load sounds
    //var eatSound = new Audio('audio/ommnom.mp3');
    
    var petName = 'jj';//getParameterByName('name');
    document.title = petName;
    var chatWindow = "hidden";


    const [mood, setMood] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [coins, setCoins] = useState(10);
    const [talk, setTalk] = useState("successfully logged in, " + petName + " Welcome!");
    const chatter = ["hey cutie", "WTFFF LOL", "r u realll", "ur pussy, er describe it", "TROLLLLLL", "I will kill you", "is this google search okay show me big boobs woman"]
    const talkBottom = useRef(null);

    //DOM elements
    //var pet = document.getElementById('pet');
    //var map = document.getElementById('map');
    var talkBox = document.getElementById('talk');
    //var petNameBox = document.getElementById('petName');
    //const [moodBox, setMoodBox] = useState(mood);
    //const [hungerBox, setHungerBox] = useState(hunger);
    //const [coinsBox, setCoinsBox] = useState(coins);
    //var petNameTag = document.getElementById('petName-tag');
    //var overlay = document.getElementById('overlay');
    //var underlay = document.getElementById('underlay');
    //var petInteract = document.getElementById('overlay-pet-interact');
    //var petTable = document.getElementById('petTable');


    //+++ Game Loop +++
    useEffect(() => {
        const loop = setInterval(() => {

            setHunger(h => h - 1);
            setMood(m => m - 1);
            setCoins(c => c + 1/*mood / 600*/);

            //Hunger
            if (hunger <= 10) {
                //break;
                speak('death',"hey hey, what's up??");
            }
            //Mood
            if (mood <= 10) {
                speak('death','game over, man.');
            }
            //Coins

            //Function calls
            //teMain();
            //speakAnimator();
            //rainFall();
            //movePet();
            //petTalk();
            //autoEat();
            speak("anon", chatter[Math.floor(Math.random() * (chatter.length - 1))]);
        }, 3000);
        return () => {clearInterval(loop);}
    });


   function chat() {
        chatWindow = "visible";
        //console.log("open chat window todo");
    }

    function hello() {
        setMood(m => m + 5);
        speak(petName, "Hello Lovers!!!");
    }

    function eat() {
        setHunger(h => h + 5);
        setCoins(c => c - 5);
        speak(petName, "sanwich time brb ily");
    }


    function speak(from, message) {
        if (from === petName) {
            //speakTimer = 0;
            //pet.classList.add('jump');
        }
    
        setTalk(talk + '\n' + from + ': ' + message)
        //talkBottom.current.scrollIntoView({behavior: "instant", block: "nearest"});
        //talkBox.value = talk;
        if (talkBox?.scrollHeight)
            talkBox.scrollTop = talkBox.scrollHeight;
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
                <tbody>
                    <tr className="window-body">
                        <td colSpan="2">
                            <div id="map">
                                <Three />
                                {/*<div id="underlay"></div>*/}
                                <div id="pet" className="pet">
                                    <div id="petName-tag"></div>
                                </div>
                            </div>
                            <div id="overlay" style={{visibility: chatWindow}}></div>
                            <div /*onClick={pettPet()}*/ id="overlay-pet-interact"></div>
                        </td>

                        <td className="controls">
                            <b>Programs: </b>
                            <img className="shopitem" src={cart} /*onClick="feedPet(0);"*/ alt="." />
                            <img className="shopitem" src={gift} /*onClick="feedPet(0);"*/ alt="." />
                            <img className="shopitem" src={heart} onClick={chat()} alt="chat with friends!" />
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
                            <textarea id="talk" disabled={true} value={talk}
                                onChange={e => setTalk(e.target.value)} ref={talkBottom}
                                scrollHeight = "0"
                            />
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
