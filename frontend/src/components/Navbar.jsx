import React from 'react';
import { GraduationCap, Users, PlusCircle } from 'lucide-react';

export default function Navbar({ studentCount, onAddNewClick }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Student Manager</h1>
              <p className="text-xs text-slate-500 font-medium">CRUD Portal &bull; REST API Client</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-600">Total Enrolled:</span>
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {studentCount}
              </span>
            </div>

            <button
              onClick={onAddNewClick}
              className="inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
