import { Component, OnInit } from '@angular/core'
import { ThemeService } from '../../shared/services/theme.service'
import { customTranslateService } from '../../shared/services/translate.service'
import { SettingsService } from '../../shared/services/settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    public translateService: customTranslateService,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {}
}
