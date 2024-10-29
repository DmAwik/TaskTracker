import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddTaskComponent } from './add-task.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [AddTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [AddTaskComponent]
})
export class AddTaskModule {}
