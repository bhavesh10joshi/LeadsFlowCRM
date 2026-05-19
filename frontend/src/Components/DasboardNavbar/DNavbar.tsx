import { useState } from "react"

interface NavbarProps {
    onSearch: (term: string) => void;
    onStatusFilter: (status: string) => void;
    onSourceFilter: (source: string) => void;
}

export function Navbar({ onSearch, onStatusFilter, onSourceFilter }: NavbarProps){
    const [showFilters, setShowFilters] = useState(false);

    return<>
        <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-4 items-center w-full bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex-grow">
                    <div className="w-full relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200 ml-[-0.5rem]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <div className="pl-7 w-full">
                            <input
                                placeholder="Search by name or email..."
                                type="text"
                                onChange={(e) => onSearch(e.target.value)}
                                className="pl-[0.75rem] pr-[0.75rem] flex justify-center items-center rounded-lg border-[0.1rem] border-slate-300 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 ease-in-out text-black font-[0.8rem] font-mono h-[2.5rem] w-full bg-slate-50"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex justify-center items-center rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm tracking-wide font-semibold w-full h-[2.5rem] px-4 ${showFilters ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                            <span>Filters</span>
                        </div>
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm animate-fade-in">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-xs font-bold text-slate-500">Status</label>
                        <select aria-label="name" onChange={(e) => onStatusFilter(e.target.value)} className="h-9 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors bg-slate-50">
                            <option value="">All Statuses</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="lost">Lost</option>
                            <option value="won">Won</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-xs font-bold text-slate-500">Source</label>
                        <select aria-label="name" onChange={(e) => onSourceFilter(e.target.value)} className="h-9 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors bg-slate-50">
                            <option value="">All Sources</option>
                            <option value="website">Website</option>
                            <option value="referral">Referral</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="cold-call">Cold Call</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    </>
}