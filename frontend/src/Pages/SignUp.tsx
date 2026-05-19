import { useEffect, useState, useRef } from "react"
import { Admin } from "../Icons/Admin"
import { User } from "../Icons/User"
import axios from "axios"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"
import { useNavigate } from "react-router-dom"
import { SignUpValidations } from "../Validations/ZodValidations"

export function SignUp()
{
    const [ErrorState, SetErrorState] = useState(false);
    const [LoadingState, SetLoadingState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error");
    const [SuccessState, SetSuccessState] = useState(false);
    const [SelectedRole, SetSelectedRole] = useState<"admin" | "sales">("sales");

    const NameRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);
    const Navigation = useNavigate();

    useEffect(() => {
        if (SuccessState) {
            const timeout = setTimeout(() => {
                SetSuccessState(false);
                Navigation("/LeadFlow/User/Login");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [SuccessState, Navigation]);

    useEffect(() => {
        if (ErrorState) {
            const timer = setTimeout(() => {
                SetErrorState(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ErrorState]);

    async function Validate() {
        const CurrentPara = {
            name: NameRef.current?.value,
            email: EmailRef.current?.value,
            password: PasswordRef.current?.value
        };
        const Check: any = SignUpValidations.safeParse(CurrentPara);
        if (Check.success) {
            BackendCall();
        } else {
            const msg = Check.error.issues[0]?.message || "Validation Error";
            SetErrorDetail(msg);
            SetErrorState(true);
        }
    }

    async function BackendCall() {
        SetLoadingState(true);
        const payload = {
            name: NameRef.current?.value,
            email: EmailRef.current?.value,
            password: PasswordRef.current?.value,
            role: SelectedRole
        };
        try {
            const result = await axios.post(`${VITE_BACKEND_URL}/LeadFlow/Api/User/Register`, payload);
            if (result) {
                SetLoadingState(false);
                SetSuccessState(true);
            } else {
                SetErrorDetail("Network Error: Could not connect to server");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Network Error: Could not connect to server");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    return<>
        {ErrorState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-red-500 max-w-md w-full mx-4 transform animate-fade-in">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Something went wrong</h3>
                            <p className="text-gray-600 font-mono text-sm">{typeof ErrorDetail === 'string' ? ErrorDetail : "Check your inputs"}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {SuccessState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-green-500 max-w-md w-full mx-4 transform animate-fade-in">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Success!</h3>
                            <p className="text-gray-600 font-mono text-sm">Account created successfully. Redirecting to login...</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

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
                        <input ref={NameRef} placeholder="Bhavesh Joshi" type="text" className="pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-black font-[0.8rem] font-mono h-[2.5rem] w-full bg-slate-50"/>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center flex-col mt-[1.25rem]">
                    <div className="flex justify-start items-center w-full font-semibold text-sm text-slate-700">Email Address</div>
                    <div className="flex justify-start items-center w-full mt-[0.5rem]">
                        <input ref={EmailRef} placeholder="Josh@gmail.com" type="email" className="pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-black font-[0.8rem] font-mono h-[2.5rem] w-full bg-slate-50"/>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center flex-col mt-[1.25rem]">
                    <div className="w-full flex justify-start items-center font-semibold text-sm text-slate-700">Password</div>
                    <div className="w-full flex justify-start items-center mt-[0.5rem]">
                        <input ref={PasswordRef} placeholder="••••••••" type="password" className="pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-black font-[0.8rem] font-mono h-[2.5rem] w-full bg-slate-50"/>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center flex-col mt-[1.25rem]">
                    <div className="w-full flex justify-start items-center font-semibold text-sm text-slate-700">Select Your Role</div>
                    <div className="w-full flex flex-row justify-start items-center mt-[0.5rem] gap-4">
                        <button onClick={() => SetSelectedRole("admin")} className={`group text-start rounded-xl border-[0.1rem] p-[1.25rem] w-2/4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/30 hover:scale-[1.02] active:scale-[0.98] ${SelectedRole === "admin" ? "border-blue-500 bg-blue-50/30 ring-2 ring-blue-100" : "border-slate-200"}`}>
                            <div className={`w-full flex justify-start items-center transition-colors duration-300 ${SelectedRole === "admin" ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500"}`}>
                                <Admin/>
                            </div>
                            <div className={`w-full flex justify-start items-center font-bold mt-[0.75rem] transition-colors duration-300 ${SelectedRole === "admin" ? "text-blue-600" : "text-slate-800 group-hover:text-blue-600"}`}>Admin</div>
                            <div className="w-full flex justify-start items-center font-light text-xs text-slate-500 mt-1">Team Management</div>
                        </button>
                        <button onClick={() => SetSelectedRole("sales")} className={`group text-start rounded-xl border-[0.1rem] p-[1.25rem] w-2/4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/30 hover:scale-[1.02] active:scale-[0.98] ${SelectedRole === "sales" ? "border-blue-500 bg-blue-50/30 ring-2 ring-blue-100" : "border-slate-200"}`}>
                            <div className={`w-full flex justify-start items-center transition-colors duration-300 ${SelectedRole === "sales" ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500"}`}>
                                <User/>
                            </div>
                            <div className={`w-full flex justify-start items-center font-bold mt-[0.75rem] transition-colors duration-300 ${SelectedRole === "sales" ? "text-blue-600" : "text-slate-800 group-hover:text-blue-600"}`}>
                                Sales User
                            </div>
                            <div className="w-full flex justify-start items-center font-light text-xs text-slate-500 mt-1">
                                Lead & Management
                            </div>
                        </button>
                    </div>
                </div>
                <div className="w-full mt-[2.25rem]">
                    <button
                        disabled={LoadingState}
                        className="flex justify-center items-center rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm tracking-wide text-white font-semibold w-full h-[3rem] px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        onClick={Validate}
                    >
                        {!LoadingState ? "Create An Account" : (
                            <svg className="w-6 h-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </button>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center mt-[1.5rem] gap-1 text-sm">
                    <div className="flex justify-center sm:justify-end items-center text-slate-500 font-medium">Have an Account?</div>
                    <button className="flex justify-center sm:justify-start items-center text-blue-500 font-semibold transition-all duration-300 hover:text-blue-600 hover:underline" onClick={() => Navigation("/LeadFlow/User/Login")}>SignIn</button>
                </div>
            </div>
        </div>
    </>
}