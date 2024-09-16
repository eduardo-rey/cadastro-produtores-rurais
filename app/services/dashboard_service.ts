import Produtor from "#models/produtor";
import db from "@adonisjs/lucid/services/db";

export default class DashboardService {

  static async index() {
    // type area = {
    //   hectares: Number,
    //   porcentagem: Number
    // }
    // type total = {
    //   quantidade: Number,
    //   areaTotal: Number,
    //   areaAgriculturavel: area,
    //   areaVegetacao: area,
    //   areaOutras: area
    // }

    // const total: total = { quantidade: 0, area: 0 }
    // const resultado: { total: total, estados: { [key: string]: total } } = { total: total, estados: {} };

    const totais = (
      await Produtor.query()
        .count('*', 'quantidade')
        .sum('area_agriculturavel', 'areaAgriculturavel')
        .sum('area_vegetacao', 'areaVegetacao')
        .sum('area_total', 'areaTotal')
        .firstOrFail()
    ).$extras
    const areaOutras = totais.areaTotal - (totais.areaAgriculturavel + totais.areaVegetacao)

    const resultado = {
      brasil: {
        quantidade: parseInt(totais.quantidade),
        areaTotal: totais.areaTotal,
        areaAgriculturavel: {
          hectares: totais.areaAgriculturavel,
          porcentagem: totais.areaAgriculturavel / totais.areaTotal
        },
        areaVegetacao: {
          hectares: totais.areaVegetacao,
          porcentagem: totais.areaVegetacao / totais.areaTotal
        },
        areaOutras: {
          hectares: areaOutras,
          porcentagem: areaOutras / totais.areaTotal
        }
      },
      culturas: new Array(),
      estados: new Array()
    }

    const quantidadeCulturas = await db
      .from('cultura_produtor')
      .count('*', 'quantidade')
      .firstOrFail()
    const totalPorCultura = await db
      .from('culturas')
      .join('cultura_produtor', 'cultura_produtor.cultura_id', 'culturas.id')
      .select('cultura')
      .count('*', 'quantidade')
      .groupBy('cultura')
      .orderBy('cultura')
    for (const totalCultura of totalPorCultura) {
      resultado.culturas.push({
        cultura: totalCultura.cultura,
        quantidade: parseInt(totalCultura.quantidade),
        porcentagem: parseInt(totalCultura.quantidade) / parseInt(quantidadeCulturas.quantidade)
      })
    }

    const totalPorEstado = await db
      .from('produtores')
      .join('cidades', 'cidades.id', 'produtores.cidade_id')
      .select('estado')
      .count('*', 'quantidade')
      .sum('area_agriculturavel', 'areaAgriculturavel')
      .sum('area_vegetacao', 'areaVegetacao')
      .sum('area_total', 'areaTotal')
      .groupBy('estado')
      .orderBy('estado')
    for (const totalEstado of totalPorEstado) {
      const areaOutrasEstado = totalEstado.areaTotal - (totalEstado.areaAgriculturavel + totalEstado.areaVegetacao)
      resultado.estados.push({
        estado: totalEstado.estado,
        quantidade: parseInt(totalEstado.quantidade),
        quantidadePorcentagemBrasil: parseInt(totalEstado.quantidade) / resultado.brasil.quantidade,
        areaTotal: totalEstado.areaTotal,
        areaPorcentagemBrasil: totalEstado.areaTotal / resultado.brasil.areaTotal,
        areaAgriculturavel: {
          hectares: totalEstado.areaAgriculturavel,
          porcentagem: totalEstado.areaAgriculturavel / totalEstado.areaTotal
        },
        areaVegetacao: {
          hectares: totalEstado.areaVegetacao,
          porcentagem: totalEstado.areaVegetacao / totalEstado.areaTotal
        },
        areaOutras: {
          hectares: areaOutrasEstado,
          porcentagem: areaOutrasEstado / totalEstado.areaTotal
        }
      })
    }

    return resultado
  }
}