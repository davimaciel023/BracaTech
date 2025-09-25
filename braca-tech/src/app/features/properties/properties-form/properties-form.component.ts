import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { AuthService } from '../../../core/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-properties-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
  templateUrl: './properties-form.component.html',
  styleUrls: ['./properties-form.component.scss'],
})
export class PropertiesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private db = inject(Firestore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  form = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    perimeterM: [0],
    areaHa: [0],
  });

  isEdit = false;

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      const ref = doc(this.db, `properties/${id}`);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        this.form.patchValue({ id, ...(snap.data() as any) });
      }
    }
  }

  async save(): Promise<void> {
    const user = await firstValueFrom(this.auth.user$);
    const ownerId = user?.uid || '';
    const v = this.form.getRawValue();

    if (this.isEdit && v.id) {
      await setDoc(
        doc(this.db, `properties/${v.id}`),
        { ...v, ownerId, updatedAt: serverTimestamp() },
        { merge: true }
      );
    } else {
      await addDoc(collection(this.db, 'properties'), {
        ...v,
        ownerId,
        createdAt: serverTimestamp(),
      });
    }

    this.router.navigateByUrl('/properties');
  }
}
