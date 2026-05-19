import { Sidebar } from "../Components/SideBar/Sidebar"
import { Navbar } from "../Components/DasboardNavbar/DNavbar"
import { Button } from "../Components/UI/Buttons"
import { LeadsTable } from "../Components/Leads/LeadsTable"

export function LeadsDashboard()
{
    return<>
        <div className="w-full min-h-screen flex bg-slate-50 overflow-hidden animate-fade-in">
            <div className="hidden lg:block w-[18%] fixed h-screen z-20 shadow-sm">
                <Sidebar/>
            </div>
            <div className="w-full lg:w-[82%] lg:ml-[18%] p-4 md:p-[2rem] flex flex-col h-screen overflow-y-auto">
                <div className="w-full">
                    <Navbar/>
                </div>
                <div className="h-[0.1rem] bg-slate-200/60 rounded-md w-full mt-[1.5rem]"></div>
                <div className="w-full mt-[1.5rem] flex flex-col flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full mb-6">
                        <div className="place-content-start">
                            <div className="font-bold text-slate-900 text-[1.75rem] md:text-[2rem] tracking-tight">Leads Dashboard</div>
                            <div className="font-medium text-slate-500 text-sm md:text-base mt-1">Manage and track your sales opportunities across all stages.</div>
                        </div>
                        <div className="flex justify-end items-center w-full sm:w-auto">
                            <Button size="middle" text="New Lead" color="blue" textColor="white"/>
                        </div>
                    </div>
                    <div className="flex-grow w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <LeadsTable />
                    </div>
                </div>
            </div>
        </div>
    </>
}