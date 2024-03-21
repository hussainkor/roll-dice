import { useState } from 'react'
import './App.css';

function App() {
  let [curScore, setCurScore] = useState(0);
  let [pl1Score, setpl1Score] = useState(0);
  let [pl2Score, setpl2Score] = useState(0);
  let [activePlayer, setActivePlayer] = useState(0);
  let [holdScore1, setHoldScore1] = useState(0);
  let [holdScore2, setHoldScore2] = useState(0);
  let [darkBg, setDarkBg] = useState("");
  let [getRandom, setGetRandom] = useState(0);
  const [animatedDice, setAnimatedDice] = useState(false);
  const [defaulMsg, setDefaulMsg] = useState("Start Dice Game by clicking Roll Dice button");
  const [playCheck, setPlayCheck] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Animated  Dice Roll
  function dicedRound() {
    setAnimatedDice(true);
    const audio = new Audio('dice/roll.mp3');
    audio.play();
  }

  // Dice Rolled
  function rollDice() {
    if (playing) {
      setPlayCheck(false);
      dicedRound();
      setGetRandom(0);
      let random = Math.trunc(Math.random() * 6) + 1;

      setTimeout(() => {
        setAnimatedDice(false);
        setGetRandom(random);
        if (random !== 1) {
          if (activePlayer === 0) {
            setCurScore(curScore += random);
            setpl1Score(curScore);
          }
          else {
            setCurScore(curScore += random);
            setpl2Score(curScore);
          }
        }
        else {
          if (activePlayer === 0) {
            setCurScore(0)
            setpl1Score(0);
          }
          else {
            setCurScore(0)
            setpl2Score(0);
          }
          setActivePlayer(activePlayer === 0 ? 1 : 0);
        }
      }, 900);

    }
  }
  function holdScore() {
    if (playing) {
      if (activePlayer === 0) {
        setHoldScore1(holdScore1 = holdScore1 += curScore);
      }
      if (activePlayer === 1) {
        setHoldScore2(holdScore2 = holdScore2 += curScore);
      }
      if (holdScore1 >= 20 || holdScore2 >= 20) {
        setPlaying(false);
        setGetRandom(0);
        setPlayCheck(true);
        setDefaulMsg(`Yay! Player: ${activePlayer + 1} won the game`);
        document.querySelector(`.player-${activePlayer}`).classList.add('winner-bg');
      }
      else {
        setCurScore(0);
        setpl1Score(0);
        setpl2Score(0);
        setActivePlayer(activePlayer === 0 ? 1 : 0);
      }
    }
  }

  // Reset Game
  function resetGame() {
    setPlaying(true);
    setGetRandom(0);
    setCurScore(0);
    setpl1Score(0);
    setpl2Score(0);
    setActivePlayer(0);
    setHoldScore1(0);
    setHoldScore2(0);
    setDefaulMsg(`Start Dice Game by clicking Roll Dice button`);
  }

  // Dark Mode
  function darkMode() {
    setDarkBg(darkBg === '#1E2A3A' ? '' : '#1E2A3A');
  }

  return (
    <div className="App" style={{ backgroundColor: `${darkBg}` }}>
      <div className={`fireworks ${playing ? 'hidden' : ''}`}>
        <div className="before"></div>
        <div className="after"></div>
      </div>

      <div className="instruction">
        <h2>Roll Dice Game</h2>
        <p>On rolls, if the dice number comes to 1 then the player automatically will switch (Note: It's a 20 point game)</p>
      </div>

      <div className='player-score'>
        <div className="best-attempt-win"></div>
        <div className='players'>
          <div className="winner-message hidden"></div>
          <div className={`player-0 ${activePlayer === 0 ? 'active-toggle' : ''}`}>
            <div className="player-name"><span className="player-name-0">Player 1</span> Score</div>
            <span id="current-0">{holdScore1}</span>
            <div className="player-0-hold-score">Current
              <span id="hold-score-0">{pl1Score}</span>
            </div>
          </div>
          <div className={`player-1 ${activePlayer === 1 ? 'active-toggle' : ''}`}>
            <div className="player-name"><span className="player-name-1">Player 2</span> Score</div>
            <span id="current-1">{holdScore2}</span>
            <div className="player-1-hold-score">Current
              <span id="hold-score-1">{pl2Score}</span>
            </div>
          </div>
          <div className="button-control">
            <button className="reset-btn" onClick={resetGame}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="svg-refresh">
                <path
                  d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
              </svg>
              New Game
            </button>
            <div className="random-box">
              {animatedDice && <div className={`animated-dice roll`}>
                🎲
              </div>}
              {playCheck && <div className="winner-message">{defaulMsg}</div>}
              {getRandom > 0 ? <div className="random-number">
                <img src={`dice/dice-${getRandom}.png`} alt="dice" className="dice-image" />
              </div> : null}
            </div>
            {playing && <>
              <button className={`roll-btn ${animatedDice ? 'disabled' : ''}`} onClick={rollDice}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className="svg-dice">
                  <path
                    d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H461.7c11.6 36 3.1 77-25.4 105.5L320 413.8V448zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                </svg>Roll
              </button>
              <button className="hold-btn" onClick={holdScore}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className="svg-hold">
                  <path
                    d="M148 76.6C148 34.3 182.3 0 224.6 0c20.3 0 39.8 8.1 54.1 22.4l9.3 9.3 9.3-9.3C311.6 8.1 331.1 0 351.4 0C393.7 0 428 34.3 428 76.6c0 20.3-8.1 39.8-22.4 54.1L302.1 234.1c-7.8 7.8-20.5 7.8-28.3 0L170.4 130.7C156.1 116.4 148 96.9 148 76.6zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" />
                </svg>Hold
              </button></>}
          </div>
        </div>
      </div>

      <div className="theme-btn-ctn">
        <input type="checkbox" id="checkBtn" onClick={darkMode} className="theme-btn" />
        <label className="theme-btn-label" htmlFor="checkBtn">
          <div className="check-tag"></div>
        </label>
      </div>
    </div >
  );
}

export default App;