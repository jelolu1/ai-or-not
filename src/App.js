import { useCallback, useEffect, useState } from "react";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import { btnIA, btnNotIA } from "./styles/components-styles";

const images = [
  {
    id: 0,
    name: "ai-renaissance-painting-of-a-woman.png",
    type: "ia",
  },
  {
    id: 1,
    name: "ai-il_1588xN.2811472517_o01v.webp",
    type: "ia",
  }
]

function App() {
  const [gameStatus, setGameStatus] = useState("welcome");
  const [imagesCurrGame, setImagesCurrGame] = useState([...images]);
  const [actualImg, setActualImg] = useState(undefined);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);


  const endGame = useCallback(() => {
    if (score > bestScore) {
      setBestScore(score);
      window.localStorage.setItem("bestScore", JSON.stringify(score));
    }
    setActualImg(undefined)
    setImagesCurrGame([...images])
    setGameStatus("game-over");
  }, [score, bestScore])

  const selectNextImg = useCallback(() => {

    if (imagesCurrGame.length > 0) {
      const randImgIndex = Math.floor(Math.random() * (imagesCurrGame.length));

      setActualImg(imagesCurrGame[randImgIndex]);
      setImagesCurrGame(prev => {
        prev.splice(randImgIndex, 1)
        return prev
      })

      const bestScoreStored = window.localStorage.getItem("bestScore")
      bestScoreStored && setBestScore(bestScoreStored);

    }

    if (imagesCurrGame.length === 1 || imagesCurrGame.length === 1) {
      endGame();
    }
  }, [imagesCurrGame, endGame])

  useEffect(() => {
    if (actualImg === undefined) selectNextImg();

  }, [actualImg, selectNextImg]);



  const btnIaNotIaHadler = (e) => {

    if (actualImg.type === e.target.id) {
      setScore((prev) => prev + 1);
      selectNextImg();
      return;
    }
    endGame();

  }


  return (
    <div>
      <NavBar score={score} bestScore={bestScore} />

      <main className="flex flex-col items-center justify-center p-10 bg-gray-300 backdrop-blur-sm">
        <img
          src={`images/${actualImg?.name}`}
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
            id="ia"
            className={btnIA}
            onClick={btnIaNotIaHadler}
          >
            IA
          </button>
          <button
            id="not-ia"
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
          <Modal modalStatus={"welcome"} setGameStatus={setGameStatus} />
        }
      </main >

    </div >
  );
}

export default App;
