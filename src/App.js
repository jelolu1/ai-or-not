import { useCallback, useEffect, useState } from "react";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import { btnIA, btnNotIA } from "./styles/components-styles";

const images = [
  {
    id: 0,
    name: "images/ai-renaissance-painting-of-a-woman.png",
    type: "ia",
  },
  {
    id: 1,
    name: "images/ai-il_1588xN.2811472517_o01v.webp",
    type: "ia",
  }
]

function App() {
  const [gameStatus, setGameStatus] = useState("welcome");
  const [actualImg, setActualImg] = useState(undefined);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);


  const endGame = useCallback(() => {
    if (score > bestScore) {
      setBestScore(score);
      window.localStorage.setItem("bestScore", JSON.stringify(score));
    }
    setGameStatus("game-over");
  }, [score, bestScore])

  useEffect(() => {
    const selectNextImg = async () => {

      if (Math.random() > 0.5) {

        const randImgIndex = Math.floor(Math.random() * (images.length));
        setActualImg(images[randImgIndex].name);
        const bestScoreStored = window.localStorage.getItem("bestScore")
        bestScoreStored && setBestScore(bestScoreStored);

      }
      else {
        const response = await fetch("https://openaccess-api.clevelandart.org/api/artworks/?q=song%20xu&skip=2&limit=1&indent=1");
        const data = await response.json();
        const urlImg = data.data[0].images.web.url
        setActualImg(urlImg)

      }

    }
    if (actualImg === undefined) selectNextImg();

  }, [actualImg]);



  const btnIaNotIaHadler = (e) => {

    if (
      (actualImg.includes("images") && e.target.id === "ai") ||
      (!actualImg.includes("images") && e.target.id === "not-ai")
    ) {
      setScore((prev) => prev + 1);
      setActualImg(undefined)
      return;
    }
    endGame();

  }
  return (
    <div>
      <NavBar score={score} bestScore={bestScore} />

      <main className="flex flex-col items-center justify-center p-10 bg-gray-300 backdrop-blur-sm">
        <img
          src={actualImg}
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
          />
        }
      </main >

    </div >
  );
}

export default App;
