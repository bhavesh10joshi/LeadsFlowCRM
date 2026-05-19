import { useState } from "react";

interface Lead {
    id: string;
    name: string;
    email: string;
    status: "NEW" | "QUALIFIED" | "CONTACTED" | "NURTURING";
    source: string;
    createdAt: string;
}

const initialLeads: Lead[] = [
    { id: "1", name: "Alex Smith", email: "alex.smith@example.com", status: "NEW", source: "Organic Search", createdAt: "Oct 24, 2023" },
    { id: "2", name: "Sarah Johnson", email: "sarah.j@techcorp.io", status: "QUALIFIED", source: "Referral", createdAt: "Oct 23, 2023" },
    { id: "3", name: "Michael Tang", email: "m.tang@global.net", status: "CONTACTED", source: "Paid Ads", createdAt: "Oct 22, 2023" },
    { id: "4", name: "Elena Lopez", email: "elena.l@startup.com", status: "NEW", source: "Organic Search", createdAt: "Oct 22, 2023" },
    { id: "5", name: "David Brown", email: "david.brown@logistics.com", status: "NURTURING", source: "Direct", createdAt: "Oct 21, 2023" }
];

const statusStyles = {
    NEW: "bg-blue-50 text-blue-600 border-blue-100",
    QUALIFIED: "bg-orange-50 text-orange-600 border-orange-100",
    CONTACTED: "bg-indigo-50 text-indigo-600 border-indigo-100",
    NURTURING: "bg-slate-100 text-slate-600 border-slate-200"
};

export function LeadsTable() {
    const [leads] = useState<Lead[]>(initialLeads);

    return (
        <div className="w-full flex flex-col h-full justify-between font-sans">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
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
                            <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors duration-200 group">
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
                                    <span className={`px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold tracking-wide border uppercase ${statusStyles[lead.status]}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-6 text-slate-600 font-medium">{lead.source}</td>
                                <td className="py-3.5 px-6 text-slate-400 font-medium">{lead.createdAt}</td>
                                <td className="py-3.5 px-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button aria-label="name" className="p-1 text-slate-400 hover:text-blue-500 rounded-md hover:bg-blue-50 transition-all duration-200">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        <button aria-label="name" className="p-1 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-all duration-200">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 bg-slate-50/30 text-xs font-semibold text-slate-500">
                <div>Showing 1 to 5 of 1,284 leads</div>
                <div className="flex items-center gap-1.5">
                    <button aria-label="name" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-50 transition-colors" disabled>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-sm shadow-blue-500/10">1</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">3</button>
                    <span className="px-1 text-slate-400">...</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">257</button>
                    <button aria-label="name" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}