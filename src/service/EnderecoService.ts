import { AxiosResponse } from 'axios';
import { apiViaCep } from 'src/boot/axios';

const getDadosViaCep = async (cep: string) => {

    return apiViaCep.get(`viacep.com.br/ws/${cep}/json/`)
        .then((response: AxiosResponse) => {
            return {
                cep: response.data.cep,
                uf: response.data.uf,
                cidade: response.data.localidade,
                bairro: response.data.bairro,
                logradouro: response.data.logradouro,
                numeroResidencia: '',
                complemento: '',
                tipoResidencia: '',
                numeroApartamento: ''
            }

        })
        .catch((erro: XMLHttpRequest) => {
            console.error(erro);
            throw erro;

        })

}
export { getDadosViaCep }