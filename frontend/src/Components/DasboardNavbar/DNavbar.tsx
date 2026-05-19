import { Button } from "../UI/Buttons"
import { Input } from "../UI/Inputs"

export function Navbar(){
    return<>    
        <div className="flex gap-4 items-center w-full bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex-grow">
                <div className="w-full relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200 ml-[-0.5rem]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <div className="pl-7 w-full">
                        <Input Placeholder="Search Leads..." size="primary" Color="Slate" TextColor="Black" type="text"/>
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0 hidden sm:block">
                <Button size="primary" text="New Lead" color="blue" textColor="white"/>
            </div>
        </div>
    </>
}