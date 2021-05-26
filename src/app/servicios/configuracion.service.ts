import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from '../modelo/configuracion.model';

@Injectable()
export class ConfiguracionService {
  configuracionDoc: AngularFirestoreDocument<Configuracion>|any;
  configuracion: Observable<Configuracion>|any;

  //id unico de la coleccion con valor 1
  id = "1";


  constructor(private db: AngularFirestore) {}

  getConfiguracion(): Observable<Configuracion> {
    this.configuracionDoc = this.db.doc<Configuracion>(
      `configuracion/${this.id}`
    );
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }

  modificarConfiguracion(configuracion: Configuracion) {
    this.configuracionDoc = this.db.doc<Configuracion>(
      `configuracion/${this.id}`
    );
    this.configuracionDoc.update(configuracion);
  }
}