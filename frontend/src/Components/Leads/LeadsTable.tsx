import { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../BackendUrl/BackendUrl";

interface Lead {
    _id: string;
    name: string;
    email: string;
    status: "new" | "contacted" | "qualified" | "lost" | "won";
    source: string;
    createdAt: string;
}

interface Pagination {
    total: number;
    page: number;
    pages: number;
    limit: number;
}

const statusStyles: Record<string, string> = {
    "new": "bg-blue-50 text-blue-600 border-blue-100",
    "qualified": "bg-orange-50 text-orange-600 border-orange-100",
    "contacted": "bg-indigo-50 text-indigo-600 border-indigo-100",
    "lost": "bg-red-50 text-red-600 border-red-100",
    "won": "bg-green-50 text-green-600 border-green-100"
};

interface LeadsTableProps {
    searchTerm: string;
    statusFilter: string;
    sourceFilter: string;
    onViewLead: (id: string) => void;
}

export function LeadsTable({ searchTerm, statusFilter, sourceFilter, onViewLead }: LeadsTableProps) {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, pages: 0, limit: 10 });
    const [LoadingState, SetLoadingState] = useState(true);
    const [ErrorState, SetErrorState] = useState(false);
    const [ErrorDetail, SetErrorDetail] = useState("Failed to load leads");
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
    const [isExporting, setIsExporting] = useState(false);
    const [DeleteLoadingId, SetDeleteLoadingId] = useState<string | null>(null);

    const userRole = JSON.parse(localStorage.getItem("user") || "{}").role;

    useEffect(() => {
        FetchLeads(1);
    }, [searchTerm, statusFilter, sourceFilter, sortOrder]);

    async function FetchLeads(page: number) {
        SetLoadingState(true);
        SetErrorState(false);
        const token = localStorage.getItem("token");

        try {
            const params: Record<string, string | number> = {
                page: page,
                sortBy: "createdAt",
                sortOrder: sortOrder
            };
            if (searchTerm) params.search = searchTerm;
            if (statusFilter) params.status = statusFilter;
            if (sourceFilter) params.source = sourceFilter;

            const result = await axios.get(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/All`, {
                headers: { Authorization: `Bearer ${token}` },
                params
            });

            setLeads(result.data.leads);
            setPagination(result.data.pagination);
            SetLoadingState(false);
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Failed to load leads");
            SetErrorState(true);
            SetLoadingState(false);
        }
    }

    async function HandleDelete(id: string) {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;
        SetDeleteLoadingId(id);
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/Delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            FetchLeads(pagination.page);
        } catch (e: any) {
            SetErrorDetail(e.response?.data?.msg || "Failed to delete lead");
            SetErrorState(true);
        } finally {
            SetDeleteLoadingId(null);
        }
    }

    async function HandleExport() {
        setIsExporting(true);
        const token = localStorage.getItem("token");
        try {
            const params: Record<string, string> = {};
            if (searchTerm) params.search = searchTerm;
            if (statusFilter) params.status = statusFilter;
            if (sourceFilter) params.source = sourceFilter;
            params.sortBy = "createdAt";
            params.sortOrder = sortOrder;

            const result = await axios.get(`${VITE_BACKEND_URL}/LeadFlow/Api/Lead/Export/CSV`, {
                headers: { Authorization: `Bearer ${token}` },
                params,
                responseType: "blob"
            });
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "leads-export.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            SetErrorDetail("Failed to export CSV");
            SetErrorState(true);
        } finally {
            setIsExporting(false);
        }
    }

    function GoToPage(page: number) {
        if (page < 1 || page > pagination.pages) return;
        FetchLeads(page);
    }

    function RenderPaginationButtons() {
        const buttons = [];
        const { page, pages } = pagination;
        const maxVisible = 5;

        if (pages <= maxVisible) {
            for (let i = 1; i <= pages; i++) buttons.push(i);
        } else {
            buttons.push(1);
            if (page > 3) buttons.push("...");
            const start = Math.max(2, page - 1);
            const end = Math.min(pages - 1, page + 1);
            for (let i = start; i <= end; i++) buttons.push(i);
            if (page < pages - 2) buttons.push("...");
            buttons.push(pages);
        }
        return buttons;
    }

    if (ErrorState) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{ErrorDetail}</h3>
                <button onClick={() => FetchLeads(1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">Try Again</button>
            </div>
        );
    }

    if (LoadingState) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <svg className="w-10 h-10 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-slate-500 font-semibold">Loading leads...</p>
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-700">No leads found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or create a new lead.</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col h-full justify-between font-sans">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <button onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                        {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                    </button>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button onClick={HandleExport} disabled={isExporting} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50">
                        {isExporting ? (
                            <svg className="w-4 h-4 animate-spin text-slate-500" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        )}
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-[0.75rem] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30">
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Source</th>
                            <th className="py-3 px-6">Created At</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80 text-sm text-slate-700">
                        {leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-slate-50/60 transition-colors duration-200 group">
                                <td className="py-3.5 px-6 font-semibold text-slate-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-blue-500/10">
                                            {lead.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        {lead.name}
                                    </div>
                                </td>
                                <td className="py-3.5 px-6 text-slate-500 font-medium">{lead.email}</td>
                                <td className="py-3.5 px-6">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wide border uppercase ${statusStyles[lead.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-6 text-slate-600 font-medium capitalize">{lead.source.replace("-", " ")}</td>
                                <td className="py-3.5 px-6 text-slate-400 font-medium">{new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                <td className="py-3.5 px-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button aria-label="View lead" onClick={() => onViewLead(lead._id)} className="p-1 text-slate-400 hover:text-blue-500 rounded-md hover:bg-blue-50 transition-all duration-200">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        </button>
                                        <button aria-label="Edit lead" className="p-1 text-slate-400 hover:text-blue-500 rounded-md hover:bg-blue-50 transition-all duration-200">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        {userRole === "admin" && (
                                            <button aria-label="Delete lead" onClick={() => HandleDelete(lead._id)} disabled={DeleteLoadingId === lead._id} className="p-1 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-all duration-200 disabled:opacity-50">
                                                {DeleteLoadingId === lead._id ? (
                                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 bg-slate-50/30 text-xs font-semibold text-slate-500">
                <div>Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} leads</div>
                <div className="flex items-center gap-1.5">
                    <button aria-label="Previous page" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-50 transition-colors" disabled={pagination.page === 1} onClick={() => GoToPage(pagination.page - 1)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {RenderPaginationButtons().map((pageNum, index) => (
                        <button key={index} onClick={() => typeof pageNum === "number" ? GoToPage(pageNum) : undefined} disabled={pageNum === "..."} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${pageNum === pagination.page ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10" : pageNum === "..." ? "text-slate-400 cursor-default" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                            {pageNum}
                        </button>
                    ))}
                    <button aria-label="Next page" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 disabled:opacity-50 transition-colors" disabled={pagination.page === pagination.pages} onClick={() => GoToPage(pagination.page + 1)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}