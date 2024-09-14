import { Exception } from "@adonisjs/core/exceptions";

  const MOCK: any[] = [
    { produtor: 'produtor0' },
    { produtor: 'produtor1' },
    { produtor: 'produtor2' }
  ]

  export default class ProdutorService {

  static getProdutor(params: { produtor?: string } = {}) {
    const filtros: { campo: string, valor?: string }[] = [];

    if (params.hasOwnProperty('produtor')) { filtros.push({
      campo: 'produtor',
      valor: params.produtor
    }) }

    const resposta = MOCK.filter(item => {
      for (let i = 0; i < filtros.length; i++) {
        const filtro = filtros[i]

        if (item[filtro.campo] !== filtro.valor) { return false }
      }

      return true
    });

    return resposta
  }

  static postProdutor(dados: { [key: string]: any }) {
    try {
      if (!dados.produtor) {
        throw new Exception('Campo "produtor" é obrigatório', {code: 'E_MISSING_PROPERTY', status: 400})
      }

      const produtor = { produtor: dados.produtor }

      MOCK.push(produtor)

      return produtor
    } catch (erro) {
      if (erro.status === 400) {
        throw new Exception(erro);
      } else {
        console.error(erro);
        throw new Exception('Erro ao processar requisição', { code: 'E_SERVER_ERROR', status: 500 })
      }
    }
  }

  static putProdutor(id: number, dados: { [key: string]: any }) {
    try {
      if (!id) {
        throw new Exception('Id não informado', {code: 'E_MISSING_PROPERTY', status: 400})
      }

      const produtor = { produtor: dados.produtor }

      MOCK[id] = { ...MOCK[id], ...produtor }

      return produtor
    } catch (erro) {
      if (erro.status === 400) {
        throw new Exception(erro);
      } else {
        console.error(erro);
        throw new Exception('Erro ao processar requisição', { code: 'E_SERVER_ERROR', status: 500 })
      }
    }
  }

  static deleteProdutor(id: number) {
    try {
      if (!id) {
        throw new Exception('Id não informado', {code: 'E_MISSING_PROPERTY', status: 400})
      }

      const produtor = MOCK[id]
      MOCK.splice(id, 1)

      return produtor
    } catch (erro) {
      if (erro.status === 400) {
        throw new Exception(erro);
      } else {
        console.error(erro);
        throw new Exception('Erro ao processar requisição', { code: 'E_SERVER_ERROR', status: 500 })
      }
    }
  }
}