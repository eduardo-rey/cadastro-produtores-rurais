/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProdutorController = () => import('#controllers/produtor_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', async () => {
  return 'Cadastro de produtores rurais'
})

router.post('/produtor', [ProdutorController, 'create']).as('produtor.create')

router.get('/produtor', [ProdutorController, 'read']).as('produtor.index')

router.get('/produtor/:id', [ProdutorController, 'read']).as('produtor.find')

router.put('/produtor/:id', [ProdutorController, 'update']).as('produtor.update')

router.delete('/produtor/:id', [ProdutorController, 'remove']).as('produtor.remove')

router.get('/dashboard', [DashboardController, 'index']).as('dashboard.index')
