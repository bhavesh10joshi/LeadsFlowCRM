import { useState } from "react";

interface SearchResult {
    id: string;
    name: string;
    email: string;
    status: "QUALIFIED" | "CONTACTED" | "NEW LEAD" | "NURTURING";
    score: number;
    company: string;
    agent: string;
}

const initialResults: SearchResult[] = [
    { id: "1", name: "Jonathan Smith", email: "jonathan.s@techflow.io", status: "QUALIFIED", score: 94, company: "TechFlow Systems", agent: "Sarah Jenkins" },
    { id: "2", name: "Elena Rodriguez", email: "elena@urbanrealestate.com", status: "CONTACTED", score: 62, company: "Urban Real Estate", agent: "Michael Chen" },
    { id: "3", name: "Marcus Bennett", email: "m.bennett@healthhub.org", status: "NEW LEAD", score: 12, company: "HealthHub Group", agent: "Unassigned" },
    { id: "4", name: "Linda Wu", email: "linda@skylineai.co", status: "NURTURING", score: 88, company: "Skyline AI", agent: "Amanda Ross" },
    { id: "5", name: "David Kim", email: "dkim@globaltrade.net", status: "QUALIFIED", score: 91, company: "Global Trade Corp", agent: "Sarah Jenkins" }
];

const statusStyles = {
    "QUALIFIED": "bg-orange-50 text-orange-600 border-orange-100",
    "CONTACTED": "bg-blue-50 text-blue-600 border-blue-100",
    "NEW LEAD": "bg-indigo-50 text-indigo-600 border-indigo-100",
    "NURTURING": "bg-slate-100 text-slate-600 border-slate-200"
};

export function SearchResultsTable() {
    const [results] = useState<SearchResult[]>(initialResults);

    return (
        <div className="w-full flex flex-col h-full justify-between font-sans">
            <div className="p-4 flex flex-row justify-between items-center gap-3 border-b border-slate-100 bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">Search Results</span>
                    <span className="bg-blue-50 text-blue-600 font-semibold text-xs px-2 py-0.5 rounded-full">1,248 Records</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <button aria-label="name" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <button aria-label="name" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-[0.725rem] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/20">
                            <th className="py-3.5 px-6">Lead Name</th>
                            <th className="py-3.5 px-6">Status</th>
                            <th className="py-3.5 px-6">Score</th>
                            <th className="py-3.5 px-6">Company</th>
                            <th className="py-3.5 px-6">Agent</th>
                            <th className="py-3.5 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {results.map((result) => (
                            <tr key={result.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                                <td className="py-3.5 px-6 font-semibold text-slate-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shadow-sm">
                                            {result.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-slate-900 leading-none mb-0.5">{result.name}</span>
                                            <span className="text-xs font-normal text-slate-400">{result.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3.5 px-6">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold tracking-wide border uppercase ${statusStyles[result.status]}`}>
                                        {result.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-6 font-bold text-blue-600">{result.score}</td>
                                <td className="py-3.5 px-6 text-slate-500 font-medium">{result.company}</td>
                                <td className="py-3.5 px-6 text-slate-600 font-medium">{result.agent}</td>
                                <td className="py-3.5 px-6">
                                    <div className="flex items-center justify-center gap-3">
                                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Quick View</button>
                                        <button aria-label="name" className="text-slate-400 hover:text-slate-600 transition-colors">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 bg-slate-50/30 text-xs font-semibold text-slate-500">
                <div>Showing 1 to 5 of 1,248 results</div>
                <div className="flex items-center gap-1.5">
                    <button aria-label="Previous Page" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-50 transition-colors" disabled>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-sm shadow-blue-500/10">1</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">3</button>
                    <span className="px-1 text-slate-400">...</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">250</button>
                    <button aria-label="Next Page" className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}