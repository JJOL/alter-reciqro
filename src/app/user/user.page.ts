import { Component, OnInit } from '@angular/core';
import { DelegationService } from '../core/services/delegation.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  delegations: any[];

  constructor(private delegationService: DelegationService) { }

  ngOnInit() {
    this.delegationService.getDelegations().then(delegation => {
      this.delegations = delegation;
    });
  }

}
