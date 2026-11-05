import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  courses,
  onResetFilters,
  totalResults,
}) {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCourse !== '';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student name, ID, or section..."
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Course Filter Dropdown */}
        <div className="relative sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="block w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Reset filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Showing <strong className="text-slate-800">{totalResults}</strong> matching results
          </span>
        </div>
      )}
    </div>
  );
}
