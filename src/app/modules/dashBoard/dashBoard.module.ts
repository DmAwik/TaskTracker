import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashBoard.component'
import { AddTaskModule } from '../../shared/add-task/add-task.module'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { DashBoardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddTaskModule,
    HttpClientModule,
    HttpClientModule,
    TranslateModule,
    DashBoardRoutingModule
    //для всех
  ],
  //exports: [DashboardComponent]
})
export class DashBoardModule {}
