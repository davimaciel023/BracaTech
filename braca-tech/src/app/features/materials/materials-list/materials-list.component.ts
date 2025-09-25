import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, CurrencyPipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

interface Material {
  id?: string;
  ownerId: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  active: boolean;
}

@Component({
  selector: 'app-materials-list',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
    // Necessários para *ngFor, |async e |currency
    AsyncPipe,
    NgFor,
    CurrencyPipe,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent implements OnInit {
  private db = inject(Firestore);
  private auth = inject(AuthService);
  private router = inject(Router);

  materials$!: Observable<Material[]>;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      const ownerId = user?.uid || '';
      const col = collection(this.db, 'materials');
      const q = query(col, where('ownerId', '==', ownerId), orderBy('name'));
      this.materials$ = collectionData(q, {
        idField: 'id',
      }) as unknown as Observable<Material[]>;
    });
  }

  new(): void {
    this.router.navigateByUrl('/materials/new');
  }

  edit(m: Material): void {
    this.router.navigateByUrl(`/materials/${m.id}`);
  }
}
