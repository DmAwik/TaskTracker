import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public currentTheme: string = 'light-theme'

  constructor() {
    this.loadTheme()
  }

  public toggleTheme() {
    this.currentTheme =
      this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
    this.applyTheme()
  }

  //переписать 
  private applyTheme() {
    document.body.className = this.currentTheme
    const editContainer = document.querySelector('.edit-container')
    if (editContainer instanceof HTMLElement) {
      editContainer.classList.remove('light-theme', 'dark-theme')
      editContainer.classList.add(this.currentTheme)
    }

    const taskBoard = document.querySelector('.task-board')
    if (taskBoard instanceof HTMLElement) {
      taskBoard.classList.remove('light-theme', 'dark-theme')
      taskBoard.classList.add(this.currentTheme)
    }

    const addContainer = document.querySelector('.modal-content')
    if (addContainer instanceof HTMLElement) {
      addContainer.classList.remove('light-theme', 'dark-theme')
      addContainer.classList.add(this.currentTheme)
    }
    console.log(taskBoard)

    const inputs = document.querySelectorAll('input')
    inputs.forEach((button) => {
      button.classList.remove('light-theme', 'dark-theme')
      button.classList.add(this.currentTheme)
      console.log(button)
    })
    const selects = document.querySelectorAll('select')
    selects.forEach((select) => {
      select.classList.remove('light-theme', 'dark-theme')
      select.classList.add(this.currentTheme)
    })
    const labels = document.querySelectorAll('label')
    labels.forEach((label) => {
      label.classList.remove('light-theme', 'dark-theme')
      label.classList.add(this.currentTheme)
    })

    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      button.classList.remove('light-theme', 'dark-theme')
      button.classList.add(this.currentTheme)
    })
    localStorage.setItem('theme', this.currentTheme)
  }

  public loadTheme(): void {
    const savedTheme = localStorage.getItem('theme')
    this.currentTheme = savedTheme ? savedTheme : 'light-theme'
    this.applyTheme()
  }
  public setDefaultTheme(): void {
    localStorage.setItem('theme', 'light-theme')
    this.loadTheme()
  }
}
