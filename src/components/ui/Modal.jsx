import React from 'react';

export default function Modal({ title, children }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-6">
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                {children}
            </div>
        </div>
    );
}