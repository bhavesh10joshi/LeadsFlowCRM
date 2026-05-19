import { useEffect, useState, useRef } from "react"
import { Google } from "../Icons/Google"
import { GitHub } from "../Icons/Github"
import axios from "axios"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"
import { useNavigate } from "react-router-dom"
import { LoginValidations } from "../Validations/ZodValidations"

export function Login()
{
    const [ErrorState, SetErrorState] = useState(false);
    const [LoadingState, SetLoadingState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Network Error");
    const [WelcomeState, SetWelcomeState] = useState(false);

    const EmailRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);
    const Navigation = useNavigate();

    useEffect(() => {
        if (WelcomeState) {
            const timeout = setTimeout(() => {
                SetWelcomeState(false);
                Navigation("/LeadFlow/User/Dashboard");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [WelcomeState, Navigation]);

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
            email: EmailRef.current?.value,
            password: PasswordRef.current?.value
        };
        const Check: any = LoginValidations.safeParse(CurrentPara);
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
            email: EmailRef.current?.value,
            password: PasswordRef.current?.value
        };

        try {
            const result = await axios.post(`${VITE_BACKEND_URL}/LeadFlow/Api/User/Login`, payload);
            if (result.data.token) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                SetLoadingState(false);
                SetWelcomeState(true);
            } else {
                SetErrorDetail("Invalid credentials provided.");
                SetErrorState(true);
                SetLoadingState(false);
            }
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Authentication failed. Please check your credentials.");
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
                            <h3 className="text-lg font-bold text-gray-900">Login Failed</h3>
                            <p className="text-gray-600 font-mono text-sm">{typeof ErrorDetail === 'string' ? ErrorDetail : "Check your credentials"}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {WelcomeState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                <div className="bg-white p-10 rounded-xl shadow-2xl border-t-8 border-blue-500 max-w-md w-full mx-4 text-center transform animate-fade-in">
                    <div className="text-4xl mb-4">📊</div>
                    <h2 className="text-2xl font-bold text-blue-500 mb-2">Welcome back to LeadFlow</h2>
                    <p className="text-slate-600 font-mono">Your sales dashboard is ready. Redirecting...</p>
                </div>
            </div>
        )}

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
                                <input ref={EmailRef} placeholder="Josh@gmail.com" type="email" className="pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-black font-[0.8rem] font-mono h-[2.5rem] w-full bg-slate-50"/>
                            </div>
                        </div>
                        <div className="mt-[1rem]">
                            <div className="text-[0.8rem] font-bold text-slate-700">Password</div>
                            <div className="flex justify-center items-center w-full mt-[0.5rem]">
                                <input ref={PasswordRef} placeholder="••••••••" type="password" className="pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-black font-[0.8rem] font-mono h-[2.5rem] w-full bg-slate-50"/>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="w-full mt-[2rem] flex justify-center items-center">
                    <button
                        disabled={LoadingState}
                        className="flex justify-center items-center rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm tracking-wide text-white font-semibold w-full h-[3rem] px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        onClick={Validate}
                    >
                        {!LoadingState ? "Sign in to Dashboard" : (
                            <svg className="w-6 h-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 mt-[1.5rem]">
                <div className="text-[0.8rem] font-semibold text-slate-600 flex justify-center sm:justify-end items-center w-full sm:w-1/2">Don't have an Account!</div>
                <div className="flex justify-center sm:justify-start items-center w-full sm:w-1/2"><button className="text-[0.8rem] font-semibold text-blue-500 transition-all duration-300 hover:text-blue-600 hover:underline" onClick={() => Navigation("/LeadFlow/User/SignUp")}>Create An Account</button></div>
            </div>
        </div>
    </>
}