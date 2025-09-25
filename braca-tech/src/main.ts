/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({ projectId: "braca-tech", appId: "1:404129644080:web:b3c6095b45f3d33dcf77f5", storageBucket: "braca-tech.firebasestorage.app", apiKey: "AIzaSyCcTZNxbSOH2Rq1yNlF5tF0qIYNuo2YxlE", authDomain: "braca-tech.firebaseapp.com", messagingSenderId: "404129644080" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "braca-tech", appId: "1:404129644080:web:b3c6095b45f3d33dcf77f5", storageBucket: "braca-tech.firebasestorage.app", apiKey: "AIzaSyCcTZNxbSOH2Rq1yNlF5tF0qIYNuo2YxlE", authDomain: "braca-tech.firebaseapp.com", messagingSenderId: "404129644080" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
});
