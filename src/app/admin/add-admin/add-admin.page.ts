import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
/**
 * This component loads all the current user data
 */
export class AddAdminPage implements OnInit {
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
  
  /**
   * User Story Id: M4NG4
   * Method that calles the addAdmin method form the service adminService to delete an existing Admin entry
   */
  onAddAdmin(id: string) {
    this.adminService.addAdministratorUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admin => { this.admins = admin } );
    });
  }

  /**
   * User Story Id: M4NG5
   * Method that calles the deleteAdmin method form the service adminService to delete an existing Admin entry
   */
  onDeleteAdmin(id: string) {
    this.adminService.removeAdministratorUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admin => { this.admins = admin } );
    });
  }

  
}

