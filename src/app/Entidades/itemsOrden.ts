export class itemsOrden {
    
    id: number;
    Title: string;
    Elemento: string;
    Especificaciones: string;
    Cantidad: number;
    ValorUnitario: number;
    ValorTotal: number;

  constructor(
    Title: string,
    Elemento: string,
    Especificaciones: string,
    Cantidad: number,
    ValorUnitario: number,
    ValorTotal: number,
    id: number
  ){      
      this.Title = Title;
      this.Elemento = Elemento;
      this.Especificaciones = Especificaciones;
      this.Cantidad = Cantidad;
      this.ValorUnitario = ValorUnitario;
      this.ValorTotal = ValorTotal;
      this.id = id;
  }

  public static fromJson(element: any) {
      return new itemsOrden(element.Title, element.Elemento, element.Especificaciones, element.Cantidad, element.ValorUnitario, element.ValorTotal, element.Id);
  }

  public static fromJsonList(elements: any) {
      var list = [];
      for (var i = 0; i < elements.length; i++) {
          list.push(this.fromJson(elements[i]));
      }
      return list;
  }
}