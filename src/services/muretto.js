import api from './api';

export const findAllMuretti = () => api.get('/filtrati', {
    params: {
        tipo: 'Muretto'
    }
});

export const addRapper = (addRapperRequest) => api.post('/addRapper', addRapperRequest, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export const deleteRapper = async (deleteRapperRequest) => {
    let valore = deleteRapperRequest.valore;
    let alias = deleteRapperRequest.alias;
    let nome = deleteRapperRequest.nome;
    await api.delete((`/deleteRapper/${valore}/${alias}?nome=${nome}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const addPresenza = async (addPresenzaRequest) => {
    await api.post(
        `/addPresenza/${addPresenzaRequest.tipo}/${addPresenzaRequest.valore}/${addPresenzaRequest.nomeRapper}`,
        {
            // Body della richiesta
           
                'data' : addPresenzaRequest.data,
                'evento' : addPresenzaRequest.evento, 
                'moltiplicatore' : addPresenzaRequest.moltiplicatore? addPresenzaRequest.moltiplicatore : 'casa',
                'posizionamento' : addPresenzaRequest.posizionamento ? addPresenzaRequest.posizionamento : null
            
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};

export const deletePresenza = async (deletePresenzaRequest) => {
    await api.delete((`/${deletePresenzaRequest.valore}/${deletePresenzaRequest.nome}?data=${deletePresenzaRequest.data}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};