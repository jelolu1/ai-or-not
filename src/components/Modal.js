import { modelContent } from "../styles/components-styles"

export default function Modal({ setGameStatus, modalStatus, score, bestScore, setScore }) {
    return (
        <div className="
        flex justify-center items-center 
        opacity-1
        fixed top-0 left-0
         w-full
         h-full
         backdrop-blur-sm
        ">

            {modalStatus === "welcome" &&
                <div className={modelContent}>
                    <h1 className="font-medium text-3xl">Welcome!</h1>
                    <p className="flex flex-col justify-center items-center gap-3">
                        <span>You need to guess if the image has been created</span>
                        <span>with an artificial inteligence or not.</span>
                        <span>Enjoy!</span>

                    </p>
                    <button
                        className={`font-medium text-3xl`}
                        onClick={() => setGameStatus("playing")}
                    >
                        Play
                    </button>
                </div >
            }
            {modalStatus === "game-over" &&
                <div className={`${modelContent} w-96`}>
                    <h1 className="font-medium text-3xl">Game Over!</h1>
                    <p className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-3
                    font-medium text-xl
                    "
                    >
                        <span>Your score: {score}</span>

                        {score > bestScore && <span>New Best Score!</span>}

                    </p>
                    <button
                        className={`font-medium text-3xl`}
                        onClick={() => {
                            setGameStatus("playing")
                            setScore(0)
                        }}
                    >
                        Play Again
                    </button>
                </div>
            }

        </div>
    )
}