import { Injectable } from '@angular/core'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs


@Injectable({ providedIn: 'root' }) export class PdfService {
  async budgetPdf(data: {
    title: string
    summary: any
    bom: Array<{
      name: string
      unit: string
      qty: number
      unitPrice: number
      total: number }>
    }) {
    const dd: any = {
      content: [
      {
        text: data.title,
        style: 'header'
      },
      {
        text: 'Resumo',
        style: 'subheader',
        margin: [0, 10, 0, 4]
      },
      {
        text: JSON.stringify(data.summary, null, 2),
        fontSize: 9
      },
      {
        text: 'Materiais',
        style: 'subheader',
        margin: [0, 10, 0, 4]
      },
      {
        table: {
          widths: ['*', 60, 60, 60, 60],
          body: [
          ['Item', 'Unid.', 'Qtd', 'Preço', 'Total'],
          ...data.bom.map(i => [i.name, i.unit, i.qty, this.currency(i.unitPrice), this.currency(i.total)])
          ]
        }
      }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 13,
          bold: true
        }
      }
    }


    return new Promise<Blob>((resolve) => {
      (pdfMake as any).createPdf(dd).getBlob((blob: Blob) => resolve(blob))
    })
  }


  currency(v: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(v || 0)
  }
}
