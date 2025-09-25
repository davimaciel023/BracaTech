import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonList, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRange, IonNote } from '@ionic/angular/standalone';
import { CalcService, FenceParams } from '../../../core/services/calc.service';
import { CurrencyBrPipe } from '../../../shared/pipes/currency-br.pipe';
import { MetersToBracaPipe } from '../../../shared/pipes/meters-to-braca.pipe';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { AuthService } from '../../../core/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonList, IonSelect, IonSelectOption,
    IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRange, IonNote,
    CurrencyBrPipe, MetersToBracaPipe, DecimalPipe
  ],
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent {
  private fb = inject(FormBuilder)
  private calc = inject(CalcService)
  private db = inject(Firestore)
  private auth = inject(AuthService)


  form = this.fb.group({
    perimeterM: [1000, [Validators.required, Validators.min(1)]],
    bracaM: [2.2, [Validators.required, Validators.min(0.1)]],
    postSpacingM: [2.5, [Validators.required, Validators.min(0.5)]],
    strands: [5, [Validators.required, Validators.min(1)]],
    lossPct: [5, [Validators.min(0), Validators.max(30)]],
    terrainFactor: [1, Validators.required],
    gates: [0, [Validators.min(0)]],
    laborModel: ['perMeter', Validators.required],
    laborValue: [2.5, [Validators.required, Validators.min(0)]],
    taxesPct: [0, [Validators.min(0), Validators.max(100)]],


    pricePostLine: [15, [Validators.required, Validators.min(0)]],
    pricePostCorner: [40, [Validators.required, Validators.min(0)]],
    priceWirePerM: [0.8, [Validators.required, Validators.min(0)]],
    priceStaple: [0.15, [Validators.required, Validators.min(0)]],
    priceGate: [300, [Validators.required, Validators.min(0)]]
  })


  get result() {
    const v = this.form.getRawValue()
    const params: FenceParams = {
      perimeterM: Number(v.perimeterM),
      bracaM: Number(v.bracaM),
      postSpacingM: Number(v.postSpacingM),
      strands: Number(v.strands),
      lossPct: Number(v.lossPct) / 100,
      terrainFactor: Number(v.terrainFactor),
      labor: { model: v.laborModel as any, value: Number(v.laborValue) },gates: Number(v.gates) || 0,
      taxesPct: Number(v.taxesPct) / 100,
      staplesPerPostPerStrand: 1.2
    }
    const prices = {
      postLine: Number(v.pricePostLine),
      postCorner: Number(v.pricePostCorner),
      wirePerM: Number(v.priceWirePerM),
      stapleUnit: Number(v.priceStaple),
      gateUnit: Number(v.priceGate)
    }
    return this.calc.compute(params, prices)
  }


  async salvar() {
    const user = await firstValueFrom(this.auth.user$)
    const ownerId = user?.uid || 'anon'
    const v = this.form.getRawValue()
    const summary = this.result


    const payload = {
      ownerId,
      status: 'simulation',
      name: `Simulação ${new Date().toLocaleDateString()}`,
      braçaM: v.bracaM,
      params: {
      perimeterM: v.perimeterM,
      postSpacingM: v.postSpacingM,
      strands: v.strands,
      lossPct: v.lossPct / 100,
      terrainFactor: v.terrainFactor,
      labor: { model: v.laborModel, value: v.laborValue },
      gates: v.gates,
      taxesPct: v.taxesPct / 100
      },
      prices: {
      postLine: v.pricePostLine,
      postCorner: v.pricePostCorner,
      wirePerM: v.priceWirePerM,
      stapleUnit: v.priceStaple,
      gateUnit: v.priceGate
      },
      summary,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as const


    await addDoc(collection(this.db, 'projects'), payload as any)
    alert('Simulação salva!')
  }
}
