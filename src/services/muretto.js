import api from './api'; 

export const findAllMuretti = () => api.get('/filtrati', {params: {
    tipo: 'Muretto'
}});
