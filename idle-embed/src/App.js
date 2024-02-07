import { useRef, useState } from "react";
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
    //var partySound = new Audio('audio/song.mp3');
    //var washSound = new Audio('audio/shower.mp3');
    //var talkSound = new Audio('audio/hello.mp3');

    //var stepSize = 15;
    //var speakTimer = -1;

    //Owner configured variables
    var petName = 'jj';//getParameterByName('name');
    document.title = petName;


    const [mood, setMood] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [coins, setCoins] = useState(10);
    const [talk, setTalk] = useState("successfully logged in, " + petName + " Welcome!");
    const talkBottom = useRef(null);

    //DOM elements
    //var pet = document.getElementById('pet');
    //var map = document.getElementById('map');
    //var talkBox = document.getElementById('talk');
    //var petNameBox = document.getElementById('petName');
    const [moodBox, setMoodBox] = useState(50);
    const [hungerBox, setHungerBox] = useState(50);
    const [coinsBox, setCoinsBox] = useState(10);
    //var petNameTag = document.getElementById('petName-tag');
    //var overlay = document.getElementById('overlay');
    //var underlay = document.getElementById('underlay');
    //var petInteract = document.getElementById('overlay-pet-interact');
    //var petTable = document.getElementById('petTable');


    //Master game loop
    var mainInterval = setInterval(function () {
        loop();
    }, 1000);

    //+++ Game Loop +++
    function loop() {
        //Hunger
        setHunger(hunger - 0.3);
        if (hunger <= 10) {
            //break;
            speak('death',"hey hey, what's up??");
        }
        setHungerBox(Math.floor(hunger));

        //Mood
        setMood(mood - 0.3);
        if (mood <= 10) {
            speak('death','game over, man.');
        }
        setMoodBox(Math.floor(mood));

        //Coins
        setCoins(coins + mood / 600);
        setCoinsBox(Math.floor(coins));

        //Function calls
        //teMain();
        //speakAnimator();
        //rainFall();
        //movePet();
        //petTalk();
        //autoEat();
        speak(petName, "kill, kill");
    }


   /* function chat() {
        //overlay.visibility = 
    }*/


    function speak(from, message) {
        if (from === petName) {
            //speakTimer = 0;
            //pet.classList.add('jump');
        }
    
        setTalk(talk + '\n' + from + ': ' + message)
        talkBottom.current.scrollIntoView({behavior: "instant", block: "nearest"});
        //talkBox.value = talk;
        //if (talkBox?.scrollTop)
        //    talkBox.scrollTop = talkBox.scrollHeight;
    }

  return (
    <div className="App">
        <div className='window' style={{width: 300+'px'}}>
                <div className="title-bar" style={{width: 297+'px'}}>
                    <div className="title-bar-text">Name: <b id="petName">{petName}</b></div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" />
                    </div>
                </div>
            <table id="petTable" className="interactive">
                <thead>
                    <tr>
                        <td>Mood: <b id="mood">{moodBox}</b></td>
                        <td>Hunger: <b id="hunger">{hungerBox}</b></td>
                        <td>Coins: <b id="coins">{coinsBox}</b></td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="window-body">
                        <td colspan="2">
                            <div id="map">
                                <Three />
                                {/*<div id="underlay"></div>*/}
                                <div id="pet" class="pet">
                                    <div id="petName-tag"></div>
                                </div>
                            </div>
                            <div id="overlay"></div>
                            <div onclick="pettPet();" id="overlay-pet-interact"></div>
                        </td>

                        <td class="controls">
                            <b>Programs: </b>
                            <img class="shopitem" src={cart} onclick="feedPet(0);" alt="." />
                            <img class="shopitem" src={gift} onclick="feedPet(0);" alt="." />
                            <img class="shopitem" src={heart} onclick="chat();" alt="." />
                            <br />
                            <img class="shopitem" src={house} onclick="feedPet(2);" alt="." />
                            <img class="shopitem" src={lightning} onclick="feedPet(1);" alt="." />
                            <img class="shopitem" src={world} onclick="feedPet(1);" alt="." />
                            <b>Actions:</b>
                            <button /*onClick={() => talkToPet()}*/>Hello</button><br></br>
                            <button /*onClick={() => showerPet()}*/>Kill Time</button><br></br>
                            <button disabled /*onClick={() => petParty()}*/>Goodbye</button><br></br>
                        </td>
                    </tr>
                </tbody>
                <tr>
                    <td colSpan="3">
                        <textarea id="talk" disabled="true" value={talk}
                            onChange={e => setTalk(e.target.value)} ref={talkBottom}
                        />
                    </td>
                </tr>
            </table>
        </div>
        <label>test by butteredroll</label>
    </div>
  );
}

export default App;
