import { Input } from "../Components/UI/Inputs"
import { Button } from "../Components/UI/Buttons"
import { Admin } from "../Icons/Admin"
import { User } from "../Icons/User"

export function SignUp()
{
    return<>
        <div className="p-4 md:p-[2rem] min-h-screen flex flex-col md:flex-row justify-center items-center gap-5 bg-slate-50 md:bg-white animate-fade-in">
            <div className="hidden md:flex p-[2rem] bg-blue-600 rounded-[1.5rem] justify-center items-center w-full md:w-4/10 flex-col h-full min-h-[40rem] shadow-xl shadow-blue-500/10">
                <div className="flex justify-start items-start w-full text-[2rem] font-bold text-white h-1/10 transition-transform duration-500 hover:scale-[1.02]">LeadFlowCRM</div>
                <div className="flex justify-start items-start w-full font-semibold text-blue-100 text-start h-1/10 mt-[1rem]">Accelerate your sales pipeline with intelligence.</div>
                <div className="flex justify-start items-start w-full text-blue-50 text-start font-light h-1/10 mt-[1rem] leading-relaxed">
                    Join over 10,000 high-performance sales teams using LeadFlow to close deals faster and manage relationships better.
                </div>
                <div className="h-7/10 h-full flex justify-start items-end mt-auto">
                    <div className="border-t border-blue-400/30 pt-6">
                        <div className="font-bold text-white tracking-wide uppercase text-xs">
                        Trusted by 500+ Enterprises
                        </div>
                        <div className="italic text-start text-blue-100 font-light mt-[1rem] text-sm leading-relaxed">
                            "LeadFlow transformed our chaotic lead tracking into a streamlined engine of growth. It's the essential tool for sales reps."
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-2 sm:px-6 md:px-[4rem] lg:px-[8rem] flex justify-center items-center w-full md:w-6/10 flex-col h-full py-6">
                <div className="text-black flex justify-start items-end w-full font-bold text-[1.75rem] tracking-tight">Create Your Account</div>
                <div className="w-full flex justify-start items-center flex-col mt-[2rem]">
                    <div className="flex justify-start items-center w-full font-semibold text-sm text-slate-700">Full Name</div>
                    <div className="flex justify-start items-center w-full mt-[0.5rem]">
                        <Input Placeholder={"Bhavesh Joshi"} TextColor="Black" Color="Slate" type="text" size="primary"/>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center flex-col mt-[1.25rem]">
                    <div className="flex justify-start items-center w-full font-semibold text-sm text-slate-700">Email Address</div>
                    <div className="flex justify-start items-center w-full mt-[0.5rem]">
                        <Input Placeholder={"Josh@gmail.com"} TextColor="Black" Color="Slate" type="text" size="primary"/>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center flex-col mt-[1.25rem]">
                    <div className="w-full flex justify-start items-center font-semibold text-sm text-slate-700">Password</div>
                    <div className="w-full flex justify-start items-center mt-[0.5rem]">
                        <Input Placeholder={"••••••••"} TextColor="Black" Color="Slate" type="password" size="primary"/>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center flex-col mt-[1.25rem]">
                    <div className="w-full flex justify-start items-center font-semibold text-sm text-slate-700">Select Your Role</div>
                    <div className="w-full flex flex-row justify-start items-center mt-[0.5rem] gap-4">
                        <button className="group text-start rounded-xl border-slate-200 border-[0.1rem] p-[1.25rem] w-2/4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:scale-[1.02] active:scale-[0.98]">
                            <div className="w-full flex justify-start items-center text-slate-400 group-hover:text-blue-500 transition-colors duration-300">
                                <Admin/>
                            </div>
                            <div className="w-full flex justify-start items-center font-bold mt-[0.75rem] text-slate-800 group-hover:text-blue-600 transition-colors duration-300" >Admin</div>
                            <div className="w-full flex justify-start items-center font-light text-xs text-slate-500 mt-1">Team Management</div>
                        </button>
                        <button className="group text-start rounded-xl border-slate-200 border-[0.1rem] p-[1.25rem] w-2/4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:scale-[1.02] active:scale-[0.98]">
                            <div className="w-full flex justify-start items-center text-slate-400 group-hover:text-blue-500 transition-colors duration-300">
                                <User/>
                            </div>
                            <div className="w-full flex justify-start items-center font-bold mt-[0.75rem] text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                                Sales User
                            </div>
                            <div className="w-full flex justify-start items-center font-light text-xs text-slate-500 mt-1">
                                Lead & Management
                            </div>
                        </button>
                    </div>
                </div>
                <div className="w-full mt-[2.25rem]">
                    <Button size="secondry" text="Create An Account" color="blue" textColor="white"/>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center mt-[1.5rem] gap-1 text-sm">
                    <div className="flex justify-center sm:justify-end items-center text-slate-500 font-medium">Have an Account?</div>
                    <button className="flex justify-center sm:justify-start items-center text-blue-500 font-semibold transition-all duration-300 hover:text-blue-600 hover:underline">SignIn</button>
                </div>
            </div>           
        </div>
    </>
}