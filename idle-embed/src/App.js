import { useState } from "react";
import './App.css';
import Three from './Three';

function App() {
    //Load sounds
    //var eatSound = new Audio('audio/ommnom.mp3');
    //var partySound = new Audio('audio/song.mp3');
    //var washSound = new Audio('audio/shower.mp3');
    //var talkSound = new Audio('audio/hello.mp3');

    var stepSize = 15;

    //Owner configured variables
    var petName = 'jj';//getParameterByName('name');


    const [mood, setMood] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [coins, setCoins] = useState(10);
    const [talk, setTalk] = useState("Hello, I'm " + petName + " and you're awesome!");

    //DOM elements
    var pet = document.getElementById('pet');
    var map = document.getElementById('map');
    var talkBox = document.getElementById('talk');
    var petNameBox = document.getElementById('petName');
    const [moodBox, setMoodBox] = useState(50);
    const [hungerBox, setHungerBox] = useState(50);
    const [coinsBox, setCoinsBox] = useState(10);
    //var petNameTag = document.getElementById('petName-tag');
    var overlay = document.getElementById('overlay');
    var underlay = document.getElementById('underlay');
    var petInteract = document.getElementById('overlay-pet-interact');
    var petTable = document.getElementById('petTable');


        //Master game loop
    var mainInterval = setInterval(function () {
        loop();
    }, 1000);


    //General render settings
    //pet.style.backgroundImage = "url('" + petImage + "')";
    //map.style.backgroundImage = "url('" + mapImage + "')";
    //petNameTag.innerHTML = petName;
    //petNameBox.innerHTML = petName + genderRender;
    //document.body.style.backgroundImage = "url('" + bodyImage + "')";
    //document.body.style.color = textColor;
    document.title = petName;

        //+++ Game Loop +++
    function loop() {
        //Hunger
        setHunger(hunger - 0.3);
        if (hunger <= 10) {
            //break;
            //speak('death','game over, man.');
        }
        if (hunger > 100) {
            setHunger(100);
        }

        /*setHungerBox(<div></div>);
        for (var i = 0; i < hunger / 10 / 2; i++) {
            setHungerBox(<img class="uiicon" src="https://wiki.mabi.world/images/8/82/Fried_Chicken_Wing.png"/>);
        }*/

        setHungerBox(Math.floor(hunger));

        //Mood
        setMood(mood - 0.3);
        if (mood <= 10) {
            //speak('death','game over, man.');
        }
        if (mood > 100) {
            setMood(100);
        }
        /*var moodHearts = '';
        for (var j = 0; j < mood / 10 / 2; j++) {
            moodHearts += '<img class="uiicon" src="https://bestanimations.com/Signs&Shapes/Hearts/animatedloveheart-18.gif"/>';
        }*/
        //setMoodBox(moodHearts);
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
        //speak(petName, "kill, kill");
    }



    var speakTimer = -1;

     function speak(from, message) {
        if (from === petName) {
            speakTimer = 0;
            //pet.classList.add('jump');
        }
    
        setTalk(talk + '\n' + from + ': ' + message)
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
                                <div id="underlay"></div>
                                <div id="pet" class="pet">
                                    <div id="petName-tag"></div>
                                </div>
                            </div>
                            <div id="overlay"></div>
                            <div onclick="pettPet();" id="overlay-pet-interact"></div>
                        </td>

                        <td class="controls">
                            <b>Shop: (5c)</b>
                            <img class="shopitem" src="ui/burger.png" onclick="feedPet(0);" alt="." />
                            <img class="shopitem" src="ui/meat.png" onclick="feedPet(0);" alt="." />
                            <img class="shopitem" src="ui/coke.png" onclick="feedPet(3);" alt="." />
                            <br />
                            <img class="shopitem" src="ui/bread.png" onclick="feedPet(2);" alt="." />
                            <img class="shopitem" src="ui/muffin.png" onclick="feedPet(1);" alt="." />
                            <img class="shopitem" src="ui/icecream.png" onclick="feedPet(1);" alt="." />
                            <b>Actions:</b>
                            <button /*onClick={() => talkToPet()}*/>Hello</button><br></br>
                            <button /*onClick={() => showerPet()}*/>Wash 10c</button><br></br>
                            <button /*onClick={() => petParty()}*/>Party 20c</button><br></br>
                        </td>
                    </tr>
                </tbody>
                <tr>
                    <td colSpan="3">
                        <textarea id="talk" disabled="true" value={talk}></textarea>
                    </td>
                </tr>
            </table>
        </div>
        <label>test by jason hankins</label>
    </div>
  );
}

export default App;
