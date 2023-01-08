import { useCallback, useEffect, useState } from "react";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import { btnIA, btnNotIA } from "./styles/components-styles";

const imagesAI = [
  {
    id: 0,
    url: "images/ai-renaissance-painting-of-a-woman.png",
    type: "ai",
  },
  {
    id: 1,
    url: "images/ai-il_1588xN.2811472517_o01v.webp",
    type: "ai",
  }
]

const imagesNotAI = [
  {
    id: 0,
    url: "https://openaccess-cdn.clevelandart.org/1998.78.14/1998.78.14_web.jpg",
    type: "not-ai",
  },
  {
    id: 1,
    url: "https://piction.clevelandart.org/cma/ump.di?e=032AD180D21FF43121B04BF457E32E4038160C2F53B3B3D8BB23B6A0F162378D&s=24247294&se=1513541571&v=0&f=1998.78det02_w.jpg",
    type: "not-ai",
  }
]

function App() {
  const [gameStatus, setGameStatus] = useState("welcome");
  const [actualImg, setActualImg] = useState(undefined);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const selectNextImg = async () => {

      const imgArray = Math.random() > 0.5 ? imagesAI : imagesNotAI
      const randImgIndex = Math.floor(Math.random() * (imgArray.length));
      setActualImg(imgArray[randImgIndex]);

    }
    if (actualImg === undefined) selectNextImg();

  }, [actualImg]);

  useEffect(() => {
    window.localStorage.setItem("bestScore", bestScore);
  }, [bestScore])

  useEffect(() => {
    const bestScoreStored = window.localStorage.getItem("bestScore")
    bestScoreStored && setBestScore(bestScoreStored);
  }, [])

  const btnIaNotIaHadler = (e) => {

    if (e.target.id === actualImg.type) {
      setScore((prev) => prev + 1);
      setActualImg(undefined)
      return;
    }
    if (score > bestScore) {
      setBestScore(score);
    }
    setGameStatus("game-over");

  }
  return (
    <div>
      <NavBar score={score} bestScore={bestScore} />

      <main className="flex flex-col items-center justify-center p-10 bg-gray-300 backdrop-blur-sm">
        <img
          src={actualImg?.url}
          alt="initialImg"
          className="sm:max-w-2xl"
        />
        <div className="
          flex
          flex-col
          pt-10
          text-xl
          text-gray-800
          gap-2
        ">
          <button
            id="ai"
            className={btnIA}
            onClick={btnIaNotIaHadler}
          >
            IA
          </button>
          <button
            id="not-ai"
            className={btnNotIA}
            onClick={btnIaNotIaHadler}
          >
            NOT IA
          </button>
        </div>
        {gameStatus === "game-over" &&
          <Modal
            score={score}
            bestScore={bestScore}
            modalStatus={"game-over"}
            setGameStatus={setGameStatus}
            setScore={setScore}
          />
        }
        {gameStatus === "welcome" &&
          <Modal
            modalStatus={"welcome"}
            setGameStatus={setGameStatus}
            setBestScore={setBestScore}
          />
        }
      </main >

    </div >
  );
}

export default App;
