export class centroCostos {
    
    nombre: string;
    centroCosto: string;
    DirectorCeco: number;
    nombreDirector: string;
    
    constructor(nombre: string, centroCosto: string, DirectorCeco: number, nombreDirector: string){
        
        this.nombre = nombre;
        this.centroCosto = centroCosto;
        this.DirectorCeco = DirectorCeco;
        this.nombreDirector = nombreDirector;
    }

    public static fromJson(element: any) {
        return new centroCostos(element.Title, element.CentroCosto, element.DirectorCecoId, element.DirectorCeco.Title);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}