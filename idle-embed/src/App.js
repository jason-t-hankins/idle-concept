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
import Log from "./Components/Log";

const SAVE_KEY = "idle-embed-save-v1";

const DEFAULT_MODIFIERS = {
    hungerDecay: 1,
    moodDecay: 1,
    coinGain: 1,
    statTickMs: 3000,
    chatterSpeed: 1,
};

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

function loadSave() {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const rawSave = window.localStorage.getItem(SAVE_KEY);
        return rawSave ? JSON.parse(rawSave) : null;
    } catch {
        return null;
    }
}

function getChatterDelay(mood, chatterSpeed = 1) {
    const extremity = Math.min(1, Math.abs(mood - 50) / 50);
    const baseDelay = 4200 - (extremity * 3000);
    return Math.max(600, Math.round(baseDelay / chatterSpeed));
}

function cloneModifiers(overrides = {}) {
    return {
        ...DEFAULT_MODIFIERS,
        ...overrides,
    };
}

function App() {
    const petName = 'jj';
    const [chatWindow, setChatWindow] = useState("hidden");

    const [savedGame] = useState(() => loadSave());
    const [mood, setMood] = useState(savedGame?.mood ?? 50);
    const [hunger, setHunger] = useState(savedGame?.hunger ?? 50);
    const [coins, setCoins] = useState(savedGame?.coins ?? 10);
    const [modifiers, setModifiers] = useState(() => cloneModifiers(savedGame?.modifiers));
    const [messages, setMessages] = useState(() => {
        if (savedGame?.messages) return savedGame.messages;
        if (savedGame?.talk) {
            // convert old text log into messages
            return savedGame.talk.split('\n').filter(Boolean).map(line => ({ from: 'anon', text: line, moodAt: savedGame?.mood ?? 50, ts: Date.now() }));
        }
        return [{ from: 'system', text: `successfully logged in, ${petName} Welcome!`, moodAt: savedGame?.mood ?? 50, ts: Date.now() }];
    });
    const messagesRef = useRef(null);
    const hungerWarningShown = useRef(false);
    const moodWarningShown = useRef(false);

    useEffect(() => {
        document.title = petName;
    }, [petName]);

    const appendTalk = useCallback((from, message) => {
        setMessages(prev => {
            const next = [...prev, { from, text: message, moodAt: typeof mood === 'number' ? mood : 50, ts: Date.now() }];
            if (next.length > 50) {
                // trim oldest messages to keep array at most 50
                return next.slice(next.length - 50);
            }
            return next;
        });
    }, [mood]);

    const saveGame = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        const state = {
            mood,
            hunger,
            coins,
            modifiers,
            messages,
            // for backwards compatibility keep talk as joined text
            talk: messages.map(m => `${m.from}: ${m.text}`).join('\n'),
        };

        window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        appendTalk("system", "game saved locally.");
    }, [appendTalk, coins, hunger, modifiers, mood, messages]);

    const resetGame = useCallback(() => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(SAVE_KEY);
        }

        setMood(50);
        setHunger(50);
        setCoins(10);
        setModifiers(cloneModifiers());
        setMessages([{ from: 'system', text: `successfully logged in, ${petName} Welcome!`, moodAt: 50, ts: Date.now() }]);
        setChatWindow("hidden");
        hungerWarningShown.current = false;
        moodWarningShown.current = false;
    }, [petName]);


    useEffect(() => {
        const loop = setInterval(() => {
            setHunger(h => h - modifiers.hungerDecay);
            setMood(m => m - modifiers.moodDecay);
            setCoins(c => c + modifiers.coinGain);
        }, modifiers.statTickMs);
        return () => {
            clearInterval(loop);
        };
    }, [modifiers.hungerDecay, modifiers.moodDecay, modifiers.coinGain, modifiers.statTickMs]);

    useEffect(() => {
        let cancelled = false;
        let timerId;

        const scheduleNextMessage = () => {
            const delay = getChatterDelay(mood, modifiers.chatterSpeed);

            timerId = window.setTimeout(() => {
                if (cancelled) {
                    return;
                }

                appendTalk("anon", CHATTER[Math.floor(Math.random() * CHATTER.length)]);
                scheduleNextMessage();
            }, delay);
        };

        scheduleNextMessage();

        return () => {
            cancelled = true;
            window.clearTimeout(timerId);
        };
    }, [appendTalk, mood, modifiers.chatterSpeed]);

    useEffect(() => {
        if (hunger <= 10 && !hungerWarningShown.current) {
            appendTalk("system", "dead and hungreh.");
            hungerWarningShown.current = true;
        }

        if (hunger > 10) {
            hungerWarningShown.current = false;
        }
    }, [appendTalk, hunger]);

    useEffect(() => {
        if (mood <= 10 && !moodWarningShown.current) {
            appendTalk("system", "you wanna die.");
            moodWarningShown.current = true;
        }

        if (mood > 10) {
            moodWarningShown.current = false;
        }
    }, [appendTalk, mood]);

    useEffect(() => {
        if (messagesRef.current) {
            // works for both textarea and other scrollable containers
            try {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            } catch (e) {
                // ignore
            }
        }
    }, [messages]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const state = {
            mood,
            hunger,
            coins,
            modifiers,
            messages,
            talk: messages.map(m => `${m.from}: ${m.text}`).join('\n'),
        };

        window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    }, [coins, hunger, modifiers, mood, messages]);


   function chat() {
        setChatWindow("visible");
    }

    function hello() {
        setMood(m => m - 2);
        setCoins(c => c + 3);
        appendTalk(petName, "Hello lovers!!!");
    }

    function eat() {
        if (coins < 5) {
            appendTalk("system", "not enough coins to kill time.");
            return;
        }

        setHunger(h => h + 5);
        setMood(m => m + 2);
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
                        <button onClick={() => saveGame()} aria-label="Close" />
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
                            </div>
                            <div id="overlay" style={{visibility: chatWindow}}>
                                <Friends />
                            </div>
                        </td>

                        <td className="controls" colSpan="1">
                            <b>Programs: </b>
                            <img className="shopitem" src={cart} alt="." />
                            <img className="shopitem" src={gift} alt="." />
                            <img className="shopitem" onClick={() => chat()} src={heart} alt="chat with friends!" />
                            <br />
                            <img className="shopitem" src={house} alt="." />
                            <img className="shopitem" src={lightning} alt="." />
                            <img className="shopitem" src={world} alt="." />
                            <b>Actions:</b>
                            <button onClick={() => hello()}>Hello</button><br></br>
                            <button onClick={() => eat()}>Kill Time</button><br></br>

                            <button disabled onClick={() => resetGame()}>Goodbye</button><br></br>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <textarea id="talk" ref={messagesRef} className="messageList" readOnly value={messages.map(m => `${m.from}: ${m.text}`).join('\n')} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
                <Log messages={messages} />
                <label>test by butteredroll</label>
    </div>
  );
}

export default App;
