import React from 'react';
import { Eye, Edit2, Trash2, Check, X, AlertTriangle, UserX } from 'lucide-react';

export default function StudentTable({
  students,
  loading,
  selectedStudentId,
  deletingStudentId,
  onViewStudent,
  onEditStudent,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <UserX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No students found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          No student records match your query or the database is currently empty.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-xs tracking-wider">
            <tr>
              <th scope="col" className="px-4 py-3.5 w-16">ID</th>
              <th scope="col" className="px-4 py-3.5">Student Name</th>
              <th scope="col" className="px-4 py-3.5">Course</th>
              <th scope="col" className="px-4 py-3.5">Section</th>
              <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {students.map((student) => {
              const isSelected = selectedStudentId === student.id;
              const isDeleting = deletingStudentId === student.id;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors duration-150 ${
                    isSelected
                      ? 'bg-indigo-50/60'
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* ID */}
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-xs text-slate-500 font-medium">
                    #{student.id}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center uppercase">
                        {(student.firstname?.[0] || '') + (student.lastname?.[0] || '')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {student.firstname} {student.lastname}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-600 font-medium">
                    {student.section}
                  </td>

                  {/* Actions / Inline Delete Confirmation */}
                  <td className="px-4 py-3.5 whitespace-nowrap text-right text-xs">
                    {isDeleting ? (
                      /* Inline Confirmation (No Modal) */
                      <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span className="text-rose-700 font-semibold">Delete?</span>
                        <button
                          onClick={() => onConfirmDelete(student.id)}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Confirm Delete"
                        >
                          <Check className="w-3 h-3" />
                          <span>Yes</span>
                        </button>
                        <button
                          onClick={onCancelDelete}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Cancel Delete"
                        >
                          <X className="w-3 h-3" />
                          <span>No</span>
                        </button>
                      </div>
                    ) : (
                      /* Normal Action Buttons */
                      <div className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => onViewStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRequestDelete(student.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
