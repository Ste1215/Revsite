import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  const firebaseConfig = {
    apiKey: "AIzaSyCZJwZdHgACzfpMi8FjJ7fSB8pKo_PGk-c",
    authDomain: "revsite1.firebaseapp.com",
    databaseURL: "https://revsite1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "revsite1",
    storageBucket: "revsite1.appspot.com",
    messagingSenderId: "632242880441",
    appId: "1:632242880441:web:76e8917429e84b6a394068"
  };
const app = initializeApp(firebaseConfig);

