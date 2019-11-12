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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU3MzU3NzMzMCwibmJmIjoxNTczNTc3MzMwLCJleHAiOjE1NzM2MDY0MzAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.BGqN2U_AM8MlZDJtEjaj8ZmZuZKXHh6hxU2mo0KSJaP4ezsEK-0fzoIxQ6ErH7ojAuZL7jofykJdr6CqUbbt2qMPGLenj0SZd73R8hPecxl66J0IDmsRArg-UwYVNC9zAX5NNdnAxDz4ltw9iMQNxToQL8gfyTU6C96Q_xks-7lV_RWGLOtL6hu22r_ttdi7gADRUw8XIXLdSL1MtjFRKbpofhfrZWmKKBEI7nsw71Lk28sktjcaGljM2N8vl0MO3m4M5uwsLfnAR7HHpvLT1RgvnTO0TO2sw5dXRmX7BpFJtk0MsQwRffWDHuotDjfWz3B4EvQSI7nW3tCzRWIGHQ'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU3MzU3NzI5NiwibmJmIjoxNTczNTc3Mjk2LCJleHAiOjE1NzM2MDYzOTYsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiZmFlYWNkNGUtN2E4OS00ZjU5LWFmYjAtNmNjNzJiYTA1YTJkQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInN1YiI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.Q8gA1Tii0-Hbe_-ESDF_V6eWFeEc922NSRdpca-GB0XiHMze0fdNRjoTVcgDBmxDKNZEqOD_7KEpooFmLgjgCoUl1IVDF-MLMmWPbVVo6OjHQNDGfJ_pHnAwUgRWgQgfsRelqafV6ph61YWDRNqrhL_WYqwYAy6GPWqA3mm5pWq9XgV2bDp4gPjvZFSFlWlLhufPM9_jYrFhOmLDhitwEk9JygohQGf7biyYU9tV8BS8fvEgGLk5HoUijDQaciDncadl7ydK-IFdHCZT7cSGtsNUOzdRt6kJxkDDKbiRO7OLg5j5Q1TP9f5xe6DTKleBJhAJh0BloiMgfoIuKnBjTw' 
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