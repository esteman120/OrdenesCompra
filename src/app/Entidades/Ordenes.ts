export class Ordenes {
    
    id: number;
    Solicitante: string;
    JefeDirecto: string;
    fechaSolicitud: Date;
    EntidadCompania: string;
    CodEstado: string 

  constructor(
    id: number,
    Solicitante: string,
    JefeDirecto: string,
    fechaSolicitud: Date,
    EntidadCompania: string,
    CodEstado: string
  ){
      
      this.id = id;
      this.Solicitante = Solicitante;
      this.JefeDirecto = JefeDirecto;
      this.fechaSolicitud = fechaSolicitud;
      this.EntidadCompania = EntidadCompania;
      this.CodEstado = CodEstado;
      
  }

  public static fromJson(element: any) { 
    return new Ordenes(element.Id, element.NombreSolicitante.Title, element.JefeDirecto.Title, element.FechaSolicitud, element.Title, element.CodigoEstado);
  }

  public static fromJsonList(elements: any) {
      var list = [];
      for (var i = 0; i < elements.length; i++) {
          list.push(this.fromJson(elements[i]));
      }
      return list;
  }
}