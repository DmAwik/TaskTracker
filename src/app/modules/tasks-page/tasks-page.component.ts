import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core'
import { TaskService } from '../../shared/services/task.service'
import { Task } from '../../shared/interfaces/task.interface'
import { FormControl } from '@angular/forms'
import { EditTaskComponent } from '../../shared/edit-task/edit-task.component'
import { ThemeService } from '../../shared/services/theme.service'

@Component({
  selector: 'app-tasks-page',
  styleUrl: './tasks-page.component.scss',
  templateUrl: './tasks-page.component.html'
})
export class TasksPageComponent implements OnInit {
  @ViewChild('editModalContainer', { read: ViewContainerRef })
  public editModalContainer!: ViewContainerRef
  public modalRef!: ComponentRef<EditTaskComponent>
  //в группу
  public searchTitleControl: FormControl = new FormControl('')
  public searchDescriptionControl: FormControl = new FormControl('')
  public searchCategoryControl: FormControl = new FormControl('')
  public searchStatusControl: FormControl = new FormControl('')
  public searchPriorityControl: FormControl = new FormControl('')

  constructor(
    public taskService: TaskService,
    public themeService: ThemeService
  ) {
    this.taskService.loadTasks()
  }
  ngOnInit(): void {
    this.themeService.loadTheme()
  }

  public createEditForm(selectedTask: Task): void {
    this.editModalContainer.clear()
    this.modalRef = this.editModalContainer.createComponent(EditTaskComponent)
    this.modalRef.instance.task = selectedTask
    this.modalRef.instance.close = this.closeModal.bind(this)
    this.modalRef.instance.save.subscribe(this.saveDataFromModal.bind(this))
  }

  // отдельный сервис для модалок
  public closeModal(): void {
    this.modalRef.destroy()
  }
  public saveDataFromModal(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask)

    this.closeModal()
  }
}
