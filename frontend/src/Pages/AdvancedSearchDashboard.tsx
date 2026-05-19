import { Sidebar } from "../Components/SideBar/Sidebar"
import { SearchFilters } from "../Components/Search/SearchFilters"
import { SearchResultsTable } from "../Components/Search/SearchResultsTable"

export function AdvancedSearchDashboard()
{
    return<>
        <div className="w-full min-h-screen flex bg-slate-50 overflow-hidden animate-fade-in">
            <div className="hidden lg:block w-[18%] fixed h-screen z-20 shadow-sm">
                <Sidebar/>
            </div>
            <div className="w-full lg:w-[82%] lg:ml-[18%] p-4 md:p-[2rem] flex flex-col h-screen overflow-y-auto gap-6">
                <div className="w-full">
                    <SearchFilters />
                </div>
                <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <SearchResultsTable />
                </div>
            </div>
        </div>
    </>
}