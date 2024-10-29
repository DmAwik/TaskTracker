import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditTaskComponent } from './edit-task.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [EditTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [EditTaskComponent]
})
export class EditTaskModule {}
