import db from "@adonisjs/lucid/services/db";
import vine, { VineString } from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";

async function cidade(value: unknown, _options: undefined, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const result = await db
    .from('cidades')
    .select('cidade', 'estado')
    .where('cidade', value)
    .where('estado', field.data.estado)
    .first()

  if (!result) {
    field.report('Cidade / estado inválida', 'cidade', field)
  }
}

export const cidadeRule = vine.createRule(cidade)

declare module '@vinejs/vine' {
  interface VineString {
    cidade(): this
  }
}

VineString.macro('cidade', function (this: VineString) {
  return this.use(cidadeRule())
})
