import { environment } from 'src/environments/environment';
import { sp } from '@pnp/sp';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { promised } from 'q';

@Injectable()
export class SPServicio {
    constructor() { }

    public ObtenerConfiguracion() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionJobs() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWebJobs);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWebGH);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTk5NTcyNjA0LCJuYmYiOjE1OTk1NzI2MDQsImV4cCI6MTU5OTY1OTMwNCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.ktuCHHXU7kwIWqXzy1FnGCVE52Ng3sJiEP4Oy-SgP12BzTXpP1LQ5T9Lj3LrBahl9qOv0wi3xIro6sXzORAOa9AeHmlAgTTJUl6CxzfBmf401Sa1X8APTYDMhkpvggl-FglM4OYgSKBBJCSD5BCq0SZKlH0NP5HP4dgDyT_mNushGctv2x7GEfUbAnkywPggNeHiQ0Enda3-gOdnr_ZgQxRM7FuEoPtqYvNU-IoWUsutz40TBnRKjE_8MnEeBfWq6cvx0H8qmEO1H0vAzDnLc3zN_e8uN8vwCfKMeocc0mgNy-aNeJCQHAWhrvRwwzbKQjhGc9botIWbDLX2sgVjPQ'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTk5NTcyNjMwLCJuYmYiOjE1OTk1NzI2MzAsImV4cCI6MTU5OTY1OTMzMCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.qReFPiToJjsUe0xRmSQzvQ7Q4v5U-B_X_zS9S2dq8jCjhNy_E5JScDr3Ab3JX1lQ-oxqZnoiPSgGr_FsqC7JfEQ0MhfkC7GiSIR8Rs6KyvexsSZiYY05UabyeYNEoVNPQVDbiUorgsEVphd7ohrLZNLxtR-cDJqDUokwtmO3oeOQ3LzNadBRHFpTBYdHslRs_xnPU9zsrAQgvn-_IX8-EpWjUtgTmRkdu6cjwUnUpTQPH5_icO5-g7Cn8Q6OAnNf__EMIIerbZjQPycd5if88L2c8ranwsk1VLlrkI4aXuU6UgufVYha4Hu3qMwQ9IahYdcQlCApovchjuLV0Ku2qQ' 
            }
        }, environment.urlWebGH);

        return configuracionSharepoint;
    } 

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracion().web.currentUser.select('*', 'Author/Department').expand('Author').get());
        return respuesta;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.select('*', 'User/Department').expand('User').get());
        return respuesta;
    } 
    
    obtenerJefe(UsuarioActualId) {
        let respuesta = this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.filter("usuario eq "+UsuarioActualId).select("*","Jefe/Title","Jefe/EMail").expand("Jefe").getAll();
        return respuesta;
    }

    ObtenerCentroCosto(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaCentroCostos).items.select('*', 'DirectorCeco/Title', 'DirectorCeco/ID, DirectorCeco/EMail').expand('DirectorCeco').get();
        return respuesta;
    }

    obtenerUnegocio() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaUnidadNegocio).items.select('*', 'Director/Title, Director/ID, Director/EMail').expand('Director').getAll());
        return respuesta;
    }
    
    GuardarParticipacion(ObjParticipacion, idOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.add(
            {
                Title: ObjParticipacion.ceco,
                Nombre: ObjParticipacion.nombre,
                NumeroJob: ObjParticipacion.Njob,
                PorcentajeAsumido: ObjParticipacion.asumido,
                OrdenCompraId: idOrden, 
                DirectorCecoId: ObjParticipacion.directorId           
            }
        )
        return respuesta;
    }

    EliminarParticipacion(IdParticipacion){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.getById(IdParticipacion).delete();
        return respuesta;
    }

    async GuardarItemsOrden(ObjItem, idOrden): Promise<any>{
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.add(
            {
                Title: ObjItem.Title,
                Elemento: ObjItem.Elemento,
                Especificaciones: ObjItem.Especificaciones,
                Cantidad: ObjItem.Cantidad,
                ValorUnitario: ObjItem.ValorUnitario,
                ValorTotal: ObjItem.ValorTotal,
                OrdenCompraId: idOrden
              }
        )
        return respuesta;
    }

    EliminarItemsOrden(ElementoId){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.getById(ElementoId).delete();
        return respuesta;
    }

    guardarOrden(ObjOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaOrdenCompra).items.add(ObjOrden);
        return respuesta;
    }

    async ObtenerElementos(numeroId): Promise<any>{
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.filter("numeroId eq "+numeroId).getAll();        
        return respuesta;
    }

    GuardarServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Orden de compra'").getAll();
        return respuesta;
    }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    EnviarNotificacion(objNotificacion){
        let respuesta = this.ObtenerConfiguracion().utility.sendEmail(objNotificacion);
        return respuesta;
    }

    obtenerOrdenCompra(idOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaOrdenCompra).items.getById(idOrden).get();
        return respuesta;
    }

    async obtenerFirmas(idUsuario): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.filter("usuarioId eq '"+idUsuario+"'").select("*","usuario/EMail").expand("usuario").get();
        return respuesta;
    }

    ValidarUsuarioGerente() {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaUsuariosAprobadores).items.getAll(); 
        return respuesta;
    } 

    obtenerParticipacion(idOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.filter("OrdenCompraId eq '"+idOrden+"'").select("*", "DirectorCeco/EMail").expand("DirectorCeco").get();
        return respuesta;
    }

    obtenerItems(idOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.filter("OrdenCompraId eq '"+idOrden+"'").get();
        return respuesta;
    }

    modificarOrden(idOrden, ObjOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaOrdenCompra).items.getById(idOrden).update(ObjOrden);
        return respuesta;
    }

    obtenerOrdenesPendientes(idUsuario){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaOrdenCompra).items.filter("ResponsableActualId eq '"+idUsuario+"'").select("*","NombreSolicitante/Title", "JefeDirecto/Title").expand("NombreSolicitante","JefeDirecto").getAll();
        return respuesta;
    }

    obtenerMisOrdenes(idUsuario){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaOrdenCompra).items.filter("NombreSolicitanteId eq '"+idUsuario+"'").select("*","NombreSolicitante/Title", "JefeDirecto/Title").expand("NombreSolicitante","JefeDirecto").orderBy("Id",true).getAll();
        return respuesta;
    }

    ObtenerConfiguracionApp(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaConfiguracionApp).items.filter("CodigoServicio eq '3'").getAll();
        return respuesta;
    } 
    
    ObtenerEmpresasAraujo(){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaEmpresasAraujoIbarra).items.getAll();
        return respuesta;
    }

    ObtenerConsecutivos() {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaEmpresasAraujoIbarra).items.getAll();
        return respuesta;
    }

    async ObtenerConsecutivoAsociado(): Promise<any>{
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaConfiguracionApp).items.filter("CodigoServicio eq '3'").select("ConsecutivoAsociados").getAll();
        return respuesta;
    }

    async ObtenerConsecutivoConsultores(): Promise<any>{
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaConfiguracionApp).items.filter("CodigoServicio eq '3'").select("ConsecutivoConsultores").getAll();
        return respuesta;
    }

    async GuardarConsecutivo(idRegistroConfig, ObjConsecutivo): Promise<any>{
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaConfiguracionApp).items.getById(idRegistroConfig).update(ObjConsecutivo);
        return respuesta;
    } 
    
    async ActualizarAprobacionParticipacion(id, Aprobado: boolean): Promise<any>{
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.getById(id).update({
            Aprobado: Aprobado
        });
        return respuesta;
    }

    ModificarParticipacion(id, Porcentaje, NJob){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.getById(id).update({
            PorcentajeAsumido: Porcentaje,
            NumeroJob: NJob
        });
        return respuesta;
    }

    obtenerProyectosJobs() {
        let respuesta = from(this.ObtenerConfiguracionJobs().web.lists.getByTitle(environment.ListaProyectos).select('*', 'Cliente').expand('Cliente').items.getAll());
        return respuesta;
    }

}