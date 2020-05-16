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
   * User Story ID: M4NG6
   * Loads the users
   */
  ngOnInit() {
    this.adminService.getAllAdministrators().then(admin => {
      this.admins = admin;
    });
  }

  /**
   * User Story ID: M4NG4
   * Method that calls the addAdmin method form the service adminService to delete an existing Admin entry
   */
  onAddAdmin(id: string) {
    this.adminService.addAdministratorUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admin => { this.admins = admin } );
    });
  }

  /**
   * User Story ID: M4NG5
   * Deletes staff privilege from the user roles array
   */
  onDeleteAdmin(id: string) {
    this.adminService.removeStaffUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admin => { this.admins = admin } );
    });
  }
}

