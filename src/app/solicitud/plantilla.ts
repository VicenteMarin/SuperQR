export class solicitud{
    sid: number;
    correo: string;
    query: string;
    fecha: Date;
    nGrupo: number;
    constructor(sid: number, correo: string, query: string, fecha: Date, nGrupo: number){
        this.sid = sid;
        this.correo = correo;
        this.query = query;
        this.fecha = fecha;
        this.nGrupo = nGrupo;
    }
}

export function getSolicitudes(): solicitud[]{
    let s1 = new solicitud(0, 'lmartinez@saludintegral.cl', 'Campaña publicitaria de un medicamento para los dolores articulares', new Date("2024-10-01"), 24);
    let s2 = new solicitud(0, 'jefe@panaderiagordo.com', 'Ofertas en sandwiches con bebida', new Date("2024-5-20"), 39);
    let solicitudes = [s1, s2];
    return solicitudes
}