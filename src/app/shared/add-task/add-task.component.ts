import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ThemeService } from '../services/theme.service'
import { Task } from '../interfaces/task.interface'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  public addTaskForm: FormGroup

  @Output() taskAdded = new EventEmitter<Task>()
  @Output() formClosed = new EventEmitter<void>()

  constructor(private fb: FormBuilder, public themeService: ThemeService) {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.themeService.loadTheme()
  }

  public addTask(): void {
    if (this.addTaskForm.valid) {
      const newTask = {
        ...this.addTaskForm.value,
        status: 'new'
      }
      this.taskAdded.emit(newTask)
      this.addTaskForm.reset()
    }
  }

  public closeForm(): void {
    this.formClosed.emit()
  }
}
