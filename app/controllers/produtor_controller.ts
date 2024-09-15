import type { HttpContext } from '@adonisjs/core/http'
import ProdutorService from '#services/produtor_service'
import Produtor from '#models/produtor'

export default class ProdutorController {

  async create({ request }: HttpContext) {
    return ProdutorService.create(request.body())
  }

  async read({ request }: HttpContext) {
    if (request.params().id) {
      const produtor = await Produtor.findOrFail(request.params().id)
      return produtor
    }

    return await Produtor.all()
  }

  async update({ params, request }: HttpContext) {
    return ProdutorService.update(params.id, request.body())
  }

  async remove({ params }: HttpContext) {
    return ProdutorService.remove(params.id)
  }

}