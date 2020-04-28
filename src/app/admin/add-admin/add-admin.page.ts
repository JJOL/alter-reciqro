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
}

