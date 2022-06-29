import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(), // forRoot = need to initialize services or components
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule, 
    NgxGalleryModule,
    FileUploadModule,
    TimeagoModule.forRoot(),
  ],
  exports: [
    BsDropdownModule,
    BsDatepickerModule,
    PaginationModule,
    ToastrModule,
    TabsModule,
    ButtonsModule,
    NgxGalleryModule,
    FileUploadModule,
    TimeagoModule,
  ]
})
export class SharedModule { }
