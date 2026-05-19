import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Sidebar } from "../Components/SideBar/Sidebar"
import axios from "axios"
import { VITE_BACKEND_URL } from "../BackendUrl/BackendUrl"

interface LeadDetail {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    company?: string;
    phone?: string;
    notes?: string;
    createdBy: { name: string; email: string };
    createdAt: string;
    updatedAt: string;
}

const statusStyles: Record<string, string> = {
    "new": "bg-blue-50 text-blue-600 border-blue-100",
    "qualified": "bg-orange-50 text-orange-600 border-orange-100",
    "contacted": "bg-indigo-50 text-indigo-600 border-indigo-100",
    "lost": "bg-red-50 text-red-600 border-red-100",
    "won": "bg-green-50 text-green-600 border-green-100"
};

export function LeadDetailsDashboard() {
    const { id } = useParams();
    const Navigation = useNavigate();
    const [lead, setLead] = useState<LeadDetail | null>(null);
    const [LoadingState, SetLoadingState] = useState(true);
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [EditLoading, SetEditLoading] = useState(false);
    const [SuccessState, SetSuccessState] = useState(false);
    const [DeleteLoading, SetDeleteLoading] = useState(false);

    const userRole = JSON.parse(localStorage.getItem("user") || "{}").role;

    useEffect(() => {
        FetchLead();
    }, [id]);

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

    async function FetchLead() {
        SetLoadingState(true);
        const token = localStorage.getItem("token");
        try {
            const result = await axios.get(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/Single/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLead(result.data.lead);
            SetLoadingState(false);
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Failed to load lead");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    async function HandleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetEditLoading(true);
        const token = localStorage.getItem("token");
        const form = e.currentTarget;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            const result = await axios.put(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/Update/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLead(result.data.lead);
            setIsEditOpen(false);
            SetSuccessState(true);
            SetEditLoading(false);
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Failed to update lead");
            SetErrorState(true);
            SetEditLoading(false);
        }
    }

    async function HandleDelete() {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        SetDeleteLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/Delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Navigation("/LeadFlow/User/Dashboard");
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Failed to delete lead");
            SetErrorState(true);
            SetDeleteLoading(false);
        }
    }

    if (LoadingState) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center animate-fade-in">
                    <svg className="w-10 h-10 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-slate-500 font-semibold">Loading lead details...</p>
                </div>
            </div>
        );
    }

    if (!lead) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center animate-fade-in">
                    <div className="bg-slate-100 p-4 rounded-full mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Lead not found</h3>
                    <button onClick={() => Navigation("/LeadFlow/User/Dashboard")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">Back to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <>
            {ErrorState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                    <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-red-500 max-w-md w-full mx-4 transform animate-fade-in">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-full"><svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                            <div><h3 className="text-lg font-bold text-gray-900">Error</h3><p className="text-gray-600 font-mono text-sm">{ErrorDetail}</p></div>
                        </div>
                    </div>
                </div>
            )}
            {SuccessState && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                    <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-green-500 max-w-md w-full mx-4 transform animate-fade-in">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full"><svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
                            <div><h3 className="text-lg font-bold text-gray-900">Updated!</h3><p className="text-gray-600 font-mono text-sm">Lead updated successfully.</p></div>
                        </div>
                    </div>
                </div>
            )}

            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg font-bold text-slate-900">Edit Lead Details</h3>
                            <button aria-label="Close" onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                        <form onSubmit={HandleEdit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs font-bold text-slate-700">Full Name</label><input aria-label="name" name="name" type="text" defaultValue={lead.name} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" /></div>
                                <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Email</label><input aria-label="name" name="email" type="email" defaultValue={lead.email} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" /></div>
                                <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Phone</label><input aria-label="name" name="phone" type="text" defaultValue={lead.phone || ""} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" /></div>
                                <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Status</label><select aria-label="name" name="status" defaultValue={lead.status} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="lost">Lost</option><option value="won">Won</option></select></div>
                                <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-slate-700">Source</label><select aria-label="name" name="source" defaultValue={lead.source} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"><option value="website">Website</option><option value="referral">Referral</option><option value="linkedin">LinkedIn</option><option value="cold-call">Cold Call</option><option value="advertisement">Advertisement</option><option value="other">Other</option></select></div>
                                <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs font-bold text-slate-700">Company</label><input aria-label="name" name="company" type="text" defaultValue={lead.company || ""} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" /></div>
                                <div className="flex flex-col gap-1.5 sm:col-span-2"><label className="text-xs font-bold text-slate-700">Notes</label><textarea aria-label="name" name="notes" defaultValue={lead.notes || ""} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none" /></div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 h-10 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                                <button type="submit" disabled={EditLoading} className="px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/10 transition-colors disabled:opacity-50 flex items-center gap-2">
                                    {EditLoading && <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="w-full min-h-screen flex bg-slate-50 overflow-hidden animate-fade-in">
                <div className="hidden lg:block w-[18%] fixed h-screen z-20 shadow-sm"><Sidebar /></div>
                <div className="w-full lg:w-[82%] lg:ml-[18%] p-4 md:p-[2rem] flex flex-col h-screen overflow-y-auto gap-6">
                    <div className="w-full">
                        <button onClick={() => Navigation("/LeadFlow/User/Dashboard")} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500 font-semibold mb-4 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Back to Dashboard
                        </button>
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xl shadow-sm">{lead.name.split(" ").map(n => n[0]).join("")}</div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{lead.name}</h1>
                                <p className="text-sm font-medium text-slate-500 mt-0.5">{lead.company || "No company"}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border uppercase ${statusStyles[lead.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>{lead.status}</span>
                                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-bold tracking-wide capitalize">{lead.source.replace("-", " ")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button onClick={() => setIsEditOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-4 h-10 rounded-xl transition-all duration-200 active:scale-[0.98]">
                                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                Edit Lead
                            </button>
                            {userRole === "admin" && (
                                <button onClick={HandleDelete} disabled={DeleteLoading} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 h-10 rounded-xl shadow-md shadow-red-500/10 transition-all duration-200 active:scale-[0.98] disabled:opacity-50">
                                    {DeleteLoading && <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    Delete Lead
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="w-full max-w-[24rem]">
                        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-base font-bold text-slate-900 tracking-tight mb-6">Contact Information</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                                    <div className="flex flex-col"><span className="text-xs font-medium text-slate-400 leading-none mb-1">Email</span><span className="text-sm font-semibold text-slate-700">{lead.email}</span></div>
                                </div>
                                {lead.phone && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                                        <div className="flex flex-col"><span className="text-xs font-medium text-slate-400 leading-none mb-1">Phone</span><span className="text-sm font-semibold text-slate-700">{lead.phone}</span></div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                                    <div className="flex flex-col"><span className="text-xs font-medium text-slate-400 leading-none mb-1">Created</span><span className="text-sm font-semibold text-slate-700">{new Date(lead.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span></div>
                                </div>
                                {lead.createdBy && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                                        <div className="flex flex-col"><span className="text-xs font-medium text-slate-400 leading-none mb-1">Created By</span><span className="text-sm font-semibold text-slate-700">{lead.createdBy.name}</span></div>
                                    </div>
                                )}
                            </div>
                            {lead.notes && (
                                <>
                                    <div className="border-t border-slate-100 mt-6 pt-4"></div>
                                    <h3 className="text-sm font-bold text-slate-700 mb-2">Notes</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{lead.notes}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}