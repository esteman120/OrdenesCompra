import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SPServicio } from '../Servicios/sp-servicio';
import { Usuario } from '../Entidades/usuario';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import SimpleCrypto from "simple-crypto-js";
import { Ordenes } from '../Entidades/Ordenes';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-mis-pendientes',
  templateUrl: './mis-pendientes.component.html',
  styleUrls: ['./mis-pendientes.component.css']
})
export class MisPendientesComponent implements OnInit {

  usuarioActual: Usuario;
  empty: boolean;
  dataSource;
  dataSource2;
  
  @ViewChild('MisPendientesPaginador', {read: MatPaginator, static:true}) MisPendientesPaginador: MatPaginator;
  @ViewChild('MisOrdenesPaginador', {read: MatPaginator, static:true}) MisOrdenesPaginador: MatPaginator;

  ObjOrdenes: Ordenes[];
  ObjOrdenes2: Ordenes[];
  empty2: boolean;
  

  constructor(private servicio: SPServicio,public toastr: ToastrManager,     
    private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,private router: Router) { 
  }

  displayedColumns: string[] = ['NumeroOrden','Solicitante','JefeDirecto','fechaSolicitud','EntidadCompania','Estado','acciones'];
  displayedColumns2: string[] = ['NumeroOrden','Solicitante','JefeDirecto','fechaSolicitud','EntidadCompania','Estado','acciones'];

  ngOnInit() {
    this.spinnerService.show();
    let usuarioActual = sessionStorage.getItem("usuario");    
    this.usuarioActual = JSON.parse(usuarioActual);

    this.ObtenerUsuarioActual();
    // this.ObtenerOrdenes();
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.Email, respuesta.Id);        
        
        this.servicio.obtenerJefe(this.usuarioActual.id).then(
          (res)=>{
            
            if (res[0].JefeId !== null) {
              this.usuarioActual.IdJefeDirecto = res[0].JefeId;
              this.usuarioActual.NombreJefeDirecto = res[0].Jefe.Title;
              this.usuarioActual.EmailJefeDirecto = res[0].Jefe.EMail;
            }
            this.usuarioActual.Area = res[0].Area;
            this.ObtenerOrdenes();
          }
        ).catch(
          (error)=>{
              console.log(error);
          }
        );
               
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
        this.mostrarError("Se ha producido un error al cargar el formulario");
      }
    )
  }

  ObtenerOrdenes(): any {
    this.servicio.obtenerOrdenesPendientes(this.usuarioActual.id).then(
      (respuesta)=>{
        if (respuesta.length > 0) {
          this.empty = false;
          this.ObjOrdenes = Ordenes.fromJsonList(respuesta);
          this.dataSource = new MatTableDataSource(this.ObjOrdenes);
          this.dataSource.paginator = this.MisPendientesPaginador;
          this.obtenerMisOrdenes(this.usuarioActual.id);
          this.spinnerService.hide();
        }
        else {
          this.empty = true;
          this.obtenerMisOrdenes(this.usuarioActual.id);
        }
      }
    )
    .catch(
      (error)=>{
        console.log(error);
        
      }
    )
  }

  obtenerMisOrdenes(id: number): any {
    this.servicio.obtenerMisOrdenes(this.usuarioActual.id).then(
      (respuesta)=>{
        if (respuesta.length > 0) {
          this.empty2 = false;
          this.ObjOrdenes2 = Ordenes.fromJsonList(respuesta);
          this.dataSource2 = new MatTableDataSource(this.ObjOrdenes2);
          this.dataSource2.paginator = this.MisOrdenesPaginador;     
          this.spinnerService.hide();
        }
        else {
          this.empty2 = true;
        }
      }
    )
    .catch(
      (error)=>{
        console.log(error);
        
      }
    )
  }

  AbrirOrden(id, CodEstado){
    
    let idOrden = "U2FsdGVkX182"+id;
    
    if (CodEstado === 6 || CodEstado === 5) {
      this.router.navigateByUrl('/editar-orden?id='+idOrden)
      // this.router.navigate(['/editar-orden?id='+idOrden]);
    }
    else{
      this.router.navigateByUrl('/Ver-Orden-Compra?id='+idOrden)
      // this.router.navigate(['/Ver-Orden-Compra?id='+idOrden]);
    }
    
  }

  MostrarExitoso(mensaje: string) {
    this.toastr.successToastr(mensaje, 'Confirmación!');
  }

  mostrarError(mensaje: string) {
    this.toastr.errorToastr(mensaje, 'Oops!');
  }

  mostrarAdvertencia(mensaje: string) {
    this.toastr.warningToastr(mensaje, 'Validación');
  }

  mostrarInformacion(mensaje: string) {
    this.toastr.infoToastr(mensaje, 'Información importante');
  }

}
