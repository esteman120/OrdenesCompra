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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTk1MzYwMDQ4LCJuYmYiOjE1OTUzNjAwNDgsImV4cCI6MTU5NTQ0Njc0OCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.Ph8SFea4etVkV2fDUU587kFcl6RUzHdwXhL_wpnC5IPYYbIB0xkeuiv32PipzxJ8zZqO7S_u0EsWvm0I_ynUtQerJkaZxPc0sO5ANT0M2Ff-zs4U-zhanjZ8603ie0wOux9TLhJ4Zon6KEG1GZ6jG6RJlKD9AMfBLjJ6RC1Pj4Hh-_H6OeTrF7ck4h-Wb2pyMwIdaSHhHGH_IbWxIWRVdqN50-H2Nrd9Kn-e3rlpUe0HopTGHiDz-5-f9l0cD2AHSyXz171-2ip1yaw9rISjhBvY2UzEoYlHT9Zi8_Uj5TdZtduuKSbS6rasQQ2E7LYd5BTJky72EoUohVUygzb8NA'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTk1MzYwMDc4LCJuYmYiOjE1OTUzNjAwNzgsImV4cCI6MTU5NTQ0Njc3OCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.kMGD6IbOJ6HdfO5Zn2lIAQMpeNA7FuyTYn9uEH91IvtJlKkZ8NBlq1aC2XrfuhMF256PJdo2AdAyKYnxXbY1DTftjXilQfItwdrqzJOQVYFQFQdWSku8IOi3wpouo9JD8VfZn3K0dhZ9C2bQRcUfjGFCKDHFkqvR0uIbeTH3Hzx2yXGPhZUDU2wqH92USpcdH9mp1tu2efSrjvjILkZoDbGLg5Q_oQtGJCok9YBc3uIiPB3WgNXdbofz-ICKU77O1f-ZCq3tUw8aNoPJ9m5woCZUGTx8ebQXru9h223Z8P1yn8isRAKL_cu7eRkX1q823lGyWtnaQ9ymNjKcDDCUIw' 
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
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaCentroCostos).items.select('*', 'DirectorCeco/Title', 'DirectorCeco/ID').expand('DirectorCeco').get();
        return respuesta;
    }

    GuardarParticipacion(ObjParticipacion, idOrden){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.add(
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
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.getById(IdParticipacion).delete();
        return respuesta;
    }

    async GuardarItemsOrden(ObjItem, idOrden): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.add(
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
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.getById(ElementoId).delete();
        return respuesta;
    }

    guardarOrden(ObjOrden){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaOrdenCompra).items.add(ObjOrden);
        return respuesta;
    }

    async ObtenerElementos(numeroId): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaItemsOrdenCompra).items.filter("numeroId eq "+numeroId).getAll();        
        return respuesta;
    }

    GuardarServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Orden de compra'").getAll();
        return respuesta;
    }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    EnviarNotificacion(objNotificacion){
        let respuesta = this.ObtenerConfiguracionConPost().utility.sendEmail(objNotificacion);
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
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaOrdenCompra).items.getById(idOrden).update(ObjOrden);
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
        let respuesta = await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaConfiguracionApp).items.getById(idRegistroConfig).update(ObjConsecutivo);
        return respuesta;
    } 
    
    async ActualizarAprobacionParticipacion(id, Aprobado: boolean): Promise<any>{
        let respuesta = await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.getById(id).update({
            Aprobado: Aprobado
        });
        return respuesta;
    }

    ModificarParticipacion(id, Porcentaje, NJob){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaPorcentajeUnidades).items.getById(id).update({
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