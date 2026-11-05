import React, { useState } from 'react';
import { UserPlus, Save, X, AlertCircle, Loader2 } from 'lucide-react';

export default function StudentForm({
  mode, // 'create' or 'edit'
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(() => ({
    firstname: (mode === 'edit' && initialData?.firstname) || '',
    lastname: (mode === 'edit' && initialData?.lastname) || '',
    course: (mode === 'edit' && initialData?.course) || '',
    section: (mode === 'edit' && initialData?.section) || '',
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    });
  };

  const isEdit = mode === 'edit';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
              isEdit ? 'bg-amber-600' : 'bg-indigo-600'
            }`}
          >
            {isEdit ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEdit ? `Edit Student #${initialData?.id}` : 'Enroll New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEdit ? 'Update student information' : 'Fill in the details to add a record'}
            </p>
          </div>
        </div>

        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Cancel editing"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="e.g. John"
            className={`w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none transition-colors ${
              errors.firstname
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-500'
                : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          />
          {errors.firstname && (
            <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.firstname}</span>
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="e.g. Doe"
            className={`w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none transition-colors ${
              errors.lastname
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-500'
                : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          />
          {errors.lastname && (
            <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.lastname}</span>
            </p>
          )}
        </div>

        {/* Course & Section side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSCS, BSIT"
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none transition-colors ${
                errors.course
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.course}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A, 4B"
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none transition-colors ${
                errors.section
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.section}</span>
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer ${
              isEdit
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isEdit ? 'Updating...' : 'Adding...'}</span>
              </>
            ) : (
              <>
                {isEdit ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{isEdit ? 'Update Student' : 'Add Student'}</span>
              </>
            )}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
