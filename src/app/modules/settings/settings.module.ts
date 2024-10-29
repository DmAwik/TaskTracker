import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SettingsComponent } from './settings.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [SettingsComponent]
})
export class SettingsModule {}
