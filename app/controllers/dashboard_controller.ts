import DashboardService from '#services/dashboard_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

  async index({}: HttpContext) {
    return DashboardService.index()
  }

}