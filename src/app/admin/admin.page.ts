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

  liststaff: AdminModel[];

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
    this.adminService.getAllAdministrators().then(admins => {
      this.admins = admins;
      if( this.admins !== undefined){
        this.staffs = this.admins.filter( staff => {
          return staff.roles.indexOf('staff') !== -1 && -1 === staff.roles.indexOf('admin');
        });
        this.liststaff = this.staffs;
      }
    });
  }

  /**
   * User Story ID: M4NG4
   * Method that calls the addAdmin method form the service adminService to delete an existing Admin entry
   */
  onAddAdmin(id: string) {
    this.adminService.addAdministratorUser(id).then( () => {
      this.adminService.getAllAdministrators().then( admins => { 
        this.admins = admins;
        if( this.admins !== undefined){
          this.users = this.users.filter( user => {
            return user.id !== id;
          });
          this.staffs = this.admins.filter( staff => {
            return staff.roles.indexOf('staff') !== -1 && -1 === staff.roles.indexOf('admin');
          });
          this.liststaff = this.staffs;
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
          this.staffs = this.admins.filter( staff => {
            return staff.roles.indexOf('staff') !== -1 && -1 === staff.roles.indexOf('admin');
          });
          this.liststaff = this.staffs;
        }
      });
    });
  }


  /**
   * User Story ID: M4NG4
   * Description: Query Users by Name to potentially promote one of them
   * @param event
   */
  searchUsersByAlias(event) {
    let searchVal: string = event.detail.value.trim();
    if (searchVal.length > 0) {
      
      this.adminService.searchUsersByAlias(searchVal)
          .then(users => {
            this.users = users;
            this.users = this.users.filter( user => {
              return user.roles.indexOf('user') !== -1 && -1 === user.roles.indexOf('staff');
            });
          })
          .catch(() => {            
            this.users = [];
          });
    } else {
      this.users = [];
    }
  }

  /**
   * User Story ID: M4NG5
   * This function retrieves all staff users that have the name searched
   */
  searchByNameStaff(event){
    0 === event.detail.value.length ? this.liststaff = this.staffs:
    this.liststaff = this.staffs.filter( staff => {
      return staff.alias.toLowerCase().indexOf(event.detail.value.toLowerCase()) !== -1;
    })
  }
}

