import React, { useState } from 'react';
import { isDateInFuture } from '../../../services/util.js';
function PresenzaForm({ onSubmit, onCancel, formData, setFormData, textConfirm }) {
    const [errors, setErrors] = useState({});

    const validate = () => {
        console.log('validate', formData);
        const newErrors = {};

        if (!formData.data) newErrors.data = 'La data è obbligatoria';
        if (!newErrors.data && isDateInFuture(formData.data)) newErrors.data = 'La data non può essere nel futuro';
        if (!formData.evento) newErrors.evento = 'Devi selezionare un evento';

        if (formData.evento === 'battle') {
            if (!formData.posizionamento) newErrors.posizionamento = 'Seleziona un posizionamento';
            if (!formData.moltiplicatore) newErrors.moltiplicatore = 'Seleziona un moltiplicatore';
        }

        setErrors(newErrors);
        console.log('isvalid', Object.keys(newErrors).length === 0);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (
        e
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const isBattle = formData.evento === 'battle';

    return (
        <form
            onSubmit={handleSubmit}
            className=" max-w-xl mx-auto space-y-6"
        >
            <h2 className="text-xl font-bold text-slate-800">Aggiungi Presenza a {formData.nomeRapper}</h2>

            {/* Data */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.data && <p className="text-sm text-red-500">{errors.data}</p>}
            </div>

            {/* evento Presenza */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evento</label>
                <select
                    name="evento"
                    value={formData.evento}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Seleziona...</option>
                    <option value="presenza">Presenza al Muretto</option>
                    <option value="battle">Battle</option>
                </select>
                {errors.evento && <p className="text-sm text-red-500">{errors.evento}</p>}
            </div>

            {/* Se evento = battle → mostra campi aggiuntivi */}
            {isBattle && (
                <>
                    {/* Posizionamento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Posizionamento</label>
                        <select
                            name="posizionamento"
                            value={formData.posizionamento}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleziona...</option>
                            <option value="ottavi">Ottavi</option>
                            <option value="quarti">Quarti</option>
                            <option value="semifinale">Semifinale</option>
                            <option value="finale">Finale</option>
                            <option value="vittoria">Vittoria</option>
                        </select>
                        {errors.posizionamento && <p className="text-sm text-red-500">{errors.posizionamento}</p>}
                    </div>

                    {/* moltiplicatore */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">moltiplicatore</label>
                        <select
                            name="moltiplicatore"
                            value={formData.moltiplicatore}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Seleziona...</option>
                            <option value="casa">Casa</option>
                            <option value="regionale">Regionale</option>
                            <option value="sud">Sud Italia</option>
                            <option value="centro">Centro Italia</option>
                            <option value="nord">Nord Italia</option>
                        </select>
                        {errors.moltiplicatore && <p className="text-sm text-red-500">{errors.moltiplicatore}</p>}
                    </div>
                </>
            )}

            {/* Descrizione */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
                <textarea
                    name="descrizione"
                    value={formData.descrizione}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-center">
                
            <button
                    type="button"
                    onClick={onCancel}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition justify-start mr-4"
                >
                    Annulla
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {textConfirm}
                </button>
               
            </div>
        </form>
    );
}

export default PresenzaForm;