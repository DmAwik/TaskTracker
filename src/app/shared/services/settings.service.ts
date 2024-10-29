import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { TaskService } from './task.service'
import { ThemeService } from './theme.service'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
    private taskService: TaskService,
    private themeService: ThemeService,
    private cts: TranslateService
  ) {}

  public resetSettings(): void {
    this.taskService.deleteAllTasks()
    this.themeService.setDefaultTheme()
    this.cts.use('ru')
  }
}
