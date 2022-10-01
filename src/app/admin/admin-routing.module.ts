import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './alunos/details/details.component';
import { EditComponent } from './alunos/edit/edit.component';
import { HomeComponent } from './alunos/home/home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'alunos', component: HomeComponent },
      { path: 'alunos/detalhes/:id', component: DetailsComponent },
      { path: 'alunos/edit/:id', component: EditComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
