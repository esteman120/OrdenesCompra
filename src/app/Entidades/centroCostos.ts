export class centroCostos {
    
    nombre: string;
    centroCosto: string;
    DirectorCeco: number;
    
    constructor(nombre: string, centroCosto: string, DirectorCeco: number){
        
        this.nombre = nombre;
        this.centroCosto = centroCosto;
        this.DirectorCeco = DirectorCeco;
    }

    public static fromJson(element: any) {
        return new centroCostos(element.Title, element.CentroCosto, element.DirectorCecoId);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}