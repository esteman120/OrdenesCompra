import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatCardModule, MatRadioModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatTableModule, MatPaginatorModule, MatToolbarModule } from '@angular/material';
import { BsModalService, ModalModule, BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';

import { SPServicio } from './Servicios/sp-servicio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerarOrdenCompraComponent } from './generar-orden-compra/generar-orden-compra.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_DATE_FORMATS } from './date.adapter';
import { CacheInterceptor } from './http-interceptors/cacheInterceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from './directivas/numbers-only.directive';
import { NgxCurrencyModule } from "ngx-currency";
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VerOrdenCompraComponent } from './ver-orden-compra/ver-orden-compra.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { EditarOrdenesComponent } from './editar-ordenes/editar-ordenes.component';
import { MisPendientesComponent } from './mis-pendientes/mis-pendientes.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerarOrdenCompraComponent, 
    OrdenCompraComponent,
    NumberDirective,
    VerOrdenCompraComponent,
    EditarOrdenesComponent,
    MisPendientesComponent
  ],
  imports: [    
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    //ngx bootstrap
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [    
    BsModalService,
    SPServicio,
    { 
      provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true 
    }, 
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
