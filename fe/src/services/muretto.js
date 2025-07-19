import api from './api';

export const findAllMuretti = () => api.get('/filtrati', {
    params: {
        tipo: 'Muretto'
    }
});

export const addRapper = (addRapperRequest) => api.post('/addRapper', addRapperRequest);

export const deleteRapper = async (deleteRapperRequest) => {
    let valore = deleteRapperRequest.valore;
    let alias = deleteRapperRequest.alias;
    let nome = deleteRapperRequest.nome;
    await api.delete((`/deleteRapper/${valore}/${alias}?nome=${nome}`));
};

export const addPresenza = async (addPresenzaRequest) => {
    await api.post(
        `/addPresenza/${addPresenzaRequest.tipo}/${addPresenzaRequest.valore}/${addPresenzaRequest.nomeRapper}`,
        {
            'data': addPresenzaRequest.data,
            'evento': addPresenzaRequest.evento,
            'moltiplicatore': addPresenzaRequest.moltiplicatore ? addPresenzaRequest.moltiplicatore : 'casa',
            'posizionamento': addPresenzaRequest.posizionamento ? addPresenzaRequest.posizionamento : null,
            'descrizione': addPresenzaRequest.descrizione ? addPresenzaRequest.descrizione : null
        }
    );
};

export const deletePresenza = async (deletePresenzaRequest) => {
    await api.delete((`/${deletePresenzaRequest.valore}/${deletePresenzaRequest.nome}?data=${deletePresenzaRequest.data}`));
};

export const updateRapper = async (updateRapperRequest) => {
    await api.put(
        `/updateRapper/${updateRapperRequest.tipo}/${updateRapperRequest.valore}/${updateRapperRequest.nomeRapper}?rank=${updateRapperRequest.newRank}`
    );
};


export const doAppello = async (doAppelloRequest) => {
    await api.post(
        '/appello',
        {
            'tipo': doAppelloRequest.tipo,
            'valore': doAppelloRequest.valore,
            'rapper': doAppelloRequest.rapper,
            'data': new Date(doAppelloRequest.data).toISOString()
        }
    );
};