import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { SPServicio } from "../Servicios/sp-servicio";
import { centroCostos } from "../Entidades/centroCostos";
import { ItemAddResult, EmailProperties } from '@pnp/sp';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router} from '@angular/router';
import { Usuario } from '../Entidades/usuario';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { element } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: "app-generar-orden-compra",
  templateUrl: "./generar-orden-compra.component.html",
  styleUrls: ["./generar-orden-compra.component.css"]
})
export class GenerarOrdenCompraComponent implements OnInit {
  generarOrdenForm: FormGroup;
  modalRef: BsModalRef;
  panelOpenState = false;
  panelOpenState1 = false;
  CentroCosto: centroCostos[];
  participacion: any[] = [];
  validarNombreCECO: boolean;
  validarCECO: boolean;
  validarNJOB: boolean;
  validarPorcentajeCECO: boolean;
  Reembolso: boolean;
  NumeroIdentificador: any;
  item: string;
  Cantidad: number;
  ValorUnitario: number;
  ValorTotal: any;
  ElementoServicio: string;
  Especificaciones: string;
  validarItem: boolean;
  validarCantidad: boolean;
  validarValorUnitario: boolean;
  validarElementoServicio: boolean;
  validarEspecificaciones: boolean;
  ItemsGuardar: any[] = [];
  Total: any;
  Subtotal: number;
  Iva: number;
  usuarioActual: Usuario;
  SolicitadoPor: any;
  PorcentajeIva: any;
  TieneIva: boolean;
  PorcentajeIvaUtilizar: any;
  ObjEmpresas: any[];
  ConsecutivoConsultores: any;
  ConsecutivoAsociados: any;
  TipoConsecutivo: any;
  IdRegConfiguracionApp: any;
  filteredOptions: Observable<string[]>;
  minDate: Date;
  cliente = [];

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
    this.NumeroIdentificador = Math.floor(
      Math.random() * (999 - 100 + 1) + 100
    );
    this.PorcentajeIva = 0;
    this.PorcentajeIvaUtilizar = 0;
    this.TieneIva = true;
  }

  ngOnInit() {    
    this.spinnerService.show();
    this.generarOrdenForm = this.formBuilder.group({
      nroOrden: [""],
      EmpresaSolicitante: ["",  Validators.required],
      EntidadCompania: ["", Validators.required],      
      PersonaContacto: ["", Validators.required],
      TelefonoContacto: ["", Validators.required],
      EmailContacto: ["", [Validators.required, Validators.email]],
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
      TipoMoneda: ["COP", Validators.required],
      
    });        
    this.ObtenerUsuarioActual();
    this.ObtenerEmpresasAraujo();
    this.ObtenerProyectos();

      

    // this.generarOrdenForm.valueChanges.subscribe(
    //   (res)=>{
    //     this.generarOrdenForm.controls['EmailContacto'].setValidators([Validators.email])
    //     this.generarOrdenForm.controls['EmailContacto'].updateValueAndValidity()
    //   }
    // )
      
  }

  ObtenerEmpresasAraujo(): any {
    this.servicio.ObtenerEmpresasAraujo().then(
      (res)=>{
        this.ObjEmpresas = res;
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.mostrarError("Error al cargar las empresas solicitantes");
    }
    );
  }

  seleccionarEmpresa(event){
    let consecutivo = event.value.TipoConsecutivo;
    this.TipoConsecutivo = consecutivo;
    if (consecutivo === "Consultores") {
      this.generarOrdenForm.controls["nroOrden"].setValue(this.ConsecutivoConsultores);      
    }
    else if (consecutivo === "Asociados") {
      this.generarOrdenForm.controls["nroOrden"].setValue(this.ConsecutivoAsociados);
    }
    
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
              console.log(this.usuarioActual.EmailJefeDirecto);
            }
            this.usuarioActual.Area = res[0].Area;
            this.obtenerCentroCostos();
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

  obtenerCentroCostos(): any {
    this.servicio
      .ObtenerCentroCosto()
      .then(res => {
        this.CentroCosto = centroCostos.fromJsonList(res);
        console.log(this.CentroCosto);
        this.obtenerConfiguracion();        
      })
      .catch(error => {
        this.mostrarError("Se ha producido un error al cargar los centros de costos");
        console.log(error);
      });
  }

  obtenerConfiguracion(): any {
    this.servicio.ObtenerConfiguracionApp().then(
       (res)=>{
         this.PorcentajeIva = res[0].ValorIva; 
         this.IdRegConfiguracionApp = res[0].Id; 
         this.PorcentajeIvaUtilizar = this.PorcentajeIva;
         let ConsecutivoConsultores = res[0].ConsecutivoConsultores;
         ConsecutivoConsultores = ConsecutivoConsultores.split("-");
         this.ConsecutivoConsultores = ConsecutivoConsultores[0] + "-" + (parseInt(ConsecutivoConsultores[1])+1);
         let ConsecutivoAsociados = res[0].ConsecutivoAsociados;
         ConsecutivoAsociados = ConsecutivoAsociados.split("-");
         this.ConsecutivoAsociados = ConsecutivoAsociados[0] + "-" + (parseInt(ConsecutivoAsociados[1])+1);
         this.spinnerService.hide();        
       }
    )
    .catch(error => {
      this.mostrarError("Se ha producido un error al cargar el iva");
      console.log(error);
    });
  }

  ObtenerProyectos() {
    this.servicio.obtenerProyectosJobs().subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.cliente = respuesta;
      }
    )
  }

  clientes($event) {
    let titulo = $event.value.Title
    console.log($event)
    this.generarOrdenForm.controls['DescripcionJob'].setValue(titulo)
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

  seleccionarCECO(item) {
    this.generarOrdenForm.controls["CECO"].setValue(item.value.centroCosto);
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

  radioChange(item) {
    if (item.value === "true") {
      this.Reembolso = true;
    } else {
      this.Reembolso = false;
    }
  }

  AgregarParticipacion() {
    this.spinnerService.show();    
    this.validarNombreCECO = false;
    this.validarCECO = false;
    this.validarNJOB = false;
    this.validarPorcentajeCECO = false;

    let ObjCECO = this.generarOrdenForm.controls["NombreCECO"].value;
    let CECO = this.generarOrdenForm.controls["CECO"].value;
    let NumeroJobCECO = this.generarOrdenForm.controls["NumeroJobCECO"].value;
    let PorcentajeAsumidoCECO = this.generarOrdenForm.controls["PorcentajeAsumidoCECO"].value;

    if (PorcentajeAsumidoCECO > 100) {
      this.mostrarAdvertencia("El porcentaje asumido no puede ser superior al 100%");
      this.spinnerService.hide();
      return false;
    }

    if (ObjCECO === "") {
      this.validarNombreCECO = true;
      this.spinnerService.hide(); 
      return false;
    }
    if (CECO === "") {
      this.validarCECO = true;
      this.spinnerService.hide();
      return false;
    }
    // if (NumeroJobCECO === "") {
    //   this.validarNJOB = true;
    //   return false;
    // }
    if (PorcentajeAsumidoCECO === "") {
      this.validarPorcentajeCECO = true;
      this.spinnerService.hide(); 
      return false;
    }

    // NombreCECO = this.CentroCosto.find(x => x.centroCosto === NombreCECO).nombre;
    let ObjCeco = this.CentroCosto.find(x => x.centroCosto === ObjCECO.centroCosto && x.nombre === ObjCECO.nombre);
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
      id: Math.floor(Math.random() * 11),
      ceco: CECO,
      nombre: ObjCeco.nombre,
      Njob: NumeroJobCECO,
      asumido: PorcentajeAsumidoCECO,
      directorId: ObjCeco.DirectorCeco,
      nombreDirector: ObjCeco.nombreDirector
    };
    // console.log(objParticipacion.nombreDirector);
    this.participacion.push(objParticipacion);
    this.generarOrdenForm.controls["NombreCECO"].setValue("");
    this.generarOrdenForm.controls["CECO"].setValue("");
    this.generarOrdenForm.controls["NumeroJobCECO"].setValue("");
    this.generarOrdenForm.controls["PorcentajeAsumidoCECO"].setValue("");
    this.spinnerService.hide();
  }

  eliminarParticipacion(id) {
    let index = this.participacion.findIndex(x => x.id === id);
    this.participacion.splice(index, 1);
  }

  AgregarItems() {
    this.spinnerService.show();
    this.validarItem = false;
    this.validarCantidad = false;
    this.validarValorUnitario = false;
    this.validarElementoServicio = false;
    this.validarEspecificaciones = false;
    // let ValorTotal = 0;
    let calcularValorConIVa;

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

    // if (this.TieneIva === true) {
    //   let iva = this.PorcentajeIva / 100
    //   calcularValorConIVa = (this.ValorUnitario * this.Cantidad) * iva;
    //   ValorTotal = (this.ValorUnitario * this.Cantidad) + calcularValorConIVa;
    //   this.Total = ValorTotal
    // }
    // else {
    //   ValorTotal = this.ValorUnitario * this.Cantidad;
    //   this.Total = ValorTotal
    // }

    this.ValorTotal = this.ValorUnitario * this.Cantidad;

    let ObjGuardarItems = {      
      Title: this.item,
      Elemento: this.ElementoServicio,
      Especificaciones: this.Especificaciones,
      Cantidad: this.Cantidad,
      ValorUnitario: this.ValorUnitario,
      ValorTotal: this.ValorTotal.toFixed(2),
      numeroId: Math.floor(Math.random() * 11)
    } 
    
    this.ItemsGuardar.push(ObjGuardarItems);
    console.log(this.ItemsGuardar);
    this.calcularIva();
    // this.ItemsGuardar.map(x=>{
    //     this.Subtotal = this.Subtotal + x.ValorTotal;
    // });

    // this.Iva = this.Subtotal * (this.PorcentajeIvaUtilizar/100);
    // this.Total = this.Subtotal + this.Iva;
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

  setMinDate() {
    this.minDate = this.generarOrdenForm.get('FechaSolicitud').value;
  }

  calcularIva() {
    this.Subtotal = 0;
    this.ItemsGuardar.map(x=>{
      this.Subtotal = parseFloat(this.Subtotal.toString()) + parseFloat(x.ValorTotal)
    });
  
    this.Iva = this.Subtotal * (this.PorcentajeIvaUtilizar/100);
    this.Total = this.Subtotal + this.Iva;    
  }

  eliminarItem(index) {
    this.spinnerService.show();
    this.Total = 0;    
    // let index = this.ItemsGuardar.findIndex(x=>x.numeroId === ElementoId);
    this.ItemsGuardar.splice(index, 1);
    this.calcularIva();
    this.spinnerService.hide();
  }

  private AsignarFormatoFecha(FechaActividad: Date) {
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

  async ObtenerConsecutivoAsociados(): Promise<any>{
    let ConsecutivoAsociado = "";
    await this.servicio.ObtenerConsecutivoAsociado().then(
      async (res)=>{
        let ConsecutivoAsociados = res[0].ConsecutivoAsociados;
        ConsecutivoAsociados = ConsecutivoAsociados.split("-");
        this.ConsecutivoAsociados = ConsecutivoAsociados[0] + "-" + (parseInt(ConsecutivoAsociados[1])+1);
        ConsecutivoAsociado = this.ConsecutivoAsociados;
        let obj = {
          ConsecutivoAsociados: ConsecutivoAsociado
        }
        let mensaje = await this.GuardrConsecutivo(this.IdRegConfiguracionApp, obj);
        if (mensaje === "Error") {
          ConsecutivoAsociado = "Error";
        }
      }
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error con el número consecutivo al guardar");
        console.log(error);
        ConsecutivoAsociado = "Error";
      }
    );

    return ConsecutivoAsociado;
  }

  async ObtenerConsecutivoConsultores(): Promise<any>{
    let ConsecutivoConsultore = "";
    await this.servicio.ObtenerConsecutivoConsultores().then(
      async (res)=>{
        let ConsecutivoConsultores = res[0].ConsecutivoConsultores;
        ConsecutivoConsultores = ConsecutivoConsultores.split("-");
        this.ConsecutivoConsultores = ConsecutivoConsultores[0] + "-" + (parseInt(ConsecutivoConsultores[1])+1); 
        ConsecutivoConsultore = this.ConsecutivoConsultores;
        let obj = {
          ConsecutivoConsultores: ConsecutivoConsultore
        }
        let mensaje = await this.GuardrConsecutivo(this.IdRegConfiguracionApp, obj);
        if (mensaje === "Error") {
          ConsecutivoConsultore = "Error";
        }
      }
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error con el número consecutivo al guardar");
        console.log(error);
        ConsecutivoConsultore = "Error";
      }
    );

    return ConsecutivoConsultore;
  }

  async GuardrConsecutivo(IdRegConfiguracionApp, obj): Promise<any> {
   let Mensaje = "";
    await this.servicio.GuardarConsecutivo(IdRegConfiguracionApp, obj).then(
      (res)=>{
        Mensaje = "Exitoso";
      }
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error con el número consecutivo al guardar");
        console.log(error);
        Mensaje = "Error";
      }
    );

    return Mensaje;
  }

  async onSubmit(form: NgForm) {
    this.spinnerService.show();

    if (this.generarOrdenForm.invalid) {  
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

    if (sumaParticipacion < 100) {
      this.mostrarAdvertencia("El total del procentaje asumido debe ser igual al 100%");
      this.spinnerService.hide();
      return false;
    }

    if (this.ItemsGuardar.length === 0) {
      this.spinnerService.hide(); 
        this.mostrarAdvertencia("La orden debe tener por lo menos un item a comprar");   
        return false;
    }

    let EntradaCompania = this.generarOrdenForm.controls["EntidadCompania"].value;
    let PersonaContacto = this.generarOrdenForm.controls["PersonaContacto"].value;
    let TelefonoContacto = this.generarOrdenForm.controls["TelefonoContacto"].value;
    let EmailContacto = this.generarOrdenForm.controls["EmailContacto"].value;
    let Ciudad = this.generarOrdenForm.controls["Ciudad"].value;
    let Paginas = this.generarOrdenForm.controls["Paginas"].value;
    let JobNumero = this.generarOrdenForm.controls["JobNumero"].value.NumeroJob;
    let DescripcionJob = this.generarOrdenForm.controls["DescripcionJob"].value;
    let Reembolsable = this.Reembolso;
    let FechaSolicitud = this.generarOrdenForm.controls["FechaSolicitud"].value;
    FechaSolicitud = this.AsignarFormatoFecha(FechaSolicitud); 
    let TiempoEntrega = this.generarOrdenForm.controls["TiempoEntrega"].value;
    TiempoEntrega = this.AsignarFormatoFecha(TiempoEntrega);
    let RubroPresupuesto = this.generarOrdenForm.controls["RubroPresupuesto"].value;
    let JustificacionGasto = this.generarOrdenForm.controls["JustificacionGasto"].value;
    let coniva = this.TieneIva;
    let TipoMoneda = this.generarOrdenForm.controls["TipoMoneda"].value;
    let Subtotal = this.Subtotal;
    let Iva = this.Iva;
    let Total = this.Total;
    let EmpresaSolicitante = this.generarOrdenForm.controls["EmpresaSolicitante"].value;
    
    let Consecutivo;
    if(this.TipoConsecutivo==="Asociados"){
      Consecutivo = await this.ObtenerConsecutivoAsociados();
    }
    else if(this.TipoConsecutivo==="Consultores"){
      Consecutivo = await this.ObtenerConsecutivoConsultores();
    }

    if (Consecutivo === "" || Consecutivo === "Error") {
      this.mostrarError("Error al asignar el numero consecutivo");
      return false;
    }

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
      NombreSolicitanteId: this.SolicitadoPor,
      JefeDirectoId: this.usuarioActual.IdJefeDirecto,
      ResponsableActualId: this.usuarioActual.IdJefeDirecto,
      EmpresaSolicitante: EmpresaSolicitante.RazonSocial,
      Consecutivo: Consecutivo
    }    
    
    this.servicio.guardarOrden(objOrden).then(
      (itemsResult: ItemAddResult)=>{
          let objResult = itemsResult.data; 
          let idOrden = objResult.Id;

          let objServicio = {
            TipoServicio: "Orden de compra",
            CodigoServicioId: 3,
            AutorId: this.SolicitadoPor,
            ResponsableActualId: this.usuarioActual.IdJefeDirecto,
            Estado: "En revisión del Jefe",
            idServicio: idOrden
          } 
          if (this.participacion.length>0) {
            this.GuardarParticipacion(idOrden, objServicio);
          } 
          else {
              this.GuardarItemsOrden(idOrden, objServicio);
          }     
      }
    ).catch(
      (error)=>{
        this.mostrarError("Se ha producido un error al guardar la orden");
        console.log(error);
      }
    );
  }

  GuardarParticipacion(idOrden: any, objServicio): any {
    let contador =0;
    this.participacion.forEach(element=>{
      this.servicio.GuardarParticipacion(element, idOrden).then(
          (resultado)=>{
            contador++;
            if (contador === this.participacion.length) {              
              this.GuardarItemsOrden(idOrden, objServicio);
            }
          }
      ).catch(
        (error)=>{
          this.mostrarError("Se ha producido un error al guardar la orden");
          console.log(error);
          this.spinnerService.hide();
        }
      );
    });    
  }

 async GuardarItemsOrden(idOrden, objServicio){
   let contador =0;

    this.ItemsGuardar.forEach(async element => {

        await this.servicio.GuardarItemsOrden(element,idOrden).then(
        (resultado: ItemAddResult)=>{
          contador++;
            if (contador === this.ItemsGuardar.length) {              
              if (this.usuarioActual.IdJefeDirecto !== -1) {
                this.guardarServicio(objServicio); 
              }
              else{
                this.MostrarExitoso("La Orden ha sido enviada con éxito");
                setTimeout(
                  ()=>{
                    window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                    this.spinnerService.hide();
                  },2000);                
              }
            }
        }
        ).catch(
          (error)=>{
              this.mostrarError("Se ha producido un error al guardar la orden");
              console.log(error);
          }
        );
    });    
  }

  guardarServicio(objServicio){
      this.servicio.GuardarServicio(objServicio).then(
        (resultado: ItemAddResult)=>{
          
          let TextoCorreo = '<p>Cordial saludo</p>'+
                            '<br>'+
                            '<p>El usuario <strong>'+this.usuarioActual.nombre+'</strong> le ha enviado una nueva orden de compra para su revisión</p>'+
                            '<br>'+
                            '<p>Para ver la orden de compra haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/Orden-Compra/index.aspx/Ordenes-pendientes" target="_blank">aquí</a>.</p>';

          const emailProps: EmailProperties = {
            To: [this.usuarioActual.EmailJefeDirecto],
            Subject: "Notificación de orden de compra",
            Body: TextoCorreo,
          };
          
          this.servicio.EnviarNotificacion(emailProps).then(
                (res)=>{
                  this.MostrarExitoso("La Orden ha sido enviada con éxito");
                  setTimeout(
                    ()=>{
                      window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                      this.spinnerService.hide();
                    },2000);   
                }
          ).catch(
            (error)=>{
              console.error(error);
              this.mostrarInformacion("Error al enviar la notificacion, pero la orden se ha enviado con éxito");
              setTimeout(
                ()=>{
                  window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                  this.spinnerService.hide();
                },2000);    
            }
          );                 
        }
      ).catch(
        (error)=>{
          console.error(error);
          this.mostrarError("Error al enviar la orden");
          setTimeout(
            ()=>{
              window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
              this.spinnerService.hide();
            },2000);    
        }
      )       
  }
  
}
