import { Injectable } from '@angular/core'
export type LaborModel = 'daily' | 'hourly' | 'perMeter'


export interface FenceParams {
  perimeterM: number
  bracaM: number // ex.: 2.2
  postSpacingM: number // ex.: 2.5
  cornerPostEveryM?: number // opcional
  strands: number // nº de fios
  lossPct: number // 0.05 = 5%
  terrainFactor: number // 1, 1.15, 1.3
  labor: {
    model: LaborModel;
    value: number
  }
  gates?: number // nº de portões
  staplesPerPostPerStrand?: number // grampos
  taxesPct?: number // 0.12 = 12%
}


export interface CalcResult {
  bracas: number
  posts: {
    line: number;
    corner: number;
    total: number
  }
  wireM: number // arame total em metros
  staples: number // grampos
  materialsCost: number // R$
  laborCost: number // R$
  taxes: number // R$
  total: number // R$
}


@Injectable({ providedIn: 'root' })
  export class CalcService {
    metersToBraca(m: number, bracaM = 2.2) {
    return m / bracaM
  }
  bracaToMeters(b: number, bracaM = 2.2) {
    return b * bracaM
  }


  compute(params: FenceParams, prices: {
    postLine: number
    postCorner: number
    wirePerM: number
    stapleUnit: number
    gateUnit?: number
  }): CalcResult {
    const bracas = this.metersToBraca(params.perimeterM, params.bracaM)

    // Postes
    const cornerEvery = params.cornerPostEveryM ?? (params.perimeterM / Math.max(1, Math.floor(params.perimeterM / 1000))) // fallback simples
    const cornerPosts = Math.max(4, Math.round(params.perimeterM / cornerEvery))
    const linePosts = Math.ceil(params.perimeterM / params.postSpacingM) + cornerPosts
    const totalPosts = linePosts + cornerPosts


    // Arame (m)
    const wireM = params.perimeterM * params.strands * (1 + params.lossPct)
    // Grampos
    const k = params.staplesPerPostPerStrand ?? 1.2 // média
    const staples = Math.ceil(linePosts * params.strands * k)


    // Custos materiais
    const gateCost = (params.gates ?? 0) * (prices.gateUnit ?? 0)
    const materialsCost = linePosts * prices.postLine + cornerPosts * prices.postCorner + wireM * prices.wirePerM + staples * prices.stapleUnit + gateCost


    // Mão de obra
    let laborCost = 0
    const rendDia = 120 // m/dia (preset simples)
    const rendHora = 15 // m/h (preset simples)

    if (params.labor.model === 'daily') {
      const days = (params.perimeterM / rendDia) * params.terrainFactor
      laborCost = Math.ceil(days * 100) / 100 * params.labor.value

    } else if (params.labor.model === 'hourly') {
      const hours = (params.perimeterM / rendHora) * params.terrainFactor
      laborCost = Math.ceil(hours * 100) / 100 * params.labor.value

    } else {
      laborCost = params.perimeterM * params.labor.value

    }


    const subtotal = materialsCost + laborCost
    const taxes = subtotal * (params.taxesPct ?? 0)
    const total = subtotal + taxes


    return {
      bracas,
      posts: {
        line: linePosts,
        corner: cornerPosts,
        total: totalPosts
      },
      wireM: Math.round(wireM),
      staples,
      materialsCost,
      laborCost,
      taxes,
      total,
    }
  }
}
