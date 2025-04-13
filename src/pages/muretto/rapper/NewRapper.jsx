import React , { useRef, useState }from "react";
import {addRapper} from "../../../services/muretto.js";
import { useMuretto } from '../MurettoContext';
import { useNavigate } from "react-router-dom";
import {useNotify} from '../context/NotifyContext.jsx';
import { murettoContext } from "../MurettoContext";
function NewRapper() {
    const { setShowSuccess, setMessage } = useNotify();
    const {findMurettoByAlias} = murettoContext()
    const  muretto  = useMuretto();
    const navigate = useNavigate();
    const handleChange = (
      e
    ) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  const [formData, setFormData] = useState({
    nome: '',
    instagramLink: '',
    spotifyLink: '',
    bio: '',
    addAgain: false,
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rapperData = Object.fromEntries(formData.entries());
    let addRapperRequest = {
      valore : muretto.valore,
      alias : muretto.alias,
      rapper : rapperData
    }
    await addRapper(addRapperRequest);
    
    setMessage("Rapper aggiunto con successo!");
    setShowSuccess(true)
    findMurettoByAlias();
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
    
    console.log("Rapper data submitted:", rapperData);
    if(formData.get('addAgain') == "on") {
      navigate(`/muretto/${muretto.alias}/rapper/new`);
    }else{
      navigate(`/muretto/${muretto.alias}/rapper`);
    }
}
  return (
      
    <div className="relative max-w-xl mx-auto">
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg p-6 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-primary">
        Aggiungi un Rapper
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          TAG Instagram
        </label>
        <input
          type="text"
          name="instagramLink"
          value={formData.instagramLink}
          onChange={handleChange}
          placeholder="@nomeig"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profilo Spotify
        </label>
        <input
          type="text"
          name="spotifyLink"
          value={formData.spotifyLink}
          onChange={handleChange}
          placeholder="https://open.spotify.com/artist/..."
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="addAgain"
          checked={formData.addAgain}
          onChange={handleChange}
          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="attivo" className="text-sm text-gray-700">
          Aggiungi di nuovo
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition  hover:border-green-700"
      >
        Salva Rapper
      </button>
    </form>
    </div>
  );
}
export default NewRapper;