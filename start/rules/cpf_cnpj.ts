import vine, { VineString } from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";

function cpfCnpj(value: unknown, _options: undefined, field: FieldContext) {
  let valido = false

  if (typeof value !== 'string') {
    return
  }

  const valorTratado = value.replace(/[^\d]+/g,'')

  if (/^(\d)\1+$/.test(valorTratado)) {
    valido = false
  } else if (valorTratado.length === 11) {
    valido = validarCpf(valorTratado)
  } else if (valorTratado.length === 14) {
    valido = validarCnpj(valorTratado)
  }

  if (!valido) {
    field.report('CPF ou CNPJ inválido', 'cpfCnpj', field)
  }
}

export const cpfCnpjRule = vine.createRule(cpfCnpj)

declare module '@vinejs/vine' {
  interface VineString {
    cpfCnpj(): this
  }
}

VineString.macro('cpfCnpj', function (this: VineString) {
  return this.use(cpfCnpjRule())
})

function validarCpf(cpf: string) {
  let soma = 0
  let resto

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf[i - 1]) * (11 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) {
    resto = 0
  }

  if (resto !== parseInt(cpf[9])) {
    return false
  }

  soma = 0

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf[i - 1]) * (12 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) {
    resto = 0
  }

  if (resto !== parseInt(cpf[10])) {
    return false
  }

  return true
}

function validarCnpj(cnpj: string) {
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let soma = 0
  let posicao = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros[tamanho - i]) * posicao--
    if (posicao < 2) {
      posicao = 9
    }
  }

  let resultado = 0
  if (soma % 11 >= 2) {
    resultado = 11 - (soma % 11)
  }
  if (resultado !== parseInt(cnpj[12])) {
    return false
  }

  tamanho += 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  posicao = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros[tamanho - i]) * posicao--
    if (posicao < 2) {
      posicao = 9
    }
  }

  resultado = 0
  if (soma % 11 >= 2) {
    resultado = 11 - (soma % 11)
  }
  if (resultado !== parseInt(cnpj[13])) {
    return false
  }

  return true
}
