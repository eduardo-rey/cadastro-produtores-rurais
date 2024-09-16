import Cidade from "#models/cidade";
import Produtor from "#models/produtor";

type Relations = {
  cidade: string,
  estado: string,
  culturas: number[]
}

export default class ProdutorService {

  static async createRelations(produtor: Produtor, relations: Relations) {
    const cidade = await Cidade.query()
      .where('cidade', relations.cidade)
      .where('estado', relations.estado)
      .firstOrFail()

    await produtor.related('cidade').associate(cidade)
    await produtor.related('culturas').attach(relations.culturas)
  }
}