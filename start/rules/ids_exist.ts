import db from "@adonisjs/lucid/services/db";
import vine, { VineArray, VineNumber } from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";

type Options = {
  table: string,
  column?: string
}

async function idsExist(value: unknown, options: Options, field: FieldContext) {
  if (!Array.isArray(value)) {
    return
  }

  for (const item of value) {
    console.log(JSON.stringify(item))
    if (typeof item !== 'number') {
      field.report('Itens de {{ field }} devem ser IDs numéricos', 'idsExist', field)
      return
    }

    const result = await db
      .from(options.table)
      .select('id')
      .where('id', item)
      .first()

    if (!result) {
      field.report(`ID ${item} não encontrado na tabela de {{ field }}`, 'idsExist', field)
    }
  }
}

export const idsExistRule = vine.createRule(idsExist)

declare module '@vinejs/vine' {
  interface VineArray<Schema> {
    idsExist(options: Options): this
  }
}

VineArray.macro('idsExist', function (this: VineArray<VineNumber>, options: Options) {
  return this.use(idsExistRule(options))
})
