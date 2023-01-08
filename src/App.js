import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import { btnIA, btnNotIA } from "./styles/components-styles";

const images = [
  {
    id: 0,
    name: "ai-renaissance-painting-of-a-woman.png",
    type: "ia"
  },
  {
    id: 1,
    name: "ai-il_1588xN.2811472517_o01v.webp",
    type: "ia"
  }
]

function App() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [actualImg, setActualImg] = useState({});



  useEffect(() => {
    const max = images.length; // Number of fotos in imgs folder
    const randImgIndex = Math.floor(Math.random() * (max));
    setActualImg(images[randImgIndex]);

    const bestScoreStored = window.localStorage.getItem("bestScore")
    bestScoreStored && setBestScore(bestScoreStored);

  }, []);

  const btnIaNotIaHadler = (e) => {
    if (actualImg.type === e.target.id) {
      console.log("add point");
      setScore((prev) => prev + 1)
      // next photo
      // mark photo as shown
      return;
    }
    if (score > bestScore) {
      setBestScore(score);
      window.localStorage.setItem("bestScore", JSON.stringify(score));
    }
    console.log("End Games");
  }

  return (
    <div className="">
      <NavBar score={score} bestScore={bestScore} />

      <main className="flex flex-col items-center justify-center p-10 bg-gray-300 backdrop-blur-sm">
        <img
          src={`images/${actualImg.name}`}
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

        {!playing &&
          <Modal setPlaying={setPlaying} />
        }
      </main >

    </div >
  );
}

export default App;
