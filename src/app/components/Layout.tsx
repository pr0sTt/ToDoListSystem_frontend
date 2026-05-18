import React from 'react';
import { Outlet } from 'react-router';
import { CheckSquare } from 'lucide-react';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <CheckSquare className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">ToDo List</span>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
