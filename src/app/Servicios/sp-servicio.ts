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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTg1NTkyOTc2LCJuYmYiOjE1ODU1OTI5NzYsImV4cCI6MTU4NTYyMjA3NiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.ixEo5L17CgXpFK58oX3N52cuaaf0GUNNbkEZjUaTA70gKp9iBMEDuld6jHJrQ3qK9bVenWLOHTzSobzOjZjeK3-eLN9kYosEkQr1zr8YHsn47CJkCKRjNZ6nwtoCOg9X9SH6id5rspkdhRpp3zEbfRS1sPkFfV2ST44pdfC8o-E9zt96rtc6pIiIGO9Wmt9rzXg37SqgG0lZKK9Tk8olhzdYWLwRe4Ww6zJtGLyeWeraXIURI-4ny2Ghr1VrdR1DSSUDV_52WxFezD4MqXdvUx8vwr_EF_cnWtjTSn26K_n9oy8KrXuRONZnJ-3hZRCsozR4IBSI51Il3LlqowTbtg'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTg1NTkzMDA2LCJuYmYiOjE1ODU1OTMwMDYsImV4cCI6MTU4NTYyMjEwNiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.BiB4FkdZ_som3bUKjNWUCtBgMOTSstiGiPZ8i9H0aLFiC_feU-_GKzVSShMAZHcFowYFyswDKlGNhTtOROAhxmZsIIUTSFo6g05OWwAmntLw80LRPWdsCAbs48o7rv0EH0vys9n4IjPelWfrpsRvDx3FOhlmtixMh9N2XwlBS95e2M1BF_T5CSq0WGIujPtRJDyyJ9yN5sE-sUREHg2VogfekEbYVV9QzMv3tCVIbfAyq-RSCuNFQ0nbSPTvDkKJenvhhrXDpnd3CVSy1UrErTLRgjkJ_u4y5Br3Sg8yUGs2be30g6WRkDDKCP_lmP5JBXxaCQwVk08GN8iNlo6eOg' 
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

}