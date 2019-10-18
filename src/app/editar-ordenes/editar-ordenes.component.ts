import { Component, OnInit, TemplateRef } from '@angular/core';
import { Participacion } from '../Entidades/participacion';
import { itemsOrden } from '../Entidades/itemsOrden';
import SimpleCrypto from 'simple-crypto-js';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SPServicio } from '../Servicios/sp-servicio';
import { Usuario } from '../Entidades/usuario';
import { centroCostos } from '../Entidades/centroCostos';
import { ItemAddResult, EmailProperties } from '@pnp/sp';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editar-ordenes',
  templateUrl: './editar-ordenes.component.html',
  styleUrls: ['./editar-ordenes.component.css']
})
export class EditarOrdenesComponent implements OnInit {

  editarOrdenForm: FormGroup; 
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
  TieneIva: boolean;
  PorcentajeIvaUtilizar: number;
  SoloLectura: boolean;
  Asumido: number;
  IdParticipacion: any;
  NJob: any;

  constructor(
    private servicio: SPServicio,
    private modalService: BsModalService,
    private formBuilder: FormBuilder, 
    public toastr: ToastrManager,
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
    this.SoloLectura = true;
  }

  ngOnInit() {
    this.editarOrdenForm = this.formBuilder.group({
      nroOrden: [""],
      EmpresaSolicitante: ["",  Validators.required],
      EntidadCompania: ["", Validators.required],
      PersonaContacto: ["", Validators.required],
      TelefonoContacto: ["", Validators.required],
      EmailContacto: ["", [Validators.required]],
      Ciudad: ["", Validators.required],
      Paginas: ["", Validators.required],
      JobNumero: [""],
      DescripcionJob: [""],
      Reembolsable: ["true", Validators.required],
      NombreCECO: [""],
      CECO: [""],
      NumeroJobCECO: [""],
      PorcentajeAsumidoCECO: [""],
      FechaSolicitud: ["", Validators.required],
      TiempoEntrega: ["", Validators.required],
      RubroPresupuesto: [""],
      JustificacionGasto: ["", Validators.required],
      IvaSiNo: ["si", Validators.required],
      TipoMoneda: ["COP", Validators.required]
    }); 

    this.consultarOrden();
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
        this.obtenerCentroCostos();
        this.ObjOrdenCompra = respuesta;
        this.CodigoEstado = this.ObjOrdenCompra.CodigoEstado;
        if (this.CodigoEstado === 5 || this.CodigoEstado === 6 || this.CodigoEstado === 8) {
          this.SoloLectura = false;
        }
        this.editarOrdenForm.controls["EntidadCompania"].setValue(this.ObjOrdenCompra.Title);
        this.editarOrdenForm.controls["PersonaContacto"].setValue(this.ObjOrdenCompra.PersonaContacto);
        this.editarOrdenForm.controls["TelefonoContacto"].setValue(this.ObjOrdenCompra.TelefonoContacto);
        this.editarOrdenForm.controls["EmailContacto"].setValue(this.ObjOrdenCompra.EmailContacto);
        this.editarOrdenForm.controls["Ciudad"].setValue(this.ObjOrdenCompra.Ciudad);
        this.editarOrdenForm.controls["Paginas"].setValue(this.ObjOrdenCompra.PaginasEnviadas);
        this.editarOrdenForm.controls["JobNumero"].setValue(this.ObjOrdenCompra.JobNumero);
        this.editarOrdenForm.controls["DescripcionJob"].setValue(this.ObjOrdenCompra.DescripcionJob);
        if (this.ObjOrdenCompra.Reembolsable === true) {
          this.editarOrdenForm.controls["Reembolsable"].setValue("true");          
        }
        else{
          this.editarOrdenForm.controls["Reembolsable"].setValue("false");          
        }
        this.obtenerParticipacion();        
        this.Reembolso = this.ObjOrdenCompra.Reembolsable;
        this.editarOrdenForm.controls["NombreCECO"].setValue(this.ObjOrdenCompra.NombreCECO);
        this.editarOrdenForm.controls["CECO"].setValue(this.ObjOrdenCompra.CECO);
        this.editarOrdenForm.controls["NumeroJobCECO"].setValue(this.ObjOrdenCompra.NumeroJobCECO);
        this.editarOrdenForm.controls["PorcentajeAsumidoCECO"].setValue(this.ObjOrdenCompra.PorcentajeAsumidoCECO);
        this.editarOrdenForm.controls["FechaSolicitud"].setValue(this.ObjOrdenCompra.FechaSolicitud);
        this.editarOrdenForm.controls["TiempoEntrega"].setValue(this.ObjOrdenCompra.TiempoEntrega);
        this.editarOrdenForm.controls["RubroPresupuesto"].setValue(this.ObjOrdenCompra.RubroPresupuesto);
        this.editarOrdenForm.controls["JustificacionGasto"].setValue(this.ObjOrdenCompra.JustificacionGasto);
        let coniva = this.ObjOrdenCompra.ConIva === true? "si": "no"; 
        this.editarOrdenForm.controls["IvaSiNo"].setValue(coniva);
        this.editarOrdenForm.controls["TipoMoneda"].setValue(this.ObjOrdenCompra.Moneda);
        this.editarOrdenForm.controls["nroOrden"].setValue(this.ObjOrdenCompra.Consecutivo);
        this.editarOrdenForm.controls["EmpresaSolicitante"].setValue(this.ObjOrdenCompra.EmpresaSolicitante);
        this.PorcentajeIvaUtilizar = this.ObjOrdenCompra.PorcentajeIva;
        
        
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
            this.calcularIva();
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

  obtenerCentroCostos(): any {
    this.servicio
      .ObtenerCentroCosto()
      .then(res => {
        this.CentroCosto = centroCostos.fromJsonList(res);
        this.obtenerConfiguracion(); 
        this.spinnerService.hide();
      })
      .catch(error => {
        this.mostrarError("SE ha producido un error al cargar los centros de costos");
        console.log(error);
      });
  }

  obtenerConfiguracion(): any {
    this.servicio.ObtenerConfiguracionApp().then(
       (res)=>{
         this.PorcentajeIva = res[0].ValorIva; 
         this.PorcentajeIvaUtilizar = this.PorcentajeIva;
         this.spinnerService.hide();        
       }
    )
    .catch(error => {
      this.mostrarError("Se ha producido un error al cargar el iva");
      console.log(error);
    });
  }

  radioChange(item) {
    if (item.value === "true") {
      this.Reembolso = true;
    } else {
      this.Reembolso = false;
    }
  }

  seleccionarCECO(item) {
    this.editarOrdenForm.controls["CECO"].setValue(item.value);
  }

  SeleccionIva(item){
    this.Total = 0
    if (item.value === "si") {
      this.TieneIva = true;
      this.PorcentajeIvaUtilizar = this.PorcentajeIva;
      if (this.ItemsGuardar.length>0) {
        this.calcularIva();
      }
    } else {      
      this.TieneIva = false;
      this.PorcentajeIvaUtilizar = 0;
      if (this.ItemsGuardar.length>0) {
        this.calcularIva();
      }
    }
  }

  AgregarParticipacion() {
    this.spinnerService.show();
    this.validarNombreCECO = false;
    this.validarCECO = false;
    this.validarNJOB = false;
    this.validarPorcentajeCECO = false;

    let NombreCECO = this.editarOrdenForm.controls["NombreCECO"].value;
    let CECO = this.editarOrdenForm.controls["CECO"].value;
    let NumeroJobCECO = this.editarOrdenForm.controls["NumeroJobCECO"].value;
    let PorcentajeAsumidoCECO = this.editarOrdenForm.controls[
      "PorcentajeAsumidoCECO"
    ].value;

    if (NombreCECO === "") {
      this.validarNombreCECO = true;
      return false;
    }
    if (CECO === "") {
      this.validarCECO = true;
      return false;
    }
    // if (NumeroJobCECO === "") {
    //   this.validarNJOB = true;
    //   return false;
    // }
    if (PorcentajeAsumidoCECO === "") {
      this.validarPorcentajeCECO = true;
      return false;
    }

    NombreCECO = this.CentroCosto.find(x => x.centroCosto === NombreCECO).nombre;
    let sumaParticipacion = 0;
    this.participacion.map((x)=>{
      sumaParticipacion = sumaParticipacion + x.asumido;
    });
    let sumaTotal = sumaParticipacion + PorcentajeAsumidoCECO;
    if (sumaTotal > 100) {
      this.mostrarAdvertencia("La suma del procentaje asumido no puede superar el 100%");
      this.spinnerService.hide();; 
      return false;
    }

    let objParticipacion = {  
      id: "",    
      ceco: CECO,
      nombre: NombreCECO,
      Njob: NumeroJobCECO,
      asumido: PorcentajeAsumidoCECO
    };

    this.GuardarParticipacion(objParticipacion);    
  }

  GuardarParticipacion(objParticipacion): any {

    this.servicio.GuardarParticipacion(objParticipacion, this.idOrdenCompra).then(
        (res: ItemAddResult)=>{
          let idParticipacion = res.data.Id;
            objParticipacion["id"] = idParticipacion;
            this.participacion.push(objParticipacion);
            this.editarOrdenForm.controls["NombreCECO"].setValue("");
            this.editarOrdenForm.controls["CECO"].setValue("");
            this.editarOrdenForm.controls["NumeroJobCECO"].setValue("");
            this.editarOrdenForm.controls["PorcentajeAsumidoCECO"].setValue("");
            this.spinnerService.hide();
        }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al guardar la participación");
        this.editarOrdenForm.controls["NombreCECO"].setValue("");
        this.editarOrdenForm.controls["CECO"].setValue("");
        this.editarOrdenForm.controls["NumeroJobCECO"].setValue("");
        this.editarOrdenForm.controls["PorcentajeAsumidoCECO"].setValue("");
        this.spinnerService.hide();
      }
    )   
    
  }

  eliminarParticipacion(id) {

    this.servicio.EliminarParticipacion(id).then(
      (respuesta)=>{
        let index = this.participacion.findIndex(x => x.id === id);
        this.participacion.splice(index, 1);
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al eliminar la participación");
      }
    );    
  }

  EditarParticipacion(template: TemplateRef<any>, objParticipacion){
    this.Asumido = objParticipacion.asumido;
    this.IdParticipacion = objParticipacion.id;
    this.NJob = objParticipacion.Njob;
    this.modalRef = this.modalService.show(template, {
      class: "gray modal-sm"
    });
  }

  ModificarParticipacion() {
    this.spinnerService.show();
    let sumaParticipacion = 0;
    this.participacion.map((x)=>{
      x.id !== this.IdParticipacion? 
        sumaParticipacion = sumaParticipacion + x.asumido : 0;
    });
    let sumaTotal = sumaParticipacion + this.Asumido;
    if (sumaTotal > 100) {
      this.mostrarAdvertencia("La suma del procentaje asumido no puede superar el 100%");
      this.spinnerService.hide();
      return false;
    }
    
    this.servicio.ModificarParticipacion(this.IdParticipacion, this.Asumido, this.NJob).then(
      (res)=> {
        let index = this.participacion.findIndex(x=>x.id === this.IdParticipacion);
        this.participacion[index].asumido = this.Asumido;
        this.participacion[index].Njob = this.NJob;
        this.modalRef.hide();
        this.spinnerService.hide();
      }
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error al actualizar el porcentaje de participación");
        console.log(error);
        this.spinnerService.hide();
    }
    )
  }

  agregarItem(template: TemplateRef<any>) {

    this.validarItem = false;
    this.validarCantidad = false;
    this.validarValorUnitario = false;
    this.validarElementoServicio = false;
    this.validarEspecificaciones = false;
    this.item = "";
    this.Cantidad = 0;
    this.ValorUnitario = 0;
    this.ElementoServicio = "";
    this.Especificaciones = "";

    this.modalRef = this.modalService.show(template, {
      class: "gray modal-lg"
    });
  }

  AgregarItems() {
    this.spinnerService.show();
    this.validarItem = false;
    this.validarCantidad = false;
    this.validarValorUnitario = false;
    this.validarElementoServicio = false;
    this.validarEspecificaciones = false;
    
    let ValorTotal = 0;
    this.Total = 0;

    if (this.item === "") {
      this.validarItem = true;
      return false;
    }

    if (this.Cantidad === 0) {
      this.validarCantidad = true;
      return false;
    }

    if (this.ValorUnitario === 0) {
      this.validarValorUnitario = true;
      return false;
    }

    if (this.ElementoServicio === "") {
      this.validarElementoServicio = true;
      return false;
    }

    if (this.Especificaciones === "") {
      this.validarEspecificaciones = true;
      return false;
    }

    ValorTotal = this.ValorUnitario * this.Cantidad;
    let ObjGuardarItems = {      
          Title: this.item,
          Elemento: this.ElementoServicio,
          Especificaciones: this.Especificaciones,
          Cantidad: this.Cantidad,
          ValorUnitario: this.ValorUnitario,
          ValorTotal: ValorTotal,
          id: ""
        }

    this.GuardarItemsOrden(ObjGuardarItems);    

  }

  calcularIva() {
    this.Subtotal = 0;
    this.ItemsGuardar.map(x=>{
      this.Subtotal = this.Subtotal + x.ValorTotal;
    });
  
    this.Iva = this.Subtotal * (this.PorcentajeIvaUtilizar/100);
    this.Total = this.Subtotal + this.Iva;    
  }

  async GuardarItemsOrden(ObjGuardarItems){
    let contador =0;
  
      await this.servicio.GuardarItemsOrden(ObjGuardarItems,this.idOrdenCompra).then(
      (resultado: ItemAddResult)=>{         
        
        let idItem = resultado.data.Id;
        this.ItemsGuardar["id"] = idItem;
        this.ItemsGuardar.push(ObjGuardarItems);
        this.calcularIva();
        this.validarItem = false;
        this.validarCantidad = false;
        this.validarValorUnitario = false;
        this.validarElementoServicio = false;
        this.validarEspecificaciones = false;
        this.item = "";
        this.Cantidad = 0;
        this.ValorUnitario = 0;
        this.ElementoServicio = "";
        this.Especificaciones = "";
    
        this.modalRef.hide(); 
        this.spinnerService.hide();
      }
      ).catch(
        (error)=>{
            this.mostrarError("Se ha producido un error al guardar la orden");
            console.log(error);
        }
      );
        
   }  

  eliminarItem(ElementoId){
    this.spinnerService.show();
    this.Total = 0;    
    this.servicio.EliminarItemsOrden(ElementoId).then(
      (res)=>{
        let index = this.ItemsGuardar.findIndex(x=>x.id === ElementoId);
        this.ItemsGuardar.splice(index, 1);
        this.calcularIva();
        this.spinnerService.hide();
      }
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error al eliminar el elemento");
        console.log(error);
        this.spinnerService.hide();
      }
    )    
  }

  private AsignarFormatoFecha(FechaActividad: Date) {
    FechaActividad = new Date(FechaActividad);
    let diaActividadExtraordinaria = FechaActividad.getDate();
    let mesActividadExtraordinaria = FechaActividad.getMonth();
    let anoActividadExtraordinaria = FechaActividad.getFullYear();
    let hoy = new Date();
    let horas = FechaActividad.getHours() === 0 ? hoy.getHours() : FechaActividad.getHours();
    let minutos = FechaActividad.getMinutes() === 0 ? 1 : FechaActividad.getMinutes();
    let segundos = FechaActividad.getSeconds() === 0 ? 1 : FechaActividad.getSeconds();
    let fechaRetornar = new Date(anoActividadExtraordinaria, mesActividadExtraordinaria, diaActividadExtraordinaria, horas, minutos, segundos).toISOString();
    return fechaRetornar; 
  }

  async onSubmit() {
    this.spinnerService.show();

    if (this.editarOrdenForm.invalid) {  
      this.spinnerService.hide(); 
      
      this.mostrarAdvertencia("Faltan campos por diligenciar");   
      return false;
    }

    if (this.participacion.length === 0) {
      this.spinnerService.hide(); 
      this.mostrarAdvertencia("Por favor ingrese los porcentajes que asume cada unidad de negocio");   
      return false;
    }

    let sumaParticipacion = 0;
    this.participacion.map((x)=>{
      sumaParticipacion = sumaParticipacion + x.asumido;
    });

    if (sumaParticipacion !== 100) {
      this.mostrarAdvertencia("El total del procentaje asumido debe ser el 100%");
      this.spinnerService.hide();
      return false;
    }

    let EntradaCompania = this.editarOrdenForm.controls["EntidadCompania"].value;
    let PersonaContacto = this.editarOrdenForm.controls["PersonaContacto"].value;
    let TelefonoContacto = this.editarOrdenForm.controls["TelefonoContacto"].value;
    let EmailContacto = this.editarOrdenForm.controls["EmailContacto"].value;
    let Ciudad = this.editarOrdenForm.controls["Ciudad"].value;
    let Paginas = this.editarOrdenForm.controls["Paginas"].value;
    let JobNumero = this.editarOrdenForm.controls["JobNumero"].value;
    let DescripcionJob = this.editarOrdenForm.controls["DescripcionJob"].value;
    let Reembolsable = this.Reembolso;
    let FechaSolicitud = this.editarOrdenForm.controls["FechaSolicitud"].value;
    FechaSolicitud = this.AsignarFormatoFecha(FechaSolicitud);
    let TiempoEntrega = this.editarOrdenForm.controls["TiempoEntrega"].value;
    TiempoEntrega = this.AsignarFormatoFecha(TiempoEntrega);
    let RubroPresupuesto = this.editarOrdenForm.controls["RubroPresupuesto"].value;
    let JustificacionGasto = this.editarOrdenForm.controls["JustificacionGasto"].value;
    let coniva = this.TieneIva;
    let TipoMoneda = this.editarOrdenForm.controls["TipoMoneda"].value;
    let Subtotal = this.Subtotal;
    let Iva = this.Iva;
    let Total = this.Total;

    let objOrden = {
      Title: EntradaCompania,
      PersonaContacto: PersonaContacto,
      EmailContacto: EmailContacto,
      TelefonoContacto: TelefonoContacto,
      Ciudad: Ciudad,
      PaginasEnviadas: Paginas,
      Reembolsable: Reembolsable,
      JobNumero: JobNumero,
      DescripcionJob: DescripcionJob,
      FechaSolicitud: FechaSolicitud,
      TiempoEntrega: TiempoEntrega,
      JustificacionGasto: JustificacionGasto,
      RubroPresupuesto: RubroPresupuesto,
      ConIva: coniva,
      Moneda: TipoMoneda,
      PorcentajeIva: this.PorcentajeIvaUtilizar,
      Subtotal: Subtotal,
      iva: Iva,
      Total: Total,
      ResponsableActualId: this.idJefe,
      CodigoEstado: 2,
      Estado: "En revisión del Jefe"
    }
    
    this.servicio.modificarOrden(this.idOrdenCompra, objOrden).then(
      (res)=>{
        this.ResponsableSiguiente = this.idJefe;
        this.EstadoSiguiente = "En revisión del Jefe";
        let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>Hay una orden de compra para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';
        
        let ObjCorreo = {
          TextoCorreo: TextoCorreo,
          aQuien: [this.emailJefe]
        }
        this.enviarNotificacion(ObjCorreo);
      }      
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error al guardar la orden");
        console.log(error);
      }
    );
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
          }
    ).catch(
      (error)=>{
        console.error(error);
        this.mostrarInformacion("Error al enviar la notificacion, pero la orden se ha enviado con éxito");
        setTimeout(() => {
          window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';          
        }, 3000);
         
      }
    ); 
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
