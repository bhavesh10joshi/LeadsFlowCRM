import { useState } from "react";

export function LeadProfileHeader() {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm font-sans">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xl overflow-hidden shadow-sm">
                    JV
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Jordan Vance</h1>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">VP of Engineering at CloudPulse Systems</p>
                    <div className="flex gap-2 mt-2">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold tracking-wide uppercase">Qualified</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                    onClick={() => setIsEditOpen(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-4 h-10 rounded-xl transition-all duration-200 transform active:scale-[0.98]"
                >
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    Edit Lead
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold text-sm px-4 h-10 rounded-xl shadow-md shadow-red-500/10 transition-all duration-200 transform active:scale-[0.98]">
                    Delete Lead
                </button>
            </div>

            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 transform scale-100 transition-all duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg font-bold text-slate-900">Edit Lead Details</h3>
                            <button aria-label="name" onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" /></svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label htmlFor="modal-full-name" className="text-xs font-bold text-slate-700">Full Name</label>
                                <input 
                                    id="modal-full-name"
                                    type="text" 
                                    defaultValue="Jordan Vance" 
                                    placeholder="Enter full name"
                                    title="Full Name"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 sm:col-span-2">
                                <label htmlFor="modal-role-title" className="text-xs font-bold text-slate-700">Role Title</label>
                                <input 
                                    id="modal-role-title"
                                    type="text" 
                                    defaultValue="VP of Engineering at CloudPulse Systems" 
                                    placeholder="Enter role title"
                                    title="Role Title"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="modal-email" className="text-xs font-bold text-slate-700">Email Address</label>
                                <input 
                                    id="modal-email"
                                    type="email" 
                                    defaultValue="j.vance@cloudpulse.io" 
                                    placeholder="Enter email address"
                                    title="Email Address"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="modal-phone" className="text-xs font-bold text-slate-700">Phone Number</label>
                                <input 
                                    id="modal-phone"
                                    type="text" 
                                    defaultValue="+1 (555) 092-4412" 
                                    placeholder="Enter phone number"
                                    title="Phone Number"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="modal-location" className="text-xs font-bold text-slate-700">Location</label>
                                <input 
                                    id="modal-location"
                                    type="text" 
                                    defaultValue="San Francisco, CA" 
                                    placeholder="Enter location"
                                    title="Location"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="modal-website" className="text-xs font-bold text-slate-700">Website URL</label>
                                <input 
                                    id="modal-website"
                                    type="url" 
                                    defaultValue="www.cloudpulse.io" 
                                    placeholder="Enter website link"
                                    title="Website URL"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
                            <button onClick={() => setIsEditOpen(false)} className="px-4 h-10 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                            <button onClick={() => setIsEditOpen(false)} className="px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/10 transition-colors">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}