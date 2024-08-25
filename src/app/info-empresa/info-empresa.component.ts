import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { empresa } from './empresa';

@Component({
  selector: 'app-info-empresa',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './info-empresa.component.html',
  styleUrl: './info-empresa.component.scss'
})



export class InfoEmpresaComponent {
  empresalist: any[];
  empresas: any[];

  constructor() {
    this.empresalist = [];
    this.getPeople();
    this.empresas = [this.empresalist];
  }

  async getPeople(){
    const result = await fetch('http://localhost:8000/api/core/get/list/classname/');
    const response = (await result.json()) as any[];
    this.empresalist = response;
    console.log(this.empresalist);
  }

  

  async addEmpresa() {
    type AddEmpresaForm = {
      eid: string;
      nombre: string;
      color: string;
      rubro: string;
    };

    let eidInput: HTMLInputElement;
    let nombreInput: HTMLInputElement;
    let colorInput: HTMLInputElement;
    let rubroInput: HTMLInputElement;

    Swal.fire<AddEmpresaForm>({
      title: "Agregar empresa",
      html: `
    <input type="text" id="eid" class="swal2-input" placeholder="ID empresa">
    <input type="text" id="nombre" class="swal2-input" placeholder="Nombre empresa">
    <input type="text" id="color" class="swal2-input" placeholder="Color empresa">
    <input type="text" id="rubro" class="swal2-input" placeholder="Rubro empresa">
    `,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        eidInput = popup.querySelector("#eid") as HTMLInputElement;
        nombreInput = popup.querySelector("#nombre") as HTMLInputElement;
        colorInput = popup.querySelector("#color") as HTMLInputElement;
        rubroInput = popup.querySelector("#rubro") as HTMLInputElement;
        eidInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        nombreInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        colorInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        rubroInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const eid = eidInput.value;
        const nombre = nombreInput.value;
        const color = colorInput.value;
        const rubro = rubroInput.value;
        if (!nombre || !eid || !color || !rubro)  {
          Swal.showValidationMessage(`Por favor rellene los campos`);
        }
        return { eid,nombre,color,rubro };
      },
    });
  }
  deleteEmpresa(empresa: any) {
    Swal.fire({
      title: "¡Precaución!",
      text: `¿Está seguro que desea eliminar a ${empresa.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "crimson",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        const response = await fetch(
          `http://localhost:8000/api/core/delete/classname/${empresa.eid}/`,
          {
            method: "DELETE",
          }
        );

        if (response.status >= 200 && response.status <= 205) {
          Swal.fire({
            title: "Eliminado",
            text: `${empresa.nombre} se ha eliminado de los registros`,
            icon: "success",
          }).then((ok) => {
            if (ok.value) {
              this.getPeople();
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `No se pudo eliminar a ${empresa.nombre}`,
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
