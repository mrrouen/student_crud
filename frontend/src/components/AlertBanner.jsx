import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AlertBanner({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div className="fixed top-20 right-6 z-50 max-w-md w-full transition-all duration-300 ease-out transform translate-y-0">
      <div
        className={`flex items-start p-4 rounded-xl border shadow-lg ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : isError
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}
      >
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-600" />}
        </div>

        <div className="flex-1 mr-2">
          {notification.title && (
            <h4 className="text-sm font-semibold mb-0.5">{notification.title}</h4>
          )}
          <p className="text-sm">{notification.message}</p>
        </div>

        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
