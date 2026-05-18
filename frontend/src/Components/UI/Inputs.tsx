interface InputStyles{
    type : "text" | "password",
    Placeholder : string , 
    Color : "white" | "Slate" , 
    size : "primary" | "secondary" | "tertiary" , 
    TextColor : "Grey" | "Black" 
}

const TextColorStyles:any = {
    "Black" : "text-black" , 
    "Slate" : "text-slate-700"
}

const ColorStyles:any = {
    "White" : "bg-white" , 
    "Slate" : "bg-slate-50"
}

const Sizestyle:any = {
    "primary" : "h-[2.5rem] w-full" , 
    "secondry" : "h-[3.5rem] w-full" , 
    "tertiary" : "h-[4.5rem] w-full"
}

const DefaultStyles = "pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out";

const FontDefaultStyles = "font-[0.8rem] font-mono";
export function Input(props : InputStyles)
{
    return<>
        <input placeholder={props.Placeholder} title="Email Address" type={props.type} className={`${DefaultStyles} ${TextColorStyles[props.TextColor]} ${ColorStyles[props.Color]} ${Sizestyle[props.size]} ${FontDefaultStyles}`}/>
    </>
}