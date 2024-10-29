import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core'
import { TaskService } from '../../shared/services/task.service'
import { Task } from '../../shared/interfaces/task.interface'
import { Status } from '../../shared/types/task.types'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { AddTaskComponent } from '../../shared/add-task/add-task.component'
import { ThemeService } from '../../shared/services/theme.service'

@Component({
  selector: 'app-dashboard',
  styleUrl: './dashBoard.component.scss',
  templateUrl: './dashboard.component.html'
})
@UntilDestroy()
export class DashboardComponent implements OnInit {
  @ViewChild('modalContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef
  private addTaskComponentRef!: ComponentRef<AddTaskComponent>

  constructor(
    public taskService: TaskService,
    public themeService: ThemeService
  ) {
    this.taskService.loadTasks()
  }

  ngOnInit() {
    this.themeService.loadTheme()
  }

  public deleteTask(task: Task): void {
    this.taskService.deleteTask(task)
  }

  public getTasksByStatus(status: Status): Task[] {
    console.log("test");
    
    return this.taskService.tasks$
      .getValue()
      .filter((task) => task.status === status)
      .reverse()
  }
  public openAddTaskForm(): void {
    this.container.clear()

    this.addTaskComponentRef = this.container.createComponent(AddTaskComponent)

    this.addTaskComponentRef.instance.taskAdded.subscribe((task: any) => {
      this.taskService.addTask(task)
      this.closeAddTaskForm()
    })

    this.addTaskComponentRef.instance.formClosed.subscribe(() => {
      this.closeAddTaskForm()
    })
  }

  public closeAddTaskForm() {
    if (this.addTaskComponentRef) {
      this.addTaskComponentRef.destroy()
    }
  }
}
