import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-sys-analytics',
  templateUrl: './sys-analytics.page.html',
  styleUrls: ['./sys-analytics.page.scss'],
})
/**
 * Description: Page for viewing fb external calls
 */
export class SysAnalyticsPage implements OnInit {

  calls: any[] = [];
  callMap: any = {};

  constructor(private systemServ: SystemService) { }

  /**
   * Description: Get Calls from cache and render
   */
  ngOnInit() {
    this.updateCalls();
  }

  /**
   * Description: Clear Calls Cache
   */
  onClearCache() {
    this.systemServ.clearCache();
    this.updateCalls();
  }

  /**
   * Description: Update Calls
   */
  updateCalls() {
    this.calls = this.systemServ.getCalls();
    this.calls.forEach(call => {
      this.callMap[call.key] = this.callMap[call.key]+1 || 1;
    });
  }

}
