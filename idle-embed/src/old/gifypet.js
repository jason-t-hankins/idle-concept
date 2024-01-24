
//+++ Main System Functions +++

//Timed event manager
var teTimer = -1;
var teEnd = 5;
var teFunction = null;

function teStart(functionPass, duration) {
    //Close any complex UI that may mess things up.
    //closeSlots();

    //If the timer is already running, call a cancel on whatever function is active.
    if (teTimer != -1) {
        teFunction(false);
    }
    teTimer = 0;
    teEnd = duration;
    teFunction = functionPass;
}

function teMain() {
    if (teTimer == -1) {
        return;
    }

    //Ok ok, yes this could be run instantly in teStart, but theres a charm to the delay it adds.
    if (teTimer === 0) {
        teFunction(true);
        petInteract.style.zIndex = '-1'; //Disable pet interaction
    }

    teTimer++;

    if (teTimer == teEnd) {
        teFunction(false);
        teTimer = -1;
        petInteract.style.zIndex = '1'; //Enable pet interaction
    }
}

//+++ Actions +++

//General Pet chatter
var sayings = ['ALOvE you VERA much!', 'The sky is pixels!', 'Why do I exist?', 'Pandas are silly', 'Did you know a ripe cranberry will bounce.', 'Im rooting for you!', 'Youre looking sharp today!', 'Orange you smart!', 'Bubble yum keeps it poppin', 'Im really quite frond of you :P', 'Its a fine day with you around..', 'I think your a swell person', 'I hope I never get uninstalled!', "To me, you're the gifypet!", 'Remember to be happy!', 'You make every day special :P', 'The sun never sets on Melonland', 'BOO! I scared you :O', 'Moo! Im a dragon!', 'Bruup', 'AHHchoooooooooo..', 'Mrumph', 'I like you :3', 'Poof! You cant see me now!', 'I got lost in the MoMG Gallery once!', "Buy Ozwomp's Voyage!"];
var lastPick = 0;
var speakDelay = 0;

function petTalk() {
    //Speak Delay adds a minimum delay between messages
    speakDelay++;
    if (speakDelay < 12) {
        return;
    }

    if (random100() < 8) {
        var pick = 0;
        do {
            pick = Math.floor(Math.random() * sayings.length);
        } while (pick == lastPick);

        speak(petName, sayings[pick]);
        speakDelay = 0;
    }
}
//Mood related actions
function moodCheck() {
    if (mood > 0 && mood < 20) {
        if (random100() < 4) {
            speak(petName, 'HUNGRY! HUNGRY!!!');
        }

        return;
    }

    if (mood > 20 && mood < 40) {
        if (random100() < 4) {
            speak(petName, 'Im getting peckish..');
        }

        return;
    }

    if (mood > 40 && mood < 100) {
        if (random100() < 4) {
            speak(petName, 'Mmmmmm');
        }

        return;
    }

    if (mood > 100 && mood < 150) {
        if (random100() < 4) {
            speak(petName, 'Im getting a bit fat!');
        }

        return;
    }

    if (mood > 150 && mood < 200) {
        if (random100() < 4) {
            speak(petName, 'FAT FAT FAT!');
        }

        return;
    }
}

//Feed Pet
var foodTypeSayings = [
    ['Yum, That was realy filling!', 'Its good to eat!', 'ROMNOMNOMNOM', 'Mmmmmm <3', 'This is almost as nice as you!', 'For me :D', 'I WILL EAT IT!'],
    ['YAYAYAYAYAY', 'OMG YUM', 'Yumo', 'I like this very much!'],
    ['Thanks I guess..', 'I guess you cant afford anything better?', 'I can eat this..', 'You eat this stuff regularly?', 'Its food...'],
    ['Refreshing!', 'I was so thirsty!', 'TIME TO GET PEPSI DRUNK!', 'Glug glug glug', 'Drinkn a drink, ya ya ya, thats my song...', 'I can drink to that!'],
];

function feedPet(foodType) {
    //0-Main/Meat 1-Junk 2-Boring 3-Drink
    if (coins < 5) {
        speak('FoodShop', 'Food costs 5 coins!');
        errorSound.play();
        return;
    }

    if (belly > 80) {
        speak(petName, 'Im too full to eat more :(');
        errorSound.play();
        return;
    }

    coins -= 5;
    mood += 10;
    belly += 20;
    speak(petName, foodTypeSayings[foodType][randomArray(foodTypeSayings[foodType])]);
    teStart(teFeed, 2);
}

function teFeed(active) {
    if (active === true) {
        overlay.style.backgroundImage = "url('overlays/face.gif')";
        eatSound.play();
    } else {
        overlay.style.backgroundImage = 'none';
    }
}
//Pet auto eats to maintain mood
function autoEat() {
    if (mood < 20 && belly < 20) {
        speak('Friend', 'Here is some food ' + petName + ' ;)');
        speak(petName, foodTypeSayings[0][randomArray(foodTypeSayings[0])]);
        belly += 20;
        mood += 20;
    }
}

//Talk to pet
var talkSayings = ['Whos the best pet!', 'You should get a job in finance!', 'What time is it?', 'Who ya gonna call!', 'Do you know Ferris?', 'Are you a panda?'];
var talkResponces = ['Meeeeee :D', 'Ummmm... No...', 'Beats me!', 'GifyPets!', 'Hes a righteous dude!', 'Well what do you think..'];

function talkToPet() {
    var pick = Math.floor(Math.random() * talkSayings.length);

    talkSound.play();
    speak('You', talkSayings[pick]);
    speak(petName, talkResponces[pick]);
}

//Pett pet
function pettPet() {
    speak(petName, 'Yay, petts for ' + petName + '!!');
    mood += 20;
    teStart(tePett, 3);
}

function tePett(active) {
    if (active === true) {
        movment = false;
        pet.classList.add('pett');
        overlay.innerHTML = '<img src="overlays/heartrain.gif" />';
    } else {
        movment = true;
        pet.classList.remove('pett');
        overlay.innerHTML = '';
    }
}

//Shower
function showerPet() {
    if (coins < 10) {
        speak('MrShower', "You can't afford my services..");
        errorSound.play();
        return;
    }
    teStart(teShower, 6);
    speak(petName, 'Yay a bath time :D');
    mood += 20;
    coins -= 10;
}

function teShower(active) {
    if (active === true) {
        overlay.style.backgroundImage = "url('overlays/shower.gif')";
        overlay.innerHTML = '<img style="padding-top: 50px; width: 60%;" src="' + petImage + '" />';
        washSound.play();
    } else {
        overlay.style.backgroundImage = 'none';
        overlay.innerHTML = '';
    }
}

//Party
function petParty() {
    if (coins < 20) {
        speak('Pimp', "You can't afford my services..");
        errorSound.play();
        return;
    }
    teStart(teParty, 9);
    speak(petName, 'WOOOOOOT :D ;D');
    mood += 80;
    coins -= 20;
}
var partyGuests = ['robot.gif', 'dog.gif', 'flower.gif', 'frog.gif', 'cactus.gif'];

function teParty(active) {
    if (active === true) {
        overlay.style.backgroundImage = "url('overlays/party.gif')";
        partySound.play();

        var shuffeledGuests = shuffle(partyGuests);

        for (var i = 0; i < 4; i++) {
            var guestX = i * 40 + 15;
            var guestY = random100() / 2 + 105;
            overlay.innerHTML += '<img class="pet guest" style="top:' + guestY + 'px; left:' + guestX + 'px; position: fixed;" src="pets/' + shuffeledGuests[i] + '" />';
        }
    } else {
        overlay.style.backgroundImage = 'none';
        overlay.innerHTML = '';
    }
}

//Rain
var rainDelay = 0;

function rainFall() {
    rainDelay++;
    if (rainDelay < 15) {
        return;
    }

    if (random100() < 2) {
        teStart(teRain, 10);
        speak(petName, 'Oh great, its raining...');
        mood -= 20;
        rainDelay = 0;
    }
}

function teRain(active) {
    if (active === true) {
        underlay.innerHTML = '<img src="overlays/rain.gif" />';
        underlay.style.backgroundColor = '#1b3a63';
        underlay.style.opacity = '0.4';
    } else {
        underlay.innerHTML = '';
        underlay.style.backgroundColor = null;
        underlay.style.opacity = null;
    }
}
//+++ Helpers +++

//Outputs text to the talk box.
function speak(from, message) {
    if (from == petName) {
        speakTimer = 0;
        pet.classList.add('jump');
    }

    talk = talk + '\n' + from + ': ' + message;
    talkBox.value = talk;
    talkBox.scrollTop = talkBox.scrollHeight;
}
//Mini version of et system to allow speach animation
var speakTimer = -1;

function speakAnimator() {
    if (speakTimer == -1) {
        return;
    }
    if (speakTimer < 1) {
        speakTimer++;
    }
    if (speakTimer >= 1) {
        pet.classList.remove('jump');
        speakTimer = -1;
    }
}

//Checks if the pet is within map bounds
function moveCheck(petX, petY) {
    if (petX > 0 && petX < 100) {
        if (petY > 40 && petY < 95) {
            return true;
        }
    }
    return false;
}

//Retruns a random number with in an arrays size
function randomArray(inputArray) {
    return Math.floor(Math.random() * inputArray.length);
}

//Returns a random number 0 to 100
function random100() {
    return Math.floor(Math.random() * 100 + 1);
}

//Inverts a boolean
function invertB(boolIn) {
    if (boolIn === true) {
        return false;
    } else {
        return true;
    }
}



function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Welcome function calls
speak(petName, "Hello, I'm " + petName + " and you're awesome!");
