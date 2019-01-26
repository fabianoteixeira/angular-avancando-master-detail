import { EntryListComponent } from './category-list/enty-list.component';
import { NgModule } from '@angular/core';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';

import {CalendarModule} from 'primeng/calendar';
import {IMaskModule} from 'angular-imask';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule
  ],
  exports: [
    
  ]
})
export class EntriesModule { }
