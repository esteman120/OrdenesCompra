import { Component, Compiler } from '@angular/core';
import { SPServicio } from './Servicios/sp-servicio';
import { Usuario} from './Entidades/usuario'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  usuario: Usuario;
  nombreUsuario: string;


  constructor(private servicio: SPServicio, private compilador: Compiler) {
    this.compilador.clearCache(); 
  }

  public ngOnInit() {
    this.ObtenerUsuarioActual();
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuario = new Usuario(respuesta.Title, respuesta.Email, respuesta.Id);        
        this.nombreUsuario = this.usuario.nombre;
        this.servicio.obtenerJefe(this.usuario.id).then(
          (res)=>{
            
            if (res[0].JefeId !== null) {
              this.usuario.IdJefeDirecto = res[0].JefeId;
              this.usuario.NombreJefeDirecto = res[0].Jefe.Title;
              this.usuario.EmailJefeDirecto = res[0].Jefe.EMail;
            }
            this.usuario.Area = res[0].Area;
            sessionStorage.setItem('usuario', JSON.stringify(this.usuario)); 
            console.log(res);
          }
        ).catch(
          (error)=>{
              console.log(error);
          }
        );
               
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  }
}
