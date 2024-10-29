import { Injectable } from '@angular/core'
import { BehaviorSubject, tap } from 'rxjs'
import { Task, TaskCount } from '../interfaces/task.interface'
import { HttpClient } from '@angular/common/http'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Status } from '../types/task.types'
import { FormControl } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
@UntilDestroy()
export class TaskService {
  public taskCounts: Record<Status, number> & { total: number } = {
    new: 0,
    inProgress: 0,
    completed: 0,
    total: 0
  }
  public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])

  private url: string = 'http://localhost:3000/tasks'
  constructor(private http: HttpClient) {}
  public loadTasks(): void {
    this.http
      .get<Task[]>(this.url)
      .pipe(untilDestroyed(this))
      .subscribe((tasks) => {
        this.loadTaskCounts(tasks)
        this.tasks$.next(tasks.reverse())
      })
      //подписку в компоненте на случай ращных мапперов для одних и тех же объектов
  }

  private loadTaskCounts(tasks: Task[]): void {
    this.taskCounts.completed = tasks.filter(
      (task) => task.status === 'completed'
    ).length
    this.taskCounts.new = tasks.filter((task) => task.status === 'new').length
    this.taskCounts.inProgress = tasks.filter(
      (task) => task.status === 'inProgress'
    ).length
    this.taskCounts.total =
      this.taskCounts.inProgress +
      this.taskCounts.completed +
      this.taskCounts.new
  }

  private updateTaskCounts(
    oldStatus: Status,
    newStatus: Status | null = null
  ): void {
    if (newStatus) {
      this.taskCounts[newStatus]++
      this.taskCounts[oldStatus]--
    } else {
      if (oldStatus) {
        this.taskCounts[oldStatus]--
        this.taskCounts.total--
      }
    }
  }

  public addTask(task: Task): void {
    this.http
      .post<Task>(this.url, task)
      .pipe(
        untilDestroyed(this),
        tap((task) => {
          //в сабджект без вызова
          return this.loadTasks()
        })
      )
      .subscribe()
  }

  public deleteTask(task: Task): void {
    this.tasks$.next(this.tasks$.getValue().filter((i) => i !== task))
    this.updateTaskCounts(task.status)
    this.http
      .delete(`${this.url}/${task.id}`)
      .pipe(untilDestroyed(this))
      .subscribe()
  }
  public saveModifiedStatusTask(task: Task, newStatus: Status): void {
    this.updateTaskCounts(task.status, newStatus)
    task.status = newStatus
    this.tasks$.next(
      this.tasks$.getValue().map((i) => (i.id === task.id ? task : i))
    )

    this.http
      .put(`${this.url}/${task.id}`, task)
      .pipe(untilDestroyed(this))
      .subscribe()
  }
  public filterTasks(
    searchTitleControl: FormControl,
    searchCategoryControl: FormControl,
    searchStatusControl: FormControl,
    searchDescriptionControl: FormControl,
    searchPriorityControl: FormControl
  ): Task[] {
    return this.tasks$
      .getValue()
      .filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(searchTitleControl.value.toLowerCase()) &&
          task.status
            .toLowerCase()
            .includes(searchStatusControl.value.toLowerCase()) &&
          task.description
            .toLowerCase()
            .includes(searchDescriptionControl.value.toLowerCase()) &&
          task.priority
            .toLowerCase()
            .includes(searchPriorityControl.value.toLowerCase()) &&
          task.category
            .toLowerCase()
            .includes(searchCategoryControl.value.toLowerCase())
      )
  }

  public updateTask(updatedTask: Task): void {
    const currentTasks: Task[] = this.tasks$.value

    const updatedDataArray: Task[] = currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )

    this.http
      .put<Task>(`${this.url}/${updatedTask.id}`, updatedTask)
      .pipe(untilDestroyed(this))
      .subscribe()

    this.tasks$.next(updatedDataArray)
  }

  public deleteAllTasks(): void {
    this.tasks$.getValue().forEach((task) => {
      this.http.delete(`${this.url}/${task.id}`).subscribe()
    })
    this.tasks$.next([])
  }
}
