import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'detalhes-evento/:id', loadChildren: () => import('./detalhes-evento/detalhes-evento.module').then( m => m.DetalhesEventoPageModule)},
  { path: 'configuracoes', loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)},
  { path: 'lista-usuarios', loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule)},
  { path: 'perfil/:id', loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)},
  {
    path: 'nova-senha',
    loadChildren: () => import('./nova-senha/nova-senha.module').then( m => m.NovaSenhaPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
