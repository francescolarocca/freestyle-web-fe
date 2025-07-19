import React from 'react';

function RappperDetail (rapper) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Rapper Detail</h1>
        <p className="text-lg">This is the rapper of {rapper.nome} detail page.</p>
        </div>
    );
}

export default RappperDetail;