export function SearchFilters() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex justify-between items-center w-full mb-6">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Advanced Search</h2>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" /></svg>
                    Reset All Filters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Name</label>
                    <input type="text" placeholder="Enter name..." className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Email</label>
                    <input type="email" placeholder="Enter email..." className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Source</label>
                    <input type="text" placeholder="e.g., LinkedIn, Referral" className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Sort By</label>
                    <div className="relative">
                        <select aria-label="name" className="w-full h-10 pl-3 pr-8 appearance-none rounded-lg border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200">
                            <option>Latest First</option>
                            <option>Oldest First</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end w-full mt-5">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-5 h-10 rounded-lg shadow-md shadow-blue-500/10 transition-all duration-200 transform active:scale-[0.98]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    Search Records
                </button>
            </div>
        </div>
    );
}