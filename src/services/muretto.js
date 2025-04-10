import api from './api'; 

export const findAllMuretti = () => api.get('/filtrati', {params: {
    tipo: 'Muretto'
}});

export const addRapper = (addRapperRequest) => api.post('/addRapper', addRapperRequest, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export const deleteRapper = (deleteRapperRequest) => {
    let valore = deleteRapperRequest.valore;
    let alias = deleteRapperRequest.alias;
    let nome = deleteRapperRequest.nome;
    api.delete((`/deleteRapper/${valore}/${alias}?nome=${nome}`), {
    headers: {
        'Content-Type': 'application/json'
    }
})}
;