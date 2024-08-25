import { Component } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-app-personas",
  templateUrl: "./app-personas.component.html",
  styleUrl: "./app-personas.component.scss",
})
export class AppPersonasComponent {
  displayedColumns = [
    "id",
    "nombre",
    "f_nacimiento",
    "ciudad",
    "avatar",
    "edit",
  ];
  dataSource: any[];

  constructor() {
    this.dataSource = [];
    this.getPeople();
  }

  async getPeople() {
    const result = await fetch(
      "http://localhost:8000/api/core/get/list/Persona/"
    );

    const response = (await result.json()) as any[];
    this.dataSource = response;
  }

  async addPerson() {
    type AddPersonForm = {
      nombre: string;
      ciudad: string;
      f_nacimiento: Date;
    };

    let nombreInput: HTMLInputElement;
    let ciudadInput: HTMLInputElement;
    let f_nacimientoInput: HTMLInputElement;

    Swal.fire<AddPersonForm>({
      title: "Agregar persona",
      html: `
    <input type="text" id="nombre" class="swal2-input" placeholder="Nombre completo">
    <input type="text" id="ciudad" class="swal2-input" placeholder="Ciudad">
    <input type="date" id="f_nacimiento" style="width:65%;" class="swal2-input" placeholder="Fecha de nacimiento">
  
    `,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        nombreInput = popup.querySelector("#nombre") as HTMLInputElement;
        ciudadInput = popup.querySelector("#ciudad") as HTMLInputElement;
        f_nacimientoInput = popup.querySelector("#f_nacimiento") as HTMLInputElement;
        nombreInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        ciudadInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
        f_nacimientoInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const nombre = nombreInput.value;
        const ciudad = ciudadInput.value;
        const f_nacimiento = f_nacimientoInput.value;
        if (!nombre || !ciudad || !f_nacimiento)  {
          Swal.showValidationMessage(`Por favor rellene los campos`);
        }
        return { nombre, ciudad, f_nacimiento };
      },
    });
  }

  deletePerson(person: any) {
    Swal.fire({
      title: "¡Precaución!",
      text: `¿Está seguro que desea eliminar a ${person.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "crimson",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        const response = await fetch(
          `http://localhost:8000/api/core/delete/Persona/${person.id}/`,
          {
            method: "DELETE",
          }
        );

        if (response.status >= 200 && response.status <= 205) {
          Swal.fire({
            title: "Eliminado",
            text: `${person.nombre} se ha eliminado de los registros`,
            icon: "success",
          }).then((ok) => {
            if (ok.value) {
              this.getPeople();
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `No se pudo eliminar a ${person.nombre}`,
            icon: "error",
          });
        }
      }
    });
  }
}
