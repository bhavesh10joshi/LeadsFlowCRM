import { Sidebar } from "../Components/SideBar/Sidebar"
import { Navbar } from "../Components/DasboardNavbar/DNavbar"
import { LeadProfileHeader } from "../Components/LeadDetails/LeadProfileHeader";
import { ContactInfoCard } from "../Components/LeadDetails/ContactInfoCard";
export function LeadDetailsDashboard() {
    return (
        <>
            <div className="w-full min-h-screen flex bg-slate-50 overflow-hidden animate-fade-in">
                <div className="hidden lg:block w-[18%] fixed h-screen z-20 shadow-sm">
                    <Sidebar />
                </div>
                <div className="w-full lg:w-[82%] lg:ml-[18%] p-4 md:p-[2rem] flex flex-col h-screen overflow-y-auto gap-6">
                    <div className="w-full">
                        <Navbar />
                    </div>
                    <div className="w-full">
                        <LeadProfileHeader />
                    </div>
                    <div className="w-full max-w-[24rem]">
                        <ContactInfoCard />
                    </div>
                </div>
            </div>
        </>
    );
}