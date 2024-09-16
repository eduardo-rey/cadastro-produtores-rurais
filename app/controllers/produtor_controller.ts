import type { HttpContext } from '@adonisjs/core/http'
import ProdutorService from '#services/produtor_service'
import Produtor from '#models/produtor'
import { createProdutorValidator } from '#validators/produtor'

export default class ProdutorController {

  async create({ request }: HttpContext) {
    const dados = request.only([
      'produtor',
      'cpfCnpj',
      'fazenda',
      'cidade',
      'estado',
      'areaAgriculturavel',
      'areaVegetacao',
      'areaTotal',
      'culturas'
    ])
    const dadosValidados = await createProdutorValidator.validate(dados)
    const produtor = await Produtor.create(dadosValidados)

    ProdutorService.createRelations(produtor, {
      cidade: dados.cidade,
      estado: dados.estado,
      culturas: dados.culturas
    })

    return produtor
  }

  async read({ request }: HttpContext) {
    if (request.params().id) {
      const produtor = await Produtor.findOrFail(request.params().id)
      const cidade = (await produtor.related('cidade').query().firstOrFail())
      const culturas = (await produtor.related('culturas').query())

      return { produtor: produtor, cidade: cidade, culturas: culturas }
    }

    return await Produtor.all()
  }

  async update({ request }: HttpContext) {
    const produtor = await Produtor.findOrFail(request.params().id)

    const dados = request.only([
      'produtor',
      'cpfCnpj',
      'fazenda',
      'cidadeId',
      'areaAgriculturavel',
      'areaVegetacao',
      'areaTotal',
      'culturas'
    ])
    return produtor.merge(dados).save()
  }

  async remove({ request }: HttpContext) {
    const produtor = await Produtor.findOrFail(request.params().id)
    await produtor.related('culturas').detach()
    return await produtor.delete()
  }

}