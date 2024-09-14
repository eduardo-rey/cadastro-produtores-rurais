/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import ProdutorService from '#services/produtor_service'

router.get('/', async () => {
  return 'Cadastro de produtores rurais'
})

router.get('/produtor', async (ctx) => {
  return ProdutorService.getProdutor(ctx.request.qs())
})

// router.get('/produtor/:id', async (ctx) => {
//   return ProdutorService.getProdutor()
// })

router.post('/produtor', async (ctx) => {
  return ProdutorService.postProdutor(ctx.request.body())
})

router.put('/produtor/:id', async (ctx) => {
  return ProdutorService.putProdutor(ctx.params.id, ctx.request.body())
})

router.delete('/produtor/:id', async (ctx) => {
  return ProdutorService.deleteProdutor(ctx.params.id)
})
