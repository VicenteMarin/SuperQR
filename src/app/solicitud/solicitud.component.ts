import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../material.module';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { solicitud } from './plantilla';


@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatFormFieldModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent {
  selected: any;
  showData: boolean;
  s1: solicitud;
  person: any;
  solicitudes: any[];
  peopleFormGroup = new FormGroup({
    personControl: new FormControl('', [Validators.required]),
  });

  constructor(){
    this.s1 = new solicitud(0, 'lmartinez@saludintegral.cl', 'Campaña publicitaria de un medicamento para los dolores articulares', new Date("2024-10-01"), 24);
    this.person = this.s1;
    this.showData = false;
    this.solicitudes = [];
    this.getPeople();
  }

  

  async transformarSolicitud(base:any){
    //this.person = base;
    //this.showData = true;
    console.log(base);
  }

  async getSolicitud(person_id: any){
    const result = await fetch(
      `http://localhost:8000/api/core/get/solicitud/${person_id}/`);
    const c = await result.json();
    this.person = await c;
    if (Object.keys(this.person).length) {
      this.showData = true;
    }
  }

  async getPeople(){
    const result = await fetch('http://localhost:8000/api/core/get/list/solicitud/');
    const response = (await result.json()) as any[];
    this.solicitudes = response;
    console.log(response);
    console.log(this.solicitudes);
  }


  async addSolicitud() {
    type AddEmpresaForm = {
      sid: string;
      correo: string;
      query: string;
      gObjetivo: string;
      f_nacimiento: Date;
    };

    let sidInput: HTMLInputElement;
    let correoInput: HTMLInputElement;
    let queryInput: HTMLInputElement;
    let gObjetivoInput: HTMLInputElement;
    let f_nacimientoInput: HTMLInputElement;

    Swal.fire<AddEmpresaForm>({
      title: "Agregar empresa",
      html: `
    <input type="text" id=  sid" class="swal2-input" placeholder="ID solicitud">
    <input type="text" id="correo" class="swal2-input" placeholder="correo">
    <input type="text" id="query" class="swal2-input" placeholder="query">
    <input type="date" id="f_nacimiento" style="width:65%;" class="swal2-input" placeholder="Fecha de solicitud">
    <input type="text" id="gObjetivo" class="swal2-input" placeholder="ID Grupo objetivo">
    `,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        sidInput = popup.querySelector("#sid") as HTMLInputElement;
        correoInput = popup.querySelector("#correo") as HTMLInputElement;
        queryInput = popup.querySelector("#query") as HTMLInputElement;
        gObjetivoInput = popup.querySelector("#gObjetivo") as HTMLInputElement;
        sidInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        correoInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        queryInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        gObjetivoInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        f_nacimientoInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const  sid = sidInput.value;
        const correo = correoInput.value;
        const query = queryInput.value;
        const gObjetivo = gObjetivoInput.value;
        const f_nacimiento = f_nacimientoInput.value;
        if (!correo ||   sid || !query || !gObjetivo || !f_nacimiento)  {
          Swal.showValidationMessage(`Por favor rellene los campos`);
        }
        return {  sid,correo,query,gObjetivo, f_nacimiento };
      },
    });
  }

  //QUÉ FALTA HACER: terminar solicitud, ponerle  al HTML y hacer la clase grupo objetivo
  deleteSolicitud(solicitude: any) {
    Swal.fire({
      title: "¡Precaución!",
      text: `¿Está seguro que desea eliminar la solicitud ${solicitude.sid}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "crimson",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        const response = await fetch(
          `http://localhost:8000/api/core/delete/solicitud/${solicitude.sid}/`,
          {
            method: "DELETE",
          }
        );

        if (response.status >= 200 && response.status <= 205) {
          Swal.fire({
            title: "Eliminado",
            text: `${solicitude} se ha eliminado de los registros`,
            icon: "success",
          }).then((ok) => {
            if (ok.value) {
              this.getPeople();
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `No se pudo eliminar a ${solicitude.sid}`,
            icon: "error",
          });
        }
       Swal.fire({
        title: "¡Borrado con éxito!",
        icon: "success"
       })
      }
    });
  }
}
