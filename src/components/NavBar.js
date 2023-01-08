import { navElement } from "../styles/components-styles";


export default function NavBar({ score, bestScore }) {


    return (
        <nav className="
            flex justify-between items-center
            py-5
            px-20 xl:px-40
            text-xl sm:text-2xl
            font-medium
            bg-gray-900
            text-slate-400
        ">
            <a
                className={`${navElement}`}
                href={"http://localhost:3000/"}
            >
                <img src="logo.png" alt="logo" width={70} />

            </a>
            <div className="
                flex
                flex-col md:flex-row
                gap-1 md:gap-10
                "
            >
                <p className="flex gap-5 justify-between">
                    Actual Score: <span >{score}</span>
                </p>
                <p className="flex gap-5 justify-between">
                    Best Score: <span>{bestScore}</span>
                </p>
            </div>



        </nav >
    )
}