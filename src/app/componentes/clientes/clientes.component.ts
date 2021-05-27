import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  txtBuscar?: string;

  @ViewChild('clienteForm') clienteForm?: NgForm;
  @ViewChild('botonCerrar') botonCerrar?: ElementRef;

  constructor(
    private clientesServicio: ClienteServicio,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes != null) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo || 0;
      });
    }
    return saldoTotal;
  }

  agregar({ value, valid }: { value: Cliente; valid: boolean | null }) {
    if (!valid) {
      this.flashMessages.show('Por Favor llena el formulario correctamente!', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      //agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm?.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(): void {
    this.botonCerrar?.nativeElement.click();
  }

  buscarCliente({ value, valid }: { value: string; valid: boolean | null }) {
    let txtBuscar: any = value;
    if (!valid) {
      return;
    } else {
      this.clientesServicio.buscarCliente(txtBuscar['buscar']).subscribe(
        (data: any) => {
          if (data) {
            this.clientes = data;
          } else {
            this.clientes = [];
          }
        },
        (err) => {
          console.log('Error Busqueda ', err);
        }
      );
    }
  }

  borrarBusqueda() {
    this.txtBuscar = '';
    this.clientesServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
}
