import { Component, OnInit } from '@angular/core';
import { AdminService } from '../core/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
/**
 * This component loads all the current user data
 */
export class AdminPage implements OnInit {
  admins: any[];
  /**
   * Constructor for the class, the external services required are the Admin Service 
   * @param  {AdminService} privateadminService
   */
  constructor(private adminService: AdminService) { }

  /**
  * Loads the users
  */
  ngOnInit() {
    this.adminService.getAllAdministrators().then(admin => {
      this.admins = admin;
    });
  }
}
