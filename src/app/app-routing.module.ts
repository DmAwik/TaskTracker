import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './modules/dashBoard/dashBoard.component'
import { AddTaskComponent } from './shared/add-task/add-task.component'
import { TasksPageComponent } from './modules/tasks-page/tasks-page.component'
import { SettingsComponent } from './modules/settings/settings.component'

const routes: Routes = [
  { path: 'dashboard', loadChildren: ()=> import('../app/modules/dashBoard/dashBoard.module').then (module => module.DashBoardModule) },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'add-task-page', component: AddTaskComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: ''}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
