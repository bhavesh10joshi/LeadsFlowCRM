export function ContactInfoCard() {
    return (
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm font-sans">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Contact Information</h2>
                <div className="text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-400 leading-none mb-1">Email</span>
                        <a href="mailto:j.vance@cloudpulse.io" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">j.vance@cloudpulse.io</a>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-400 leading-none mb-1">Phone</span>
                        <span className="text-sm font-semibold text-slate-700">+1 (555) 092-4412</span>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-400 leading-none mb-1">Location</span>
                        <span className="text-sm font-semibold text-slate-700">San Francisco, CA</span>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-400 leading-none mb-1">Website</span>
                        <a rel="noopener noreferrer" href="https://www.cloudpulse.io" target="_blank" className="text-sm font-semibold text-blue-600 hover:underline leading-normal">www.cloudpulse.io</a>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-slate-100 mt-6 pt-4"></div>
        </div>
    );
}