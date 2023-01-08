export default function Modal({ setPlaying }) {
    return (
        <div className="
        flex justify-center items-center 
        opacity-1
        fixed top-0 left-0
         w-full
         h-full
         backdrop-blur-sm
        ">
            <div class="
          relative
          p-10
          rounded-lg
          bg-gray-800
          text-slate-100
          flex flex-col justify-center items-center
          gap-10
          ">
                <h1 className="font-medium text-3xl">Welcome!</h1>
                <p className="flex flex-col justify-center items-center gap-3">
                    <span>You need to guess if the image has been created</span>
                    <span>with an artificial inteligence or not.</span>
                    <span>Enjoy!</span>

                </p>
                <button
                    className={`font-medium text-3xl`}
                    onClick={() => setPlaying(true)}
                >
                    Play
                </button>
            </div>
        </div>
    )
}