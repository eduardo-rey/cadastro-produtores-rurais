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

router.get('/', async () => {
  return 'Cadastro de produtores rurais'
})

router.post('/produtor', [ProdutorController, 'create'])

router.get('/produtor', [ProdutorController, 'read'])

router.put('/produtor/:id', [ProdutorController, 'update'])

router.delete('/produtor/:id', [ProdutorController, 'remove'])
