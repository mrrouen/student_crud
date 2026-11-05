import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import SearchFilter from './components/SearchFilter';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import StudentView from './components/StudentView';
import { studentService } from './services/studentService';
import { RefreshCw, ServerOff } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Context Panel State (Modal-Free)
  // panelMode: 'create' | 'edit' | 'view'
  const [panelMode, setPanelMode] = useState('create');
  const [activeStudent, setActiveStudent] = useState(null);

  // Inline Delete State
  const [deletingStudentId, setDeletingStudentId] = useState(null);

  // Toast Notifications
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((type, message, title = '') => {
    setNotification({ type, message, title });
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Fetch all students from backend
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setServerError(null);
    try {
      const data = await studentService.getAllStudents();
      // Ensure data is an array
      const list = Array.isArray(data) ? data : [];
      setStudents(list);
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setServerError(err.message || 'Cannot reach student backend API.');
      showNotification(
        'error',
        'Could not load students from the server. Ensure the Spring Boot backend is running on port 8080.',
        'Connection Error'
      );
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Distinct courses for filter dropdown
  const uniqueCourses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered students list based on search and course filter
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        student.firstname?.toLowerCase().includes(query) ||
        student.lastname?.toLowerCase().includes(query) ||
        student.section?.toLowerCase().includes(query) ||
        String(student.id).includes(query);

      const matchesCourse =
        selectedCourse === '' ||
        (student.course && student.course.trim().toLowerCase() === selectedCourse.toLowerCase());

      return matchesSearch && matchesCourse;
    });
  }, [students, searchQuery, selectedCourse]);

  // Reset search and filter
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCourse('');
  };

  // Switch to Create Mode
  const handleAddNewClick = () => {
    setPanelMode('create');
    setActiveStudent(null);
  };

  // Switch to View Mode
  const handleViewStudent = (student) => {
    setActiveStudent(student);
    setPanelMode('view');
  };

  // Switch to Edit Mode
  const handleEditStudent = (student) => {
    setActiveStudent(student);
    setPanelMode('edit');
  };

  // Cancel Edit / Close View -> Return to Create Mode
  const handleCancelPanel = () => {
    setPanelMode('create');
    setActiveStudent(null);
  };

  // Create or Update Submission
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (panelMode === 'edit' && activeStudent?.id) {
        // Update existing student
        const updated = await studentService.updateStudent(activeStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
        showNotification(
          'success',
          `Student "${updated.firstname} ${updated.lastname}" was successfully updated.`,
          'Student Updated'
        );
        // Reset back to create mode
        setPanelMode('create');
        setActiveStudent(null);
      } else {
        // Create new student
        const created = await studentService.createStudent(formData);
        setStudents((prev) => [...prev, created]);
        showNotification(
          'success',
          `Student "${created.firstname} ${created.lastname}" was successfully enrolled.`,
          'Student Created'
        );
      }
    } catch (err) {
      console.error('Submission error:', err);
      showNotification('error', err.message || 'Operation failed. Please try again.', 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inline Delete Handlers (No Modal)
  const handleRequestDelete = (id) => {
    setDeletingStudentId(id);
  };

  const handleCancelDelete = () => {
    setDeletingStudentId(null);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      // If the currently viewed/edited student was deleted, reset panel
      if (activeStudent?.id === id) {
        setPanelMode('create');
        setActiveStudent(null);
      }
      showNotification('success', `Student #${id} was deleted successfully.`, 'Student Deleted');
    } catch (err) {
      console.error('Delete error:', err);
      showNotification('error', err.message || `Failed to delete student #${id}`, 'Error');
    } finally {
      setDeletingStudentId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar studentCount={students.length} onAddNewClick={handleAddNewClick} />

      {/* Floating Notifications */}
      <AlertBanner notification={notification} onDismiss={dismissNotification} />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Backend Connection Warning Banner */}
        {serverError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <ServerOff className="w-5 h-5 text-rose-600" />
              <div>
                <h4 className="text-sm font-semibold text-rose-900">Backend Server Offline or Unreachable</h4>
                <p className="text-xs text-rose-700">
                  {serverError} &bull; Check that Spring Boot is running on port 8080.
                </p>
              </div>
            </div>
            <button
              onClick={fetchStudents}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* 2-Column Responsive Dashboard Layout (Modal-Free) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Student List & Controls (7 Cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Directory</h2>
                <p className="text-xs text-slate-500">
                  Manage and monitor all registered students
                </p>
              </div>
              <button
                onClick={fetchStudents}
                disabled={loading}
                className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh student list"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Search and Filters */}
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={uniqueCourses}
              onResetFilters={handleResetFilters}
              totalResults={filteredStudents.length}
            />

            {/* Table with Inline Delete Confirmations */}
            <StudentTable
              students={filteredStudents}
              loading={loading}
              selectedStudentId={activeStudent?.id}
              deletingStudentId={deletingStudentId}
              onViewStudent={handleViewStudent}
              onEditStudent={handleEditStudent}
              onRequestDelete={handleRequestDelete}
              onConfirmDelete={handleConfirmDelete}
              onCancelDelete={handleCancelDelete}
            />
          </div>

          {/* Right Column: Context Action Panel (5 Cols on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4">
            {panelMode === 'view' ? (
              <StudentView
                student={activeStudent}
                onEdit={handleEditStudent}
                onClose={handleCancelPanel}
              />
            ) : (
              <StudentForm
                key={panelMode === 'edit' ? activeStudent?.id : 'create-new'}
                mode={panelMode}
                initialData={activeStudent}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelPanel}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Student CRUD Portal &bull; Vite + React + Tailwind CSS &bull; Modal-Free Architecture
      </footer>
    </div>
  );
}
