import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
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
import domtoimage from 'dom-to-image';
import * as jspdf from 'jspdf';
// import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-ver-orden-compra',
  templateUrl: './ver-orden-compra.component.html',
  styleUrls: ['./ver-orden-compra.component.css']
})
export class VerOrdenCompraComponent implements OnInit {

  @ViewChild('fromatoExportar', {static: true}) fromatoExportar: ElementRef;

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
  ResponsableSiguiente: any;
  motivoDevolucion: string;
  validarDevolucion: boolean;
  PorcentajeIva: any;
  PorcentajeIvaUtilizar: number;
  TieneIva: boolean;
  SoloLectura: boolean;
  FirmasCECOS: any;
  montoDO: any;
  usuarioDirectorOperativo: any;
  nombreDO: any;
  emailDO: any;
  idDO: any;
  firmaDO: any;
  usuarioAuxContable: any;
  nombreAuxContable: any;
  emailAuxContable: any;
  idAuxContable: any;
  firmaAuxContable: any;
  Order: string;

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
      EmpresaSolicitante: [""],
      EntidadCompania: [""],
      PersonaContacto: [""],
      TelefonoContacto: [""],
      EmailContacto: [""],
      Ciudad: [""],
      Paginas: [""],
      JobNumero: [""],
      DescripcionJob: [""],
      Reembolsable: [""],
      NombreCECO: [""],
      CECO: [""],
      NumeroJobCECO: [""],
      PorcentajeAsumidoCECO: [""],
      FechaSolicitud: [""],
      TiempoEntrega: [""],
      RubroPresupuesto: [""],
      JustificacionGasto: [""],
      IvaSiNo: [""],
      TipoMoneda: [""]
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
      async (respuesta)=>{
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
        }
        let respue = await this.obtenerParticipacion();
        
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
        this.Order = this.ObjOrdenCompra.Consecutivo;
        console.log(this.Order);
        if (this.CodigoEstado === 2 && this.usuarioActual.id === this.ObjOrdenCompra.ResponsableActualId) {
          this.SoloLectura = true;
        } 
        else if (this.CodigoEstado === 3 && this.usuarioActual.id === this.ObjOrdenCompra.ResponsableActualId) {
          this.SoloLectura = true;
        }
        else if (this.CodigoEstado === 7 && this.usuarioActual.id === this.ObjOrdenCompra.ResponsableActualId) {
          this.SoloLectura = true;
        }
        else if (this.CodigoEstado === 9 && this.usuarioActual.id === this.ObjOrdenCompra.ResponsableActualId) {
          this.SoloLectura = true;
        }
        // if(this.CodigoEstado === 5 || this.CodigoEstado === 6){
        //   this.router.navigate(['/editar-orden', Parametro]);
        // }
        this.usuarioSolicitante = this.ObjOrdenCompra.NombreSolicitanteId;
        this.UsuarioJefe = this.ObjOrdenCompra.JefeDirectoId;
        
        this.ObtenerConfiguracion();
        this.ObtenerDO();
        this.AuxContable();
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

  ObtenerDO(): any {
    this.servicio.ValidarUsuarioGerente().then(
      (res)=>{
        this.usuarioDirectorOperativo = res[0].DirectorOperativoId;
        this.servicio.obtenerFirmas(this.usuarioDirectorOperativo).then(
          (respuesta)=>{
            this.nombreDO = respuesta[0].Title;
            this.emailDO = respuesta[0].usuario.EMail;
            this.idDO = respuesta[0].usuarioId;
            if (respuesta[0].UrlFirma !== null) {
              this.firmaDO = respuesta[0].UrlFirma.Url;
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

  AuxContable(): any {
    this.servicio.ValidarUsuarioGerente().then(
      (res)=>{
        this.usuarioAuxContable = res[0].AuxContableId;
        this.servicio.obtenerFirmas(this.usuarioAuxContable).then(
          (respuesta)=>{
            this.nombreAuxContable = respuesta[0].Title;
            this.emailAuxContable = respuesta[0].usuario.EMail;
            this.idAuxContable = respuesta[0].usuarioId;
            if (respuesta[0].UrlFirma !== null) {
              this.firmaAuxContable = respuesta[0].UrlFirma.Url;
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

  ObtenerConfiguracion(): any {
    this.servicio.ObtenerConfiguracionApp().then(
      (res)=> {
          this.montoDO = res[0].MontoAprobacionDO;
      }
    ).catch (
      (error)=> {
        this.mostrarError("Error al cargar la configuracion");
        console.log(error);
      }
    );
  }

  calcularIva() {
    this.Subtotal = 0;
    this.ItemsGuardar.map(x=>{
      this.Subtotal = parseFloat(this.Subtotal.toString()) + x.ValorTotal
    });
  
    this.Iva = this.Subtotal * (this.PorcentajeIvaUtilizar/100);
    this.Total = this.Subtotal + this.Iva;    
  }

  ObtenerItems(): any {

    this.servicio.obtenerItems(this.idOrdenCompra).then(
        (res)=>{
            this.ItemsGuardar = itemsOrden.fromJsonList(res);
            this.calcularIva();
        }
      ).catch(
        (error)=>{
          this.mostrarError("Error al cargar la orden");
          console.log(error);  
        }
      );    
  }

  async obtenerParticipacion(): Promise<any>{
    let respuesta = "";
    this.servicio.obtenerParticipacion(this.idOrdenCompra).then(
      async (res)=>{
          this.participacion = Participacion.fromJsonList(res);
          let respuesta = await this.ObtenerFirmasCecos();
      }
    ).catch(
      (error)=>{
        this.mostrarError("Error al cargar la orden");
        console.log(error);
        respuesta = "Error";
      }
    );

    return respuesta;
  }

  async ObtenerFirmasCecos(): Promise<any> {
    let contador = 0;
    let swithc = false;
    let stringHtml = "";
    let ObjCeco = this.participacion.filter((x)=> x.Aprobado === true);
    stringHtml = "<tr>{0}</tr>";
    contador = 0;
    swithc = true;
    await Promise.all(ObjCeco.map(async (element) => {
    
          if(swithc === true) {
            let respuesta = await this.ConsultaFirmaDirectorCeco(element.idDirectorCECO);
            stringHtml = stringHtml.replace("{0}",'<td width="33.3%">'+
                              '<span class="background" id="table-compra">Director CECO</span><br><br>'+
                              '<img src="'+respuesta+'" *ngIf="CodigoEstado === 3 || CodigoEstado === 4 ||" width="50%" alt="" ><br>'+
                              '<span>'+element.nombre+'</span><br>'+
                          '</td>{0}');
            contador++;        
          }  
          
          swithc = contador === 3? false: true; 
          if (swithc === false) {
            stringHtml = stringHtml.replace("{0}","");
            stringHtml = stringHtml + "<tr>{0}</tr>"; 
            contador = 0;
            swithc = true;
          }        
          
    }));    
    stringHtml = stringHtml.replace("{0}","");
    this.FirmasCECOS = stringHtml;    
  }

  async ConsultaFirmaDirectorCeco(idDirectorCECO): Promise<any>{
    let firmaCeco = "";
    await this.servicio.obtenerFirmas(idDirectorCECO).then(
      (respuesta)=> {        
        if (respuesta[0].UrlFirma !== null) {
          firmaCeco = respuesta[0].UrlFirma.Url;
        }   
    }
    ).catch(
      (error)=>{
        firmaCeco = "Error";
        console.log(error);
      }
    )

    return firmaCeco;
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

  async AprobarOrden() {
    this.spinnerService.show();
    if (this.CodigoEstado === 2) {
      this.MetodoAprovacionJefe();
    }  
    else if(this.CodigoEstado === 7){
      this.MetodoAprobacionCECO();
    }
    else if (this.CodigoEstado === 3) {
      this.MetodoAprobacionGerente();      
    }
    else if (this.CodigoEstado === 9) {
      this.MetodoAprobacionDO();
    }
  }

  MetodoAprobacionDO(): any {
    this.EstadoSiguiente = "En revisión de Aux. Contabilidad";
        this.ResponsableSiguiente = this.idAuxContable;
          let objAprobar = {
              Estado: this.EstadoSiguiente,
              CodigoEstado: 11,
              ResponsableActualId: this.idAuxContable
          }        
  
          let TextoCorreo = '<p>Cordial saludo</p>'+
          '<br>'+
          '<p>Hay una orden de compra pendiente para su revisión</p>'+
          '<br>'+
          '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
          
          let ObjCorreo = {
            TextoCorreo: TextoCorreo,
            aQuien: [this.emailAuxContable]
          }
          this.modificarOrden(objAprobar, ObjCorreo);
  }

  MetodoAprobacionGerente(): any {
    let monto = this.montoDO;

      if (this.Total >= monto) {
        this.EstadoSiguiente = "En revisión Director Operativo";
        this.ResponsableSiguiente = this.idDO;
          let objAprobar = {
              Estado: this.EstadoSiguiente,
              CodigoEstado: 9,
              ResponsableActualId: this.idDO,
              DirectorOperativoId: this.idDO
          }        
  
          let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra pendiente para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
          
          let ObjCorreo = {
            TextoCorreo: TextoCorreo,
            aQuien: [this.emailDO]
          }
          this.modificarOrden(objAprobar, ObjCorreo);
      }
      else {
        this.EstadoSiguiente = "En revisión de Aux. Contabilidad";
        this.ResponsableSiguiente = this.idAuxContable;
          let objAprobar = {
              Estado: this.EstadoSiguiente,
              CodigoEstado: 11,
              ResponsableActualId: this.idAuxContable
          }        
  
          let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra pendiente para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
          
          let ObjCorreo = {
            TextoCorreo: TextoCorreo,
            aQuien: [this.emailAuxContable]
          }
          this.modificarOrden(objAprobar, ObjCorreo); 
      }
  }
  
  async MetodoAprobacionCECO(): Promise<any> {
    let ObjCeco = this.participacion.filter((x)=> x.Aprobado === false);  //&& x.idDirectorCECO !== this.usuarioActual.id
      if (ObjCeco.length > 1) {
        let IdParticipacion = ObjCeco[0].id;
        let NombreCeco = ObjCeco[0].nombre;
        let IdDirectorCeco = ObjCeco[0].idDirectorCECO;
        let EmailDirector = ObjCeco[0].EmailDirector;
        this.EstadoSiguiente = "En revisión del director del CECO "+ NombreCeco;
        this.ResponsableSiguiente = IdDirectorCeco;
        let objAprobar = {
          Estado: this.EstadoSiguiente,
          CodigoEstado: 7,
          ResponsableActualId: this.ResponsableSiguiente
        }

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra pendiente para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [EmailDirector]
        }
        // let ObjCeco2 = this.participacion.filter((x)=> x.idDirectorCECO === this.usuarioActual.id);
        // let IdParticipacion = ObjCeco2[0].id;
        let Resp = await this.ActualizarEstadoParticipacion(IdParticipacion, true);
        this.modificarOrden(objAprobar, ObjCorreo);
      }
      else {
        this.EstadoSiguiente = "En revisión del gerente";
        this.ResponsableSiguiente = this.idGerente;
        let objAprobar = {
            Estado: this.EstadoSiguiente,
            CodigoEstado: 3,
            ResponsableActualId: this.idGerente,
            GerenteAdminId: this.idGerente
        }
  
        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra pendiente para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailGerente]
        } 
        let ObjCeco2 = this.participacion.filter((x)=> x.idDirectorCECO === this.usuarioActual.id);
        let IdParticipacion = ObjCeco2[0].id;
        let Resp = await this.ActualizarEstadoParticipacion(IdParticipacion, true);
        this.modificarOrden(objAprobar, ObjCorreo);       
      } 
  }

  async MetodoAprovacionJefe(): Promise<any> {
    let ObjCeco = this.participacion.filter((x)=> x.Aprobado === false);
      if (ObjCeco.length > 0) {
        let IdDirectorCeco;
        let NombreCeco;
        let EmailDirector;
        let EstadoSiguiente;
        let CodigoEstado;
        let GerenteAdminId;
        if(this.participacion.length > 1) {
          IdDirectorCeco = ObjCeco[1].idDirectorCECO;
          NombreCeco = ObjCeco[1].nombre;
          EmailDirector = ObjCeco[1].EmailDirector
          EstadoSiguiente = "En revisión del director del CECO "+ NombreCeco;
          CodigoEstado = 7;
          GerenteAdminId = null;
        }
        else {
          IdDirectorCeco = this.idGerente;
          NombreCeco = ObjCeco[0].nombre;
          EmailDirector = ObjCeco[0].EmailDirector;
          EstadoSiguiente = "En revisión del gerente";
          CodigoEstado = 3;
          GerenteAdminId = this.idGerente
        }
        let IdParticipacion = ObjCeco[0].id;
        this.EstadoSiguiente = EstadoSiguiente;
        this.ResponsableSiguiente = IdDirectorCeco;
        let objAprobar = {
          Estado: this.EstadoSiguiente,
          CodigoEstado,
          ResponsableActualId: this.ResponsableSiguiente,
          GerenteAdminId
        }

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra pendiente para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [EmailDirector]
        }
        // let Resp = await this.ActualizarEstadoParticipacion(IdParticipacion, true);
        this.modificarOrden(objAprobar, ObjCorreo);
        let Resp = await this.ActualizarEstadoParticipacion(IdParticipacion, true);
      }
  }

  async ActualizarEstadoParticipacion(id, Estado): Promise<any> {
    let res = "";
    await this.servicio.ActualizarAprobacionParticipacion(id, Estado).then(
      (respuesta)=>{
        res = "bien";
      }
    ).catch(
      (error)=>{
        console.log(error);
        res = "Error";
      }
    );
    return res;
  }

  RecibirOC(){
    let objcorreo = null;
    this.EstadoSiguiente = "Pendiente por radicar factura"
    let objAprobar = {
      Estado: this.EstadoSiguiente,
      CodigoEstado: 12
    }
    this.modificarOrden(objAprobar, objcorreo);
  }

  PagarFac() { 
    let objcorreo = null;
    this.EstadoSiguiente = "Pagada"
    let objAprobar = {
      Estado: this.EstadoSiguiente,
      CodigoEstado: 13,
      ResponsableActualId: -1
    }
    this.modificarOrden(objAprobar, objcorreo);
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
      this.MetodoRechazoJefe();   
    }
    else if (this.CodigoEstado === 3) {
      this.MetodoRechazoGerente();
    }
    else if (this.CodigoEstado === 7) {
      this.MetodoRechazoCeco();
    }
    else if (this.CodigoEstado === 9) {
      this.MetodoRechazoDO();
    }
  }

  async MetodoRechazoDO(): Promise<any> {
    this.EstadoSiguiente = "Devuelta por el director operativo";
      this.ResponsableSiguiente = this.idUsuario;
        let objAprobar ={
            Estado: this.EstadoSiguiente,
            CodigoEstado: 10,
            ResponsableActualId: this.idUsuario
        }        

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>La orden N° '+this.idOrdenCompra+' ha sido devuelta por el director operativo</p>'+
                            '<br>'+
                            '<strong>Motivo de la devolución:</strong>'+
                            '<p>'+this.motivoDevolucion+'</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario, this.emailJefe]
        }

        let obj = this.participacion.filter(x=> x.Aprobado === true);
        for (let index = 0; index < obj.length; index++) {
          const element = obj[index];
          let Resp = await this.ActualizarEstadoParticipacion(element.id, false);
        }
        this.modificarOrden(objAprobar, ObjCorreo); 
  }

  async MetodoRechazoCeco(): Promise<any> {
    let ObjCeco = this.participacion.filter((x)=> x.idDirectorCECO === this.usuarioActual.id);
    this.EstadoSiguiente = "Devuelta por el Ceco "+ ObjCeco[0].nombre;
      this.ResponsableSiguiente = this.idUsuario;
        let objAprobar ={
            Estado: this.EstadoSiguiente,
            CodigoEstado: 8,
            ResponsableActualId: this.idUsuario
        }        

        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>La orden N° '+this.idOrdenCompra+' ha sido devuelta por el CECO '+ ObjCeco[0].nombre+'</p>'+
                            '<br>'+
                            '<strong>Motivo de la devolución:</strong>'+
                            '<p>'+this.motivoDevolucion+'</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario, this.emailJefe]
        }
        let obj = this.participacion.filter(x=> x.Aprobado === true);
        for (let index = 0; index < obj.length; index++) {
          const element = obj[index];
          let Resp = await this.ActualizarEstadoParticipacion(element.id, false);
        }
        this.modificarOrden(objAprobar, ObjCorreo); 
  }

  async MetodoRechazoGerente(): Promise<any> {
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
                            '<strong>Motivo de la devolución:</strong>'+
                            '<p>'+this.motivoDevolucion+'</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario, this.emailJefe]
        }

        let obj = this.participacion.filter(x=> x.Aprobado === true);
        for (let index = 0; index < obj.length; index++) {
          const element = obj[index];
          let Resp = await this.ActualizarEstadoParticipacion(element.id, false);
        }
        this.modificarOrden(objAprobar, ObjCorreo); 
  }

  async MetodoRechazoJefe(): Promise<any> {
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
                            '<strong>Motivo de la devolución:</strong>'+
                            '<p>'+this.motivoDevolucion+'</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailUsuario]
        }
        
        let obj = this.participacion.filter(x=> x.Aprobado === true);
        for (let index = 0; index < obj.length; index++) {
          const element = obj[index];
          let Resp = await this.ActualizarEstadoParticipacion(element.id, false);
        }
        this.modificarOrden(objAprobar, ObjCorreo);
        // this.modificarOrden(objAprobar); 
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
        if (ObjCorreo !== null) {
          this.enviarNotificacion(ObjCorreo);
        }
        else {
          this.obtenerServicio();
        }
        
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
  
  exportarPdf() {
    window.print();
    // var node = document.getElementById('fromatoExportar');
    // var img;
    // var filename;
    // var newImage;
    // let doc = new jspdf();    
    // domtoimage.toJpeg(node, { quality: 1 }).then(function (dataUrl) {
    //   img = new Image();
    //   img.src = dataUrl;
    //   newImage = img.src;
    //   img.onload = function () {
    //     var pdfWidth = img.width;
    //     var pdfHeight = img.height;
    //     // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
    //     var doc;
    //     if (pdfWidth > pdfHeight) {
    //       doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
    //     }
    //     else {
    //       doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
    //     }
    //     var width = doc.internal.pageSize.getWidth();
    //     var height = doc.internal.pageSize.getHeight();
    //     doc.addImage(newImage, 'PNG', 10, 10, width, height);
    //     filename = 'Orden de compra Nro '+ this.Order +'_.pdf';
    //     doc.save(filename);
    //   };
    // })
    //   .catch(function (error) {
    //   });
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
