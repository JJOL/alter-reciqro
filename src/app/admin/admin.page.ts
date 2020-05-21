import { Component, OnInit } from '@angular/core';
import { AdminService } from '../core/services/admin.service';
import { AdminModel } from '../core/models/admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
/**
 * This component loads all the current user data
 */
export class AdminPage implements OnInit {
  admins: AdminModel[] = [];
  users: AdminModel[] = [];
  staffs: AdminModel[] = [];

  actualPage = 1;
  actualPage2 = 1;


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
    const arr: Array<{id: number, text: string}> = [];
    this.adminService.getAllAdministrators().then(admin => {
      this.admins = admin;
      if( this.admins != undefined){
        this.users = this.admins.filter( user => {
          return user.roles.indexOf('user') !== -1 && user.roles.indexOf('staff') == -1;
        });
        this.staffs = this.admins.filter( staff => {
          return staff.roles.indexOf('staff') !== -1 && staff.roles.indexOf('admin') == -1;
        });
      }
    });
  }

  /**
   * User Story ID: M4NG4
   * Method that calls the addAdmin method form the service adminService to delete an existing Admin entry
   */
  onAddAdmin(id: string) {
    this.adminService.addAdministratorUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admin => { 
        this.admins = admin;
        if( this.admins !== undefined){
          this.users = this.admins.filter( user => {
            return user.roles.indexOf('user') !== -1 && user.roles.indexOf('staff') == -1;
          });
          this.staffs = this.admins.filter( staff => {
            return staff.roles.indexOf('staff') !== -1 && staff.roles.indexOf('admin') == -1;
          });
        }
      } );
    });
  }

  /**
   * User Story ID: M4NG5
   * Deletes staff privilege from the user roles array
   */
  onDeleteAdmin(id: string) {
    this.adminService.removeStaffUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admin => { 
        this.admins = admin;
        if( this.admins !== undefined){
          this.users = this.admins.filter( user => {
            return user.roles.indexOf('user') !== -1 && user.roles.indexOf('staff') == -1;
          });
          this.staffs = this.admins.filter( staff => {
            return staff.roles.indexOf('staff') !== -1 && staff.roles.indexOf('admin') == -1;
          });
        }
       } );
    });
  }


  /**
   * User Story ID: M4NG4
   * Description: Query Users by Email to potentially promote one of them
   * @param event
   */
  searchUsersByAlias(event) {
    let searchVal: string = event.detail.value.trim();
    if (searchVal.length > 0) {
      console.log(searchVal);
      
      this.adminService.searchUsersByAlias(searchVal)
      .then(users => {
        this.users = users;
      })
      .catch(err => {
        this.users = [];
      });
    } else {
      this.users = [];
    }
  }
}

