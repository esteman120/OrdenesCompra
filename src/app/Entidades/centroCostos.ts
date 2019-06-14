export class centroCostos {
    
    nombre: string;
    centroCosto: string;

    constructor(nombre: string, centroCosto: string){
        
        this.nombre = nombre;
        this.centroCosto = centroCosto;
    }

    public static fromJson(element: any) {
        return new centroCostos(element.Title, element.CentroCosto);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}