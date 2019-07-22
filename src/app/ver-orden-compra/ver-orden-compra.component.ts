import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from '../Entidades/usuario';
import { SPServicio } from '../Servicios/sp-servicio';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { centroCostos } from '../Entidades/centroCostos';
import SimpleCrypto from "simple-crypto-js";
import { Participacion } from '../Entidades/participacion';
import { itemsOrden } from '../Entidades/itemsOrden';
import { EmailProperties } from '@pnp/sp';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-ver-orden-compra',
  templateUrl: './ver-orden-compra.component.html',
  styleUrls: ['./ver-orden-compra.component.css']
})
export class VerOrdenCompraComponent implements OnInit {

  VerOrdenForm: FormGroup; 
  modalRef: BsModalRef;
  panelOpenState = false;
  panelOpenState1 = false;
  CentroCosto: centroCostos[];
  validarNombreCECO: boolean;
  validarCECO: boolean;
  validarNJOB: boolean;
  validarPorcentajeCECO: boolean;
  Reembolso: boolean;
  NumeroIdentificador: any;
  item: string;
  Cantidad: number;
  ValorUnitario: number;
  ElementoServicio: string;
  Especificaciones: string;
  validarItem: boolean;
  validarCantidad: boolean;
  validarValorUnitario: boolean;
  validarElementoServicio: boolean;
  validarEspecificaciones: boolean;
  ItemsGuardar: itemsOrden[];
  Total: number;
  Subtotal: number;
  Iva: number;
  usuarioActual: Usuario;
  SolicitadoPor: any;
  idOrdenCompra: string;
  ObjOrdenCompra: any;
  CodigoEstado: any;
  usuarioSolicitante: any;
  firmaUsuario: any[];
  UsuarioJefe: any;
  firmaJefe: any[];
  usuarioGerenteAdmin: any;
  firmaGerente: any;
  nombreUsuario: any;
  nombreGerente: any;
  nombreJefe: any;
  participacion: Participacion[];
  emailJefe: any;
  emailUsuario: any;
  emailGerente: any;
  idUsuario: any;
  idJefe: any;
  idGerente: any;
  EstadoSiguiente: string;
  ResponsableSiguiente: string;
  motivoDevolucion: string;
  validarDevolucion: boolean;
  PorcentajeIva: any;
  PorcentajeIvaUtilizar: number;
  TieneIva: boolean;
  SoloLectura: boolean;

  constructor(
    private servicio: SPServicio,
    private modalService: BsModalService,
    private formBuilder: FormBuilder, 
    public toastr: ToastrManager, 
    private spinner: NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router,    
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.validarNombreCECO = false;
    this.validarCECO = false;
    this.validarNJOB = false;
    this.validarPorcentajeCECO = false;
    this.Reembolso = true;
    this.item = "";
    this.Cantidad = 0;
    this.ValorUnitario = 0;
    this.ElementoServicio = "";
    this.Especificaciones = "";
    this.validarItem = false;
    this.validarCantidad = false;
    this.validarValorUnitario = false;
    this.validarElementoServicio = false;
    this.validarEspecificaciones = false;
    this.Total = 0;
    this.Subtotal = 0;
    this.Iva = 0;
    this.motivoDevolucion = "";
    this.validarDevolucion = false;
    this.NumeroIdentificador = Math.floor(
      Math.random() * (999 - 100 + 1) + 100
    );    
    this.PorcentajeIva = 0;
    this.PorcentajeIvaUtilizar = 0;
    this.TieneIva = true;
    this.SoloLectura = false;
  }

  ngOnInit() {
    this.VerOrdenForm = this.formBuilder.group({
      nroOrden: [""],
      EmpresaSolicitante: ["",  Validators.required],
      EntidadCompania: ["", Validators.required],
      PersonaContacto: ["", Validators.required],
      TelefonoContacto: ["", Validators.required],
      EmailContacto: ["", [Validators.required]],
      Ciudad: ["", Validators.required],
      Paginas: ["", Validators.required],
      JobNumero: ["", Validators.required],
      DescripcionJob: ["", Validators.required],
      Reembolsable: ["true", Validators.required],
      NombreCECO: [""],
      CECO: [""],
      NumeroJobCECO: [""],
      PorcentajeAsumidoCECO: [""],
      FechaSolicitud: ["", Validators.required],
      TiempoEntrega: ["", Validators.required],
      RubroPresupuesto: ["", Validators.required],
      JustificacionGasto: ["", Validators.required],
      IvaSiNo: ["si", Validators.required],
      TipoMoneda: ["COP", Validators.required]
    }); 
    this.ObtenerUsuarioActual();
    
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.Email, respuesta.Id);        
        this.SolicitadoPor = this.usuarioActual.id;
        this.servicio.obtenerJefe(this.usuarioActual.id).then(
          (res)=>{
            
            if (res[0].JefeId !== null) {
              this.usuarioActual.IdJefeDirecto = res[0].JefeId;
              this.usuarioActual.NombreJefeDirecto = res[0].Jefe.Title;
              this.usuarioActual.EmailJefeDirecto = res[0].Jefe.EMail;
            }
            this.usuarioActual.Area = res[0].Area;
            this.consultarOrden();
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

  getParams(url){
    let params = {};
  	let parser = document.createElement('a');
  	parser.href = url;
  	let query = parser.search.substring(1);
  	let vars = query.split('&');
  	for (let i = 0; i < vars.length; i++) {
  		let pair = vars[i].split('=');
  		params[pair[0]] = decodeURIComponent(pair[1]);
  	}
  	return params;
  }

  consultarOrden(): any {
    
    let Parametro = this.getParams(window.location.href);    
    this.idOrdenCompra = Parametro["id"].substring(12, Parametro["id"].length);
    
    this.servicio.obtenerOrdenCompra(this.idOrdenCompra).then(
      (respuesta)=>{
        this.ObjOrdenCompra = respuesta;
        this.VerOrdenForm.controls["EntidadCompania"].setValue(this.ObjOrdenCompra.Title);
        this.VerOrdenForm.controls["PersonaContacto"].setValue(this.ObjOrdenCompra.PersonaContacto);
        this.VerOrdenForm.controls["TelefonoContacto"].setValue(this.ObjOrdenCompra.TelefonoContacto);
        this.VerOrdenForm.controls["EmailContacto"].setValue(this.ObjOrdenCompra.EmailContacto);
        this.VerOrdenForm.controls["Ciudad"].setValue(this.ObjOrdenCompra.Ciudad);
        this.VerOrdenForm.controls["Paginas"].setValue(this.ObjOrdenCompra.PaginasEnviadas);
        this.VerOrdenForm.controls["JobNumero"].setValue(this.ObjOrdenCompra.JobNumero);
        this.VerOrdenForm.controls["DescripcionJob"].setValue(this.ObjOrdenCompra.DescripcionJob);
        if (this.ObjOrdenCompra.Reembolsable === true) {
          this.VerOrdenForm.controls["Reembolsable"].setValue("true");          
        }
        else{
          this.VerOrdenForm.controls["Reembolsable"].setValue("false");
          this.obtenerParticipacion();
        }
        
        this.Reembolso = this.ObjOrdenCompra.Reembolsable;
        this.VerOrdenForm.controls["NombreCECO"].setValue(this.ObjOrdenCompra.NombreCECO);
        this.VerOrdenForm.controls["CECO"].setValue(this.ObjOrdenCompra.CECO);
        this.VerOrdenForm.controls["NumeroJobCECO"].setValue(this.ObjOrdenCompra.NumeroJobCECO);
        this.VerOrdenForm.controls["PorcentajeAsumidoCECO"].setValue(this.ObjOrdenCompra.PorcentajeAsumidoCECO);
        this.VerOrdenForm.controls["FechaSolicitud"].setValue(this.ObjOrdenCompra.FechaSolicitud);
        this.VerOrdenForm.controls["TiempoEntrega"].setValue(this.ObjOrdenCompra.TiempoEntrega);
        this.VerOrdenForm.controls["RubroPresupuesto"].setValue(this.ObjOrdenCompra.RubroPresupuesto);
        this.VerOrdenForm.controls["JustificacionGasto"].setValue(this.ObjOrdenCompra.JustificacionGasto); 
        let coniva = this.ObjOrdenCompra.ConIva === true? "si": "no";      
        this.VerOrdenForm.controls["IvaSiNo"].setValue(coniva);
        this.VerOrdenForm.controls["TipoMoneda"].setValue(this.ObjOrdenCompra.Moneda);
        this.VerOrdenForm.controls["nroOrden"].setValue(this.ObjOrdenCompra.Consecutivo);
        this.VerOrdenForm.controls["EmpresaSolicitante"].setValue(this.ObjOrdenCompra.EmpresaSolicitante);
        this.PorcentajeIvaUtilizar = this.ObjOrdenCompra.PorcentajeIva;
        this.CodigoEstado = this.ObjOrdenCompra.CodigoEstado;
        if (this.CodigoEstado === 2 && this.usuarioActual.id === this.ObjOrdenCompra.ResponsableActualId) {
          this.SoloLectura = true;
        } 
        else if (this.CodigoEstado === 3 && this.usuarioActual.id === this.ObjOrdenCompra.ResponsableActualId) {
          this.SoloLectura = true;
        }
        // if(this.CodigoEstado === 5 || this.CodigoEstado === 6){
        //   this.router.navigate(['/editar-orden', Parametro]);
        // }
        this.usuarioSolicitante = this.ObjOrdenCompra.NombreSolicitanteId;
        this.UsuarioJefe = this.ObjOrdenCompra.JefeDirectoId;
        
        this.obtenerFirmas();
        this.ObtenerItems();
      }
    ).catch(
      (error)=>{
        this.mostrarError("Error al cargar la orden");
        console.log(error);
      }
    )
    
  }

  ObtenerItems(): any {

    this.servicio.obtenerItems(this.idOrdenCompra).then(
        (res)=>{
            this.ItemsGuardar = itemsOrden.fromJsonList(res);
            this.ItemsGuardar.map(x=>{
              this.Total = this.Total + x.ValorTotal;
          });
      
          this.Iva = this.Total * (this.PorcentajeIvaUtilizar/100);
          this.Subtotal = this.Total - this.Iva;
        }
      ).catch(
        (error)=>{
          this.mostrarError("Error al cargar la orden");
          console.log(error);  
        }
      );    
  }

  obtenerParticipacion(): any {
    this.servicio.obtenerParticipacion(this.idOrdenCompra).then(
      (res)=>{
          this.participacion = Participacion.fromJsonList(res);
      }
    ).catch(
      (error)=>{
        this.mostrarError("Error al cargar la orden");
        console.log(error);
      }
    );
  }

  obtenerFirmas(): any {    
    this.obtenerfirmaUsuario();
    this.obtenerfirmaJefe();
    this.obtenerfirmaGerente();
  }

  obtenerfirmaGerente(): any {
    this.servicio.ValidarUsuarioGerente().then(
      (res)=>{
        this.usuarioGerenteAdmin = res[0].GerenteAdministrativoId;
        this.servicio.obtenerFirmas(this.usuarioGerenteAdmin).then(
          (respuesta)=>{
            this.nombreGerente = respuesta[0].Title;
            this.emailGerente = respuesta[0].usuario.EMail;
            this.idGerente = respuesta[0].usuarioId;
            if (respuesta[0].UrlFirma !== null) {
              this.firmaGerente = respuesta[0].UrlFirma.Url;
            }       
          }
        ).catch(
          (error)=>{
            this.mostrarError("Error al cargar las firmas");
            console.log(error);
          }
        )
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  obtenerfirmaUsuario(): any {
    this.servicio.obtenerFirmas(this.usuarioSolicitante).then(
      (respuesta)=>{
        this.nombreUsuario = respuesta[0].Title;
        this.emailUsuario = respuesta[0].usuario.EMail;
        this.idUsuario = respuesta[0].usuarioId;
        if (respuesta[0].UrlFirma !== null) {
          this.firmaUsuario = respuesta[0].UrlFirma.Url;
        }       
      }
    ).catch(
      (error)=>{
        this.mostrarError("Error al cargar las firmas");
        console.log(error);
      }
    )
  }

  obtenerfirmaJefe(): any {
    this.servicio.obtenerFirmas(this.UsuarioJefe).then(
      (respuesta)=>{
        this.nombreJefe = respuesta[0].Title;
        this.emailJefe = respuesta[0].usuario.EMail;
        this.idJefe = respuesta[0].usuarioId;
        if (respuesta[0].UrlFirma !== null) {
          this.firmaJefe = respuesta[0].UrlFirma.Url;
        }               
      }
    ).catch(
      (error)=>{
        this.mostrarError("Error al cargar las firmas");
        console.log(error);
      }
    )
  }

  AprobarOrden(){
    this.spinnerService.show();
    if (this.CodigoEstado === 2) {
      this.EstadoSiguiente = "En revisión del gerente";
      this.ResponsableSiguiente = this.idGerente;
        let objAprobar ={
            Estado: this.EstadoSiguiente, 
            CodigoEstado: 3,
            ResponsableActualId: this.idGerente,
            GerenteAdminId: this.idGerente
        }

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailGerente]
        }
        
        this.modificarOrden(objAprobar, ObjCorreo);
        // this.modificarOrden(objAprobar);    
    }
    else if (this.CodigoEstado === 3) {
      this.EstadoSiguiente = "Aprobado";
      this.ResponsableSiguiente = null;
        let objAprobar ={
            Estado: this.EstadoSiguiente,
            CodigoEstado: 4,
            ResponsableActualId: -1
        }        

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>La orden N° '+this.idOrdenCompra+' ha sido aprobada</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario]
        }
        this.modificarOrden(objAprobar, ObjCorreo); 
    }
  }

  RechazarOrden(template: TemplateRef<any>){
    this.validarDevolucion = false;
    this.motivoDevolucion  = "";
    this.modalRef = this.modalService.show(template, {
      class: "gray modal-lg"
    });
  }


  SiRechazar(){
    this.spinnerService.show();
    if (this.motivoDevolucion === "") {
        this.validarDevolucion = true;
        this.spinnerService.hide();
        return false;
    }
    if (this.CodigoEstado === 2) {
      this.EstadoSiguiente = "Devuelta por el jefe";
      this.ResponsableSiguiente = this.idUsuario;
        let objAprobar = {
            Estado: this.EstadoSiguiente, 
            CodigoEstado: 5,
            ResponsableActualId: this.idUsuario,
            GerenteAdminId: this.idGerente
        }

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>La orden N° '+this.idOrdenCompra+' ha sido devuelta por el jefe</p>'+
                            '<br>'+
                            '<strong>Motivo de la devolición:</strong>'+
                            '<p>'+this.motivoDevolucion+'</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario]
        }
        
        this.modificarOrden(objAprobar, ObjCorreo);
        // this.modificarOrden(objAprobar);    
    }
    else if (this.CodigoEstado === 3) {
      this.EstadoSiguiente = "Devuelta por el gerente";
      this.ResponsableSiguiente = this.idUsuario;
        let objAprobar ={
            Estado: this.EstadoSiguiente,
            CodigoEstado: 6,
            ResponsableActualId: this.idUsuario
        }        

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>La orden N° '+this.idOrdenCompra+' ha sido devuelta por el Gerente Administrativo</p>'+
                            '<br>'+
                            '<strong>Motivo de la devolición:</strong>'+
                            '<p>'+this.motivoDevolucion+'</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario, this.emailJefe]
        }
        this.modificarOrden(objAprobar, ObjCorreo); 
    }
  }

  enviarNotificacion(ObjCorreo): any {   

          const emailProps: EmailProperties = {
            To: ObjCorreo.aQuien,
            Subject: "Notificación de orden de compra",
            Body: ObjCorreo.TextoCorreo,
          };
          
          this.servicio.EnviarNotificacion(emailProps).then(
                (res)=>{
                  this.obtenerServicio();
                  // this.MostrarExitoso("La Orden ha sido enviada con éxito");
                  // window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                  // this.spinnerService.hide();
                }
          ).catch(
            (error)=>{
              console.error(error);
              this.mostrarInformacion("Error al enviar la notificacion, pero la orden se ha enviado con éxito");
              setTimeout(() => {
                window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                // this.spinnerService.hide();
              }, 3000);
               
            }
          ); 
  }

  modificarOrden(objAprobar, ObjCorreo){
    this.servicio.modificarOrden(this.idOrdenCompra, objAprobar).then(
      (res)=>{
        this.enviarNotificacion(ObjCorreo);
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("error al aprobar la orden");
      }
    )
  }

  obtenerServicio(){
    this.servicio.ObtenerServicio(this.idOrdenCompra).then(
      (respuestaServicio)=>{
        let IdServicio = respuestaServicio[0].Id;
        let objServicio = {          
          ResponsableActualId: this.ResponsableSiguiente,
          Estado: this.EstadoSiguiente
        }
        this.ModificarServicio(objServicio, IdServicio)
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("error al aprobar la orden");
      }
    )
  }

  ModificarServicio(objServicio, idServicio) {
    this.servicio.ModificarServicio(objServicio, idServicio).then(
        (resultado)=>{
          this.MostrarExitoso("Operación exitosa");          
          setTimeout(() => {
            window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
            // this.spinnerService.hide();
          }, 3000);
        }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al aprobar la solicitud");
        setTimeout(() => {
          window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
          // this.spinnerService.hide();
        }, 3000);
      }
    );
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
