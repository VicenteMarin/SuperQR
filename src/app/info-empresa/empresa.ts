export class empresa {
    eid;
    nombre;
    color;
    rubro;
    constructor(eid: any,nombre: any, color: any, rubro: any) {
      this.eid =eid;
      this.nombre = nombre;
      this.color = color;
      this.rubro = rubro;
    }
}

export function esmpresa(eid: number,nombre: string, color: string, rubro: string) {
  eid = eid;
  nombre = nombre;
  color = color;
  rubro = rubro;
}
export function getEmpresas(): empresa[]{
    let e1 = new empresa(0, 'SaludIntegral', 'Amarillo', 'Medicina');
    let e2 = new empresa(1, 'Empanadas Juan', 'Naranja', 'Alimentacion');
    let empresas = [e1,e2];
    return empresas;
}