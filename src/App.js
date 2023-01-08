import { useState } from "react";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import classes from "./styles/components-styles.module.css";

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

  const max = images.length; // Number of fotos in imgs folder
  const randImgIndex = Math.floor(Math.random() * (max));

  return (
    <div className="">
      <NavBar />

      <main className="flex flex-col items-center justify-center p-10 bg-gray-300 backdrop-blur-sm">
        <img
          src={`images/${images[randImgIndex].name}`}
          alt="initialImg"
          className="sm:max-w-2xl"
        />
        <div className="
        flex
        flex-col
        pt-10
        text-xl
        text-gray-800
        ">
          <button className={`
            border-solid border-2 border-blue-600
            bg-blue-100
            py-1
            mr-10 mb-0
            ${classes["button-ia"]}
            `}
          >IA</button>
          <button
            className={`
            border-solid border-2 border-red-600
            bg-red-100
            py-1 px-6
            mt-0 ml-10
            ${classes["button-notia"]}
          `}
          >NOT IA</button>
        </div>

        {!playing &&
          <Modal setPlaying={setPlaying} />
        }
      </main >

    </div >
  );
}

export default App;
