import { navElement } from "../styles/components-styles";


export default function NavBar() {


    return (
        <nav className="
            flex justify-between items-center
            py-5
            px-20
            xl:px-40
            bg-gray-900
            text-slate-400
        ">
            <a
                className={`${navElement}`}
                href={"http://localhost:3000/"}
            >
                <img src="logo.png" alt="logo" width={70} />

            </a>
            <p className={`font-medium text-2xl`}>
                Best Score: <span>0</span>
            </p>


        </nav >
    )
}