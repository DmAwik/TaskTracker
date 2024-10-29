import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TasksPageComponent } from './tasks-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { EditTaskModule } from '../../shared/edit-task/edit-task.module'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [TasksPageComponent],
  imports: [CommonModule, ReactiveFormsModule, EditTaskModule, TranslateModule],
  exports: [TasksPageComponent]
})
export class TasksPageModule {}
