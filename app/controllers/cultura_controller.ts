import Cultura from '#models/cultura'

export default class CulturaController {

  async read() {
    return await Cultura.all()
  }

}