import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin/admin.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {NewsComponent} from "./news/news.component";
import {ViewComponent} from "./news/view/view.component";

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'news', component: NewsComponent, children: [
      {path: 'view/:news_id', component: ViewComponent},
    ]}

  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
