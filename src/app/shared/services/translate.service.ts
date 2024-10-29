import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
// с маленькой
export class customTranslateService {
  constructor(public translate: TranslateService) {}

  public switchLanguage(language: string): void {
    this.translate.use(language)
  }
}
