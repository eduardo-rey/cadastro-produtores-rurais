import vine from '@vinejs/vine'

export const createProdutorValidator = vine.compile(
  vine.object({
    produtor: vine.string().trim().maxLength(100),
    cpfCnpj: vine.string().trim().cpfCnpj().isUnique({ table: 'produtores', column: 'cpf_cnpj' }),
    fazenda: vine.string().trim().maxLength(100),
    cidade: vine.string().trim().maxLength(100).cidade(),
    areaAgriculturavel: vine.number(),
    areaVegetacao: vine.number(),
    areaTotal: vine.number().positive().areaTotal(),
    culturas: vine.array(vine.number()).notEmpty().idsExist({ table: 'culturas' })
  })
)