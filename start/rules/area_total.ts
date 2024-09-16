import vine, { VineNumber } from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";

function areaTotal(value: unknown, _options: undefined, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }

  if (value <= 0 || value < (field.data.areaAgriculturavel + field.data.areaVegetacao)) {
    field.report('Área total deve ser igual ou maior que as áreas agriculturável e de vegetação', 'areaTotal', field)
  }
}

export const areaTotalRule = vine.createRule(areaTotal)

declare module '@vinejs/vine' {
  interface VineNumber {
    areaTotal(): this
  }
}

VineNumber.macro('areaTotal', function (this: VineNumber) {
  return this.use(areaTotalRule())
})
