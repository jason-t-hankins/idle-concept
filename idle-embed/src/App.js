import './App.css';

function App() {
    //Load sounds
    /*var eatSound = new Audio('audio/ommnom.mp3');
    var partySound = new Audio('audio/song.mp3');
    var washSound = new Audio('audio/shower.mp3');
    var talkSound = new Audio('audio/hello.mp3');
    var errorSound = new Audio('audio/ohno.mp3');
    var slotSoundClick = new Audio('slots/click.mp3');
    var slotSoundPull = new Audio('slots/lever.mp3');
    var slotSoundWin = new Audio('slots/win.mp3');
    var slotSoundLoose = new Audio('slots/loose.mp3');*/

        //+++ General Vars +++

    //Gets URL parameters
    /*function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }*/

    //Settings
    //var stepSize = 15;


    //System variables
    //var petX = 50;
    //var petY = 50;
    //var talk = '';
    var mood = 50;
    var belly = 50;
    var coins = 10;
    //var movment = true;

    //Owner configured variables
    //var date = 10000;//new Date(getParameterByName('dob') * 1000);
    var dob = '2024';//date.getMonth() + 1 + '-' + date.getFullYear();

    var petName = 'test';//getParameterByName('name');
    var element = 'fire';//getParameterByName('element');
    var gender = 'n';//getParameterByName('gender'); //f m b n

    var tableColor = 'black';//getParameterByName('tablecolor');
    var textColor = 'black';//getParameterByName('textcolor');

    var mapImage = 'https://thumb10.shutterstock.com/image-photo/redirected-150nw-127881737.jpg';//getParameterByName('map');
    if (!mapImage.includes('://')) {
        //Map
        mapImage = 'maps/' + mapImage;
    }
    
    var petImage = 'https://i.stack.imgur.com/myepp.gif';//getParameterByName('pet');
    if (!petImage.includes('://')) {
        //Pet
        petImage = 'pets/' + petImage;
    }

    var bodyImage = '';//getParameterByName('background');
    if (!bodyImage.includes('://')) {
        //Pet
        bodyImage = 'backgrounds/' + bodyImage;
    }

    //DOM elements
    var pet = document.getElementById('pet');
    var map = document.getElementById('map');
    //var talkBox = document.getElementById('talk');
    var petNameBox = document.getElementById('petName');
    var elementBox = document.getElementById('element');
    var dobBox = document.getElementById('dob');
    var moodBox = document.getElementById('mood');
    var bellyBox = document.getElementById('belly');
    var coinsBox = document.getElementById('coins');
    var petNameTag = document.getElementById('petName-tag');
    //var overlay = document.getElementById('overlay');
    //var underlay = document.getElementById('underlay');
    var petInteract = document.getElementById('overlay-pet-interact');
    var petTable = document.getElementById('petTable');


        //Master game loop
    /*var mainInterval = setInterval(function () {
        loop();
    }, 1000);*/

    //Apply colour to the table
    /*for (var i = 0, row; (row = petTable.rows[i]); i++) {
        row.style.borderColor = tableColor;

        for (var j = 0, col; (col = row.cells[j]); j++) {
            col.style.borderColor = tableColor;
        }
    }*/
    //petTable.style.borderColor = tableColor;

    //Pick gender icon
    var genderRender = '';
    if (gender === 'f') {
        genderRender = '<img class="uiicon" src="ui/girl.png"/>';
    } else if (gender === 'm') {
        genderRender = '<img class="uiicon" src="ui/boy.png"/>';
    } else if (gender === 'b') {
        genderRender = '<img class="uiicon" src="ui/both.png"/>';
    }

    //General render settings
    //pet.style.backgroundImage = "url('" + petImage + "')";
    //map.style.backgroundImage = "url('" + mapImage + "')";
    //petNameTag.innerHTML = petName;
    //petNameBox.innerHTML = petName + genderRender;
    //dobBox.innerHTML = dob;
    //elementBox.innerHTML = element;
    //document.body.style.backgroundImage = "url('" + bodyImage + "')";
    //document.body.style.color = textColor;
    document.title = petName;

    /*//Register interaction events
    petInteract.addEventListener('pointerover', function () {
        //pet.style.animation = 'wiggle 0.2s linear infinite';
    });
    petInteract.addEventListener('pointerout', function () {
        //pet.style.animation = null;
    });*/

        //+++ Game Loop +++
    function loop() {
        //Belly
        belly = belly - 0.3;
        if (belly <= 10) {
            //break;
            //speak('death','game over, man.');
        }
        if (belly > 100) {
            belly = 100;
        }
        var bellyHearts = '';
        for (var i = 0; i < belly / 10 / 2; i++) {
            bellyHearts += '<img class="uiicon" src="https://wiki.mabi.world/images/8/82/Fried_Chicken_Wing.png"/>';
        }
        //bellyBox.innerHTML = bellyHearts;

        //Mood
        mood = mood - 0.3;
        if (mood <= 10) {
            //speak('death','game over, man.');
        }
        if (mood > 100) {
            mood = 100;
        }
        var moodHearts = '';
        for (var j = 0; j < mood / 10 / 2; j++) {
            moodHearts += '<img class="uiicon" src="https://bestanimations.com/Signs&Shapes/Hearts/animatedloveheart-18.gif"/>';
        }
        //moodBox.innerHTML = moodHearts;

        //Coins
        coins = coins + mood / 600;
        //coinsBox.innerHTML = Math.floor(coins);

        //Function calls
        //teMain();
        //speakAnimator();
        //rainFall();
        //movePet();
        //petTalk();
        //autoEat();
    }


  return (
    <div className="App">
        <div className='window' style={{width: 300+'px'}}>
                <div className="title-bar" style={{width: 297+'px'}}>
                    <div className="title-bar-text">Name: <b id="petName"></b></div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" />
                        <button aria-label="Maximize" />
                        <button aria-label="Close" />
                    </div>
                </div>
            <table id="petTable" className="interactive">
                <thead>
                    <tr>
                        <td>Mood: <b id="mood"></b></td>
                        <td>Belly: <b id="belly"></b></td>
                        <td>Coins: <b id="coins"></b></td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="window-body">
                        <td colspan="2">
                            <div id="map">
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
                            <button /*onClick={/*() => petParty()}*/>Party 20c</button><br></br>
                        </td>
                    </tr>
                </tbody>
                <tr>
                    <td colspan="3">
                        <textarea id="talk" disabled="true"></textarea>
                    </td>
                </tr>
            </table>
        </div>
        <label>test by jason hankins</label>
    </div>
  );
}

export default App;
