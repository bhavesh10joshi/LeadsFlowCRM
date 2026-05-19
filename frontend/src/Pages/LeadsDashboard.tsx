import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Sidebar } from "../Components/SideBar/Sidebar"
import { Navbar } from "../Components/DasboardNavbar/DNavbar"
import { LeadsTable } from "../Components/Leads/LeadsTable"
import axios from "axios"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"

export function LeadsDashboard()
{
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [CreateLoading, SetCreateLoading] = useState(false);
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("");
    const [SuccessState, SetSuccessState] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const NameRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const StatusRef = useRef<HTMLSelectElement>(null);
    const SourceRef = useRef<HTMLSelectElement>(null);
    const CompanyRef = useRef<HTMLInputElement>(null);
    const PhoneRef = useRef<HTMLInputElement>(null);
    const NotesRef = useRef<HTMLTextAreaElement>(null);
    const Navigation = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        if (ErrorState) {
            const timer = setTimeout(() => SetErrorState(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [ErrorState]);

    useEffect(() => {
        if (SuccessState) {
            const timer = setTimeout(() => SetSuccessState(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [SuccessState]);

    async function HandleCreateLead() {
        SetCreateLoading(true);
        const token = localStorage.getItem("token");
        const payload = {
            name: NameRef.current?.value,
            email: EmailRef.current?.value,
            status: StatusRef.current?.value,
            source: SourceRef.current?.value,
            company: CompanyRef.current?.value,
            phone: PhoneRef.current?.value,
            notes: NotesRef.current?.value
        };

        if (!payload.name || !payload.email) {
            SetErrorDetail("Name and Email are required");
            SetErrorState(true);
            SetCreateLoading(false);
            return;
        }

        try {
            await axios.post(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/New`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            SetCreateLoading(false);
            setIsCreateOpen(false);
            SetSuccessState(true);
            setRefreshKey(prev => prev + 1);
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Failed to create lead");
            SetErrorState(true);
            SetCreateLoading(false);
        }
    }

    return<>
        {ErrorState && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-red-500 max-w-md w-full mx-4 transform animate-fade-in">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Error</h3>
                            <p className="text-gray-600 font-mono text-sm">{ErrorDetail}</p>
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
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Lead Created!</h3>
                            <p className="text-gray-600 font-mono text-sm">New lead added successfully.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {isCreateOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-lg font-bold text-slate-900">Create New Lead</h3>
                        <button aria-label="Close" onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-xs font-bold text-slate-700">Name *</label>
                            <input ref={NameRef} type="text" placeholder="John Doe" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-xs font-bold text-slate-700">Email *</label>
                            <input ref={EmailRef} type="email" placeholder="john@example.com" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700">Status</label>
                            <select aria-label="name" ref={StatusRef} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="lost">Lost</option>
                                <option value="won">Won</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700">Source</label>
                            <select aria-label="name" ref={SourceRef} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors">
                                <option value="website">Website</option>
                                <option value="referral">Referral</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="cold-call">Cold Call</option>
                                <option value="advertisement">Advertisement</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700">Company</label>
                            <input ref={CompanyRef} type="text" placeholder="Acme Corp" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-700">Phone</label>
                            <input ref={PhoneRef} type="text" placeholder="+1 234 567 890" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label className="text-xs font-bold text-slate-700">Notes</label>
                            <textarea ref={NotesRef} placeholder="Additional notes..." rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                        <button onClick={() => setIsCreateOpen(false)} className="px-4 h-10 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                        <button onClick={HandleCreateLead} disabled={CreateLoading} className="px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/10 transition-colors disabled:opacity-50 flex items-center gap-2">
                            {CreateLoading && (
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            )}
                            Create Lead
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="w-full min-h-screen flex bg-slate-50 overflow-hidden animate-fade-in">
            <div className="hidden lg:block w-[18%] fixed h-screen z-20 shadow-sm">
                <Sidebar/>
            </div>
            <div className="w-full lg:w-[82%] lg:ml-[18%] p-4 md:p-[2rem] flex flex-col h-screen overflow-y-auto">
                <div className="w-full">
                    <Navbar onSearch={setSearchTerm} onStatusFilter={setStatusFilter} onSourceFilter={setSourceFilter}/>
                </div>
                <div className="h-[0.1rem] bg-slate-200/60 rounded-md w-full mt-[1.5rem]"></div>
                <div className="w-full mt-[1.5rem] flex flex-col flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full mb-6">
                        <div className="place-content-start">
                            <div className="font-bold text-slate-900 text-[1.75rem] md:text-[2rem] tracking-tight">Leads Dashboard</div>
                            <div className="font-medium text-slate-500 text-sm md:text-base mt-1">Manage and track your sales opportunities across all stages.</div>
                        </div>
                        <div className="flex justify-end items-center w-full sm:w-auto">
                            <button onClick={() => setIsCreateOpen(true)} className="flex justify-center items-center rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm tracking-wide text-white font-semibold w-full md:w-[9rem] h-[2.5rem] px-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-lg shadow-blue-500/20">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                    <span>New Lead</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden" key={refreshKey}>
                        <LeadsTable searchTerm={debouncedSearch} statusFilter={statusFilter} sourceFilter={sourceFilter} onViewLead={(id) => Navigation(`/LeadFlow/User/Lead/${id}`)} />
                    </div>
                </div>
            </div>
        </div>
    </>
}