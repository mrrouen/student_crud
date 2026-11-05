import React from 'react';
import { User, BookOpen, Layers, Edit2, X, Hash } from 'lucide-react';

export default function StudentView({
  student,
  onEdit,
  onClose,
}) {
  if (!student) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Student Profile</h2>
            <p className="text-xs text-slate-500">Record details and overview</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close profile view"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Card Body */}
      <div className="space-y-5">
        {/* Avatar & Full Name Banner */}
        <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold text-lg flex items-center justify-center shadow-inner uppercase">
            {(student.firstname?.[0] || '') + (student.lastname?.[0] || '')}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {student.firstname} {student.lastname}
            </h3>
            <span className="inline-flex items-center space-x-1 font-mono text-xs text-slate-500 font-medium">
              <Hash className="w-3 h-3 text-slate-400" />
              <span>Student ID: {student.id}</span>
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Course</span>
            </div>
            <p className="text-sm font-bold text-slate-800">{student.course}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Section</span>
            </div>
            <p className="text-sm font-bold text-slate-800">{student.section}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={() => onEdit(student)}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 shadow-xs transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Information</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
