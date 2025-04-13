import React from 'react';

export default function Modal({ title, onCancel, onConfirm, children }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-6">
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>

                {children}

                <div className="flex justify-center gap-3 pt-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                    >
                        Annulla
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-green-600 transition"
                    >
                        Conferma
                    </button>

                </div>
            </div>
        </div>
    );
}