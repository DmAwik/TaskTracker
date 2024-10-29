import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Task } from '../interfaces/task.interface'
import { ThemeService } from '../services/theme.service'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @Input() task!: Task
  @Output() save: EventEmitter<Task> = new EventEmitter<Task>()
  public formGroup: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    public themeService: ThemeService
  ) {
    this.formGroup = this.formBuilder.group({
      id: '',
      title: '',
      description: '',
      category: '',
      priority: '',
      status: ''
    })
  }

  ngOnInit() {
    this.formGroup.setValue(this.task)
    this.themeService.loadTheme()
  }
  public close(): void {}
  public saveData(): void {
    this.save.emit(this.formGroup.value)
  }
}
