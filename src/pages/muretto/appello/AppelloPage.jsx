import React from 'react';
import { doAppello } from '../../../services/muretto';
import RapperSelector from '../../../components/rapper/RapperSelector';
import { useState } from 'react';
import { useMuretto } from '../MurettoContext';
import { isDateInFuture } from '../../../services/util';
import { useNotify } from '../context/NotifyContext';
import { murettoContext } from '../MurettoContext';
function AppelloPage() {
  const { setShowSuccess, setMessage } = useNotify();
  const { findMurettoByAlias } = murettoContext()

  const [selectedRappers, setSelectedRappers] = React.useState([]);
  const muretto = useMuretto();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    selectedRappers: [],
    data: ''
  });
  const validate = () => {
    console.log('validate', formData);
    const newErrors = {};
    formData.selectedRappers = selectedRappers;
    if (formData.selectedRappers.length === 0) newErrors.data = 'Seleziona almeno un rapper';
    if (!formData.data) newErrors.data = 'La data è obbligatoria';
    if (!newErrors.data && isDateInFuture(formData.data)) newErrors.data = 'La data non può essere nel futuro';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      await doAppello({
        tipo: muretto.tipo,
        valore: muretto.valore,
        rapper: formData.selectedRappers,
        data: formData.data
      });
      setSelectedRappers([]);
      setFormData({
        selectedRappers: [],
        data: ''
      });
      setMessage("Appello fatto con successo!");
      setShowSuccess(true)
      findMurettoByAlias();
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    }
  };

  return (

    <div className="relative max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-indigo-900 shadow-lg p-6 rounded-xl space-y-6"
      >
        <div className="flex items-start justify-center px-5 py-5"> {/* ridotto padding */}

          <RapperSelector rappers={muretto.rapper} onSelectionChange={setSelectedRappers} rapperSelected={selectedRappers}></RapperSelector>

        </div>
        <div className=" max-w-xl mx-auto">
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Conferma appello
        </button>
      </form>
    </div>
  );
}

export default AppelloPage;