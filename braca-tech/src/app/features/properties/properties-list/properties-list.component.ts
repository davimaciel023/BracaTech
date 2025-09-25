import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
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

interface Property {
  id?: string;
  ownerId: string;
  name: string;
  perimeterM?: number;
  areaHa?: number;
}

@Component({
  selector: 'app-properties-list',
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
    // necessários para *ngFor e |async
    AsyncPipe,
    NgFor,
  ],
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
})
export class PropertiesListComponent implements OnInit {
  private db = inject(Firestore);
  private auth = inject(AuthService);
  private router = inject(Router);

  props$!: Observable<Property[]>;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      const ownerId = user?.uid || '';
      const col = collection(this.db, 'properties');
      const q = query(col, where('ownerId', '==', ownerId), orderBy('name'));
      this.props$ = collectionData(q, { idField: 'id' }) as unknown as Observable<Property[]>;
    });
  }

  novo(): void {
    this.router.navigateByUrl('/properties/new');
  }

  edit(p: Property): void {
    this.router.navigateByUrl(`/properties/${p.id}`);
  }
}
