import { Exception } from "@adonisjs/core/exceptions";

const MOCK: any[] = [
  { produtor_nome: 'Camila Rafaela Mendes Santos', fazenda: 'Mata Atlântica', cidade: 'Cunha', estado: 'SP', area_aravel: 81500.25, area_vegetacao: 700.15, culturas: ['S', 'M', 'C'] },
  { produtor_nome: 'Fazenda Terra Prometida Ltda.', fazenda: 'Terra Prometida', cidade: 'São Bento do Sapucaí', estado: 'SP', area_aravel: 5400.5 , area_vegetacao: 150.35, culturas: ['M', 'S', 'CA'] },
  { produtor_nome: 'Fazenda Boa Esperança Ltda.', fazenda: 'Boa Esperança', cidade: 'Tiradentes', estado: 'MG', area_aravel: 50.25, area_vegetacao: 15.45, culturas: ['S', 'M', 'A'] },
  { produtor_nome: 'Matheus Eduardo Mendes Barbosa', fazenda: 'Vale do Sol', cidade: 'Penedo', estado: 'RJ', area_aravel: 2300.75, area_vegetacao: 100.15, culturas: ['C', 'CA', 'S'] },
  { produtor_nome: 'Isabella Fernanda Araújo Rocha', fazenda: 'Três Marias', cidade: 'Chapada dos Guimarães', estado: 'MT', area_aravel: 350.25, area_vegetacao: 120.25, culturas: ['A', 'M', 'S', 'CA'] },
  { produtor_nome: 'Fazenda Vista Alegre S/A', fazenda: 'Vista Alegre', cidade: 'São Lourenço', estado: 'MG', area_aravel: 112.5 , area_vegetacao: 5.25, culturas: ['CA', 'M', 'C'] },
  { produtor_nome: 'Fazenda Santa Clara Ltda.', fazenda: 'Santa Clara', cidade: 'São Francisco de Paula', estado: 'RS', area_aravel: 500.75, area_vegetacao: 200.45, culturas: ['S', 'C', 'A'] },
  { produtor_nome: 'Vinícius Henrique Moreira Fonseca', fazenda: 'Paraíso', cidade: 'Santo Antônio do Pinhal', estado: 'SP', area_aravel: 800.25, area_vegetacao: 350.75, culturas: ['M', 'CA', 'S'] },
  { produtor_nome: 'Fazenda Água Limpa S.A.', fazenda: 'Água Limpa', cidade: 'Domingos Martins', estado: 'ES', area_aravel: 250.5 , area_vegetacao: 80.95, culturas: ['C', 'A', 'S'] },
  { produtor_nome: 'Pedro Henrique Andrade Costa', fazenda: 'Rancho da Paz', cidade: 'Bento Gonçalves', estado: 'RS', area_aravel: 1200.75, area_vegetacao: 500.95, culturas: ['S', 'M', 'CA'] },
  { produtor_nome: 'Sofia Mariana Teixeira Cunha', fazenda: 'Ouro Verde', cidade: 'São Roque', estado: 'SP', area_aravel: 21000.5 , area_vegetacao: 400.85, culturas: ['C', 'CA'] },
  { produtor_nome: 'Fazenda Encanto da Serra Ltda.', fazenda: 'Encanto da Serra', cidade: 'Campos do Jordão', estado: 'SP', area_aravel: 2000.5 , area_vegetacao: 900.25, culturas: ['S', 'M', 'A'] },
  { produtor_nome: 'Fazenda Rancho Fundo Ltda.', fazenda: 'Rancho Fundo', cidade: 'Monte Verde', estado: 'MG', area_aravel: 475.5 , area_vegetacao: 20.55, culturas: ['C', 'S', 'M'] },
  { produtor_nome: 'Amanda Cristina Rodrigues Farias', fazenda: 'Dois Irmãos', cidade: 'Serra do Cipó', estado: 'MG', area_aravel: 3750.75, area_vegetacao: 300.65, culturas: ['A', 'CA', 'M'] },
  { produtor_nome: 'Fazenda Recanto Verde Ltda.', fazenda: 'Recanto Verde', cidade: 'Gramado', estado: 'RS', area_aravel: 10150.5 , area_vegetacao: 50.75, culturas: ['C', 'M', 'S', 'CA'] },
  { produtor_nome: 'Daniel Lucas Alves Santana', fazenda: 'Bela Vista', cidade: 'Itatiaia', estado: 'RJ', area_aravel: 600.5 , area_vegetacao: 250.55, culturas: ['M', 'S', 'A'] },
  { produtor_nome: 'Fazenda São João S.A.', fazenda: 'São João', cidade: 'Pirenópolis', estado: 'GO', area_aravel: 25.75, area_vegetacao: 10.35, culturas: ['CA', 'C', 'S'] },
  { produtor_nome: 'Fazenda Rio Bonito Ltda.', fazenda: 'Rio Bonito', cidade: 'Alto Paraíso de Goiás', estado: 'GO', area_aravel: 13000.75, area_vegetacao: 1200.35, culturas: ['C', 'M', 'S', 'A'] },
  { produtor_nome: 'Lucas Henrique Gomes Ribeiro', fazenda: 'Estrela do Sul', cidade: 'Bonito', estado: 'MS', area_aravel: 100.75, area_vegetacao: 30.65, culturas: ['S', 'CA', 'M'] },
  { produtor_nome: 'Felipe Augusto Carvalho Martins', fazenda: 'Monte Belo', cidade: 'Canela', estado: 'RS', area_aravel: 200.25, area_vegetacao: 70.85, culturas: ['C', 'A', 'S', 'CA'] }
]

export default class ProdutorService {

  static create(dados: { [key: string]: any }) {
    try {
      if (!dados.produtor_nome) {
        throw new Exception('Campo "produtor_nome" é obrigatório', {code: 'E_MISSING_PROPERTY', status: 400})
      }

      const produtor = { produtor_nome: dados.produtor_nome }

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

  static read(params: { produtor_nome?: string } = {}) {
    const filtros: { campo: string, valor?: string }[] = [];

    if (params.hasOwnProperty('produtor_nome') && params.produtor_nome ) { filtros.push({
      campo: 'produtor_nome',
      valor: params.produtor_nome
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

  static update(id: number, dados: { [key: string]: any }) {
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

  static remove(id: number) {
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