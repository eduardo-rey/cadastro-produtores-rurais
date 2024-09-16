/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const CulturaController = () => import('#controllers/cultura_controller')
const ProdutorController = () => import('#controllers/produtor_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/cultura', [CulturaController, 'read']).as('cultura.index')

router
  .group(() => {
    router.post('/', [ProdutorController, 'create']).as('produtor.create')
    router.get('/', [ProdutorController, 'read']).as('produtor.index')
    router.get('/:id', [ProdutorController, 'read']).as('produtor.find')
    router.put('/:id', [ProdutorController, 'update']).as('produtor.update')
    router.delete('/:id', [ProdutorController, 'remove']).as('produtor.remove')
  })
  .prefix('/produtor')

router.get('/dashboard', [DashboardController, 'index']).as('dashboard.index')
