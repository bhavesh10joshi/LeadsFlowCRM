import type { ReactElement } from "react"

interface ButtonStyles {
    size: "primary" | "secondry" | "tertiary" | "middle",
    text: string,
    FrontIcon?: ReactElement,
    BackIcon?: ReactElement,
    color: "blue" | "grey" | "white",
    textColor: "black" | "grey" | "blue" | "white"
    OnClick?: () => void
}

const ColorAndShadowStyles = {
    "blue": "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
    "grey": "bg-slate-200 hover:bg-slate-300 active:bg-slate-400 shadow-lg shadow-slate-600/20",
    "white": "bg-white border border-slate-300 hover:bg-slate-50"
}

const SizeStyling = {
    "primary": "w-full md:w-[6rem] h-[2.5rem] px-2",
    "secondry": "w-full h-[3rem] px-4",
    "middle" : "w-full md:w-[9rem] h-[2.5rem] px-2",
    "tertiary": ""
}

const TextColorStyling = {
    "black": "text-black font-semibold",
    "grey": "text-slate-600 font-semibold",
    "blue": "text-blue-600 font-semibold",
    "white": "text-white font-semibold"
}

const defaultStyles = "flex justify-center items-center rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm tracking-wide";

export function Button(props: ButtonStyles) {
    return <>
        <button 
            onClick={props.OnClick}
            className={`${defaultStyles} ${TextColorStyling[props.textColor]} ${SizeStyling[props.size]} ${ColorAndShadowStyles[props.color]}`}
        >
            <div className="flex items-center gap-2">
                {props.FrontIcon}
                <span>{props.text}</span>
                {props.BackIcon}
            </div>
        </button>
    </>
}