import { useNavigate, useLocation } from "react-router-dom"

export function Sidebar()
{
    const Navigation = useNavigate();
    const Location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    function HandleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Navigation("/LeadFlow/User/Login");
    }

    const isActive = (path: string) => Location.pathname === path;

    return<>
        <div className="w-full p-6 bg-slate-900 text-slate-400 h-full flex flex-col justify-between border-r border-slate-800">
            <div className="w-full">
                <div className="text-white text-[1.5rem] font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]">LeadFlowCRM</div>
                <div className="font-semibold text-xs tracking-wider text-blue-400 uppercase mt-1">Sales Intelligence</div>

                <div className="mt-12 flex flex-col gap-2">
                    <button
                        onClick={() => Navigation("/LeadFlow/User/Dashboard")}
                        className={`w-full h-[3rem] px-4 flex items-center rounded-xl font-semibold text-sm transition-all duration-200 gap-3 ${isActive("/LeadFlow/User/Dashboard") ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        <span>Leads</span>
                    </button>
                </div>

                {user.name && (
                    <div className="mt-8 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                                {user.name?.split(" ").map((n: string) => n[0]).join("")}
                            </div>
                            <div>
                                <div className="text-white text-sm font-semibold leading-tight">{user.name}</div>
                                <div className="text-slate-500 text-xs capitalize">{user.role}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
                <div className="border-t border-slate-800 my-2"></div>
                <button className="w-full h-[3rem] px-4 flex items-center rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-slate-800 hover:text-white text-slate-400 gap-3">
                    <span>Help Support</span>
                </button>
                <button onClick={HandleLogout} className="w-full h-[3rem] px-4 flex items-center rounded-xl font-semibold text-sm transition-all duration-200 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white gap-3">
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    </>
}