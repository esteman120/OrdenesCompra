export class Participacion {
    
      id: number;
      ceco: string;
      nombre: string;
      Njob: string;
      asumido: string;

    constructor(ceco: string, nombre: string, Njob: string, asumido: string, id: number){
        
        this.ceco = ceco;
        this.nombre = nombre;
        this.Njob = Njob;
        this.asumido = asumido;
        this.id = id;
    }

    public static fromJson(element: any) {
        return new Participacion(element.Title, element.Nombre, element.NumeroJob, element.PorcentajeAsumido, element.Id);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}