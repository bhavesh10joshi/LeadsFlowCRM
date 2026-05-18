import { Google } from "../Icons/Google"
import { GitHub } from "../Icons/Github"
import { Input } from "../Components/UI/Inputs"
import { Button } from "../Components/UI/Buttons"

export function Login()
{
    return<>
        <div className="w-full min-h-screen flex justify-center items-center flex-col bg-slate-200 p-4 animate-fade-in">
            <div className="font-bold text-[2rem] text-blue-500 flex justify-center items-center transition-transform duration-500 hover:scale-105">LeadFlow CRM</div>
            <div className="text-[0.7rem] text-slate-600 tracking-wider">Sales Intelligence for Modern Teams</div>
            <div className="bg-white w-full max-w-[30rem] min-h-[30rem] mt-[2rem] border-slate-300 rounded-[2rem] border-[0.1rem] p-[1.5rem] sm:p-[2rem] shadow-xl transform transition-all duration-500 hover:shadow-2xl">
                <div className="w-full">
                    <div className="flex justify-start items-center w-full text-[1.2rem] font-semibold font-mono leading-tight">
                        Welcome Back
                    </div>
                    <div className="flex justify-center items-center w-full gap-5 mt-[2rem]">
                        <button aria-label="Google Login" className="flex justify-center items-center w-2/4 border-slate-300 border-[0.1rem] rounded-lg pt-[0.5rem] pb-[0.5rem] transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98]">
                            <Google/>
                        </button>
                        <button aria-label="Github Login" className="flex justify-center items-center w-2/4 border-slate-300 border-[0.1rem] rounded-lg pt-[0.5rem] pb-[0.5rem] transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] active:scale-[0.98]">
                            <GitHub/>
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-[2rem]">
                        <div className="flex justify-center items-center rounded-md w-2/6 bg-slate-300 h-[0.05rem]">
                        </div>
                        <div className="flex justify-center items-center text-[0.6rem] w-2/6 text-slate-400 text-center font-semibold tracking-wider">
                            OR CONTINUE WITH EMAIL
                        </div>
                        <div className="flex justify-center items-center rounded-md w-2/6 bg-slate-300 h-[0.05rem]">
                        </div>
                    </div>
                    <div className="mt-[1rem]">
                        <div>
                            <div className="text-[0.8rem] font-bold text-slate-700">Email Address</div>
                            <div className="flex justify-center items-center w-full mt-[0.5rem]">
                                <Input Placeholder={"Josh@gmail.com"} TextColor="Black" Color="Slate" type="text" size="primary"/>
                            </div>
                        </div>
                        <div className="mt-[1rem]">
                            <div className="text-[0.8rem] font-bold text-slate-700">Password</div>
                            <div className="flex justify-center items-center w-full mt-[0.5rem]">
                                <Input Placeholder={"........"} TextColor="Black" Color="Slate" type="password" size="primary"/>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="w-full mt-[2rem] flex justify-center items-center">
                    <Button size="secondry" text="Sign in to Dashboard" color="blue" textColor="white"/>
                </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 mt-[1.5rem]">
                <div className="text-[0.8rem] font-semibold text-slate-600 flex justify-center sm:justify-end items-center w-full sm:w-1/2">Don't have an Account!</div>
                <div className="flex justify-center sm:justify-start items-center w-full sm:w-1/2"><button className="text-[0.8rem] font-semibold text-blue-500 transition-all duration-300 hover:text-blue-600 hover:underline">Create An Account</button></div>
            </div>
        </div>
    </>
}