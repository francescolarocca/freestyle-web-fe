import axios from 'axios';

const API_BASE_URL = 'https://strettocypher.duckdns.org/murettifreestyle'; // Assicurati che l'URL sia corretto

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Errore nella richiesta API", error);
    throw error;
  }
};
export const createItem = async (newItem) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, newItem, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error("Errore nella creazione dell'elemento", error);
      throw error;
    }
  };

  export const addPresenzaToRapper = async (valore, rapperNome, presenza) => {

    console.log("Dati ricevuti in addPresenzaToRapper:", {  valore, rapperNome, presenza });

    if (!presenza || !presenza.data) {
        console.error("Errore: il parametro 'presenza' è undefined o manca la data.");
        return;
      }
    
    try {
      const presenzaData = {
       
            
              data: new Date(presenza.data).toISOString(), // Formatta correttamente la data
              evento: presenza.evento,
              punteggio: presenza.punteggio
            
          
      };
  
      console.log("Dati inviati:", presenzaData); // DEBUG
  
      const response = await axios.post(
        `http://localhost:8080/murettifreestyle/addPresenza/Muretto/${valore}/${rapperNome}`,
        presenzaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Presenza aggiunta con successo!", response.data);
    } catch (error) {
      console.error("Errore nell'aggiungere la presenza api.js", error.response?.data || error);
    }
  };

  // Funzione per aggiungere un nuovo rapper
  export const addRapper = async (valore, murettoId, rapper) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addRapper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valore: valore,
          alias: murettoId,
          rapper: {
            nome: rapper.nome,
            rank: rapper.rank,
            bio: rapper.bio,
            avatarUrl: rapper.avatarUrl,
            spotifyLink: rapper.spotifyLink,
            soundcloudLink: rapper.soundcloudLink,
            instagramLink: rapper.instagramLink,
          }
        })
      });
  
      if (!response.ok) {
        throw new Error("Errore nell'aggiungere il rapper");
      }
  
    } catch (error) {
      console.error("Errore nella chiamata API", error);
      throw error;
    }
  };
export const deleteRapper = async (valore ,alias, nomeRapper) => {
  try {
    let nomePulito =nomeRapper.trim()
    const response = await fetch(`${API_BASE_URL}/deleteRapper/${valore}/${alias}?nome=${encodeURIComponent(nomePulito)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Errore nell'eliminazione del rapper");
    }
    
  } catch (error) {
    throw error;
  }
};
export const updateRapperNameRank = async (valore ,oldName,name, rank) => {
  try {
    const response = await fetch(`${API_BASE_URL}/updateRapper/Muretto/${valore}/${oldName}?nome=${name}&rank=${rank}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Errore nell'aggiornare il rapper");
    }

    
  } catch (error) {
    console.error("Errore nella chiamata API", error);

    
    throw error;
  }


  
};

// api.js

export const addMuretto = async ({ alias, valore, tipo, ranking }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alias,
        valore,
        tipo: "Muretto",
        
      }),
    });

    if (response.ok) {
      const data = await response.json(); // Converti la risposta JSON in un oggetto JavaScript
      console.log("Muretto aggiunto con successo:", data);
      alert("Muretto aggiunto con successo!");
    } else {
      const errorData = await response.text(); // Ottieni eventuali messaggi di errore
      alert("Errore durante l'aggiunta del muretto: " + errorData);
    }
  } catch (error) {
    console.error("Errore durante la chiamata API:", error);
    throw error;
  }
};

export const uploadAvatar = async (valore, nome, alias, formData) => {
  return axios.post(
    `http://localhost:8080/murettifreestyle/upload-avatar/Muretto/${valore}/${nome}/${alias}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};





  