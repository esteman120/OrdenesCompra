export class Participacion {
    
      id: number;
      ceco: string;
      nombre: string;
      Njob: string;
      asumido: number;
      idDirectorCECO: number;
      Aprobado: boolean;
      EmailDirector: string;

    constructor(
        ceco: string, 
        nombre: string, 
        Njob: string, 
        asumido: number, 
        id: number, 
        idDirectorCECO: number, 
        Aprobado: boolean,
        EmailDirector: string) {
        
        this.ceco = ceco;
        this.nombre = nombre;
        this.Njob = Njob;
        this.asumido = asumido;
        this.id = id;
        this.idDirectorCECO = idDirectorCECO;
        this.Aprobado = Aprobado;
        this.EmailDirector = EmailDirector;
    }

    public static fromJson(element: any) {
        let Email = element.DirectorCeco.EMail;
        return new Participacion(
            element.Title, 
            element.Nombre, 
            element.NumeroJob, 
            element.PorcentajeAsumido, 
            element.Id, 
            element.DirectorCecoId, 
            element.Aprobado,
            Email);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}