import { Button } from "../UI/Buttons"

export function Sidebar()
{
    return<>
        <div className="w-full p-6 bg-slate-900 text-slate-400 h-full flex flex-col justify-between border-r border-slate-800">
            <div className="w-full">
                <div className="text-white text-[1.5rem] font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]">LeadFlowCRM</div>
                <div className="font-semibold text-xs tracking-wider text-blue-400 uppercase mt-1">Sales Intelligence</div>
                
                <div className="mt-12 flex flex-col gap-3">
                    <Button size="secondry" text="Leads" color="blue" textColor="white"/>
                    <Button size="secondry" text="Settings" color="blue" textColor="white"/>
                </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-auto">
                <div className="border-t border-slate-800 my-2"></div>
                <button className="w-full h-[3rem] px-4 flex items-center rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-slate-800 hover:text-white text-slate-400 gap-3">
                    <span>Help Support</span>
                </button>
                <button className="w-full h-[3rem] px-4 flex items-center rounded-xl font-semibold text-sm transition-all duration-200 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white gap-3">
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    </>
}