import { Component, NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagmentComponent } from '../user-managment/user-managment.component';
import { PhotoManagmentComponent } from '../photo-managment/photo-managment.component';
import { HasRoleDirective } from 'src/app/_directives/has-role.directive';
import { SharedModule } from 'src/app/_modules/shared/shared.module';
@Component({
  standalone: true,
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  imports:[UserManagmentComponent, TabsModule, PhotoManagmentComponent, SharedModule]
})
export class AdminPanelComponent {

  

}
