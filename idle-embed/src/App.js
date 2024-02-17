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
    const [moodBox, setMoodBox] = useState(mood);
    const [hungerBox, setHungerBox] = useState(hunger);
    const [coinsBox, setCoinsBox] = useState(coins);
    //var petNameTag = document.getElementById('petName-tag');
    //var overlay = document.getElementById('overlay');
    //var underlay = document.getElementById('underlay');
    //var petInteract = document.getElementById('overlay-pet-interact');
    //var petTable = document.getElementById('petTable');


    //Master game loop
    var mainInterval = setInterval(() => {
        setHunger(hunger - 1);
        setHungerBox(hunger);
        setMood(mood - 1);
        setMoodBox(mood);
        setCoins(coins + 1/*mood / 600*/);
        setCoinsBox(coins); //Math.floor(coins)

        loop();

    }, 1000); //loop every 1000 ms

    //+++ Game Loop +++
    function loop() {
        //Hunger
        if (hunger <= 10) {
            //break;
            speak('death',"hey hey, what's up??");
            clearInterval(mainInterval);
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
        //speak(petName, "kill, kill");
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
