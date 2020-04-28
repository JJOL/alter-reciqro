import { Component, OnInit } from '@angular/core';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType } from 'src/app/core/models/waste-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-waste-type',
  templateUrl: './detail-waste-type.page.html',
  styleUrls: ['./detail-waste-type.page.scss'],
})
export class DetailWasteTypePage implements OnInit {

  loadedWasteType: WasteType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private wasteService: WasteService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.wasteService.getWasteById(wasteId).then(waste => {
          this.loadedWasteType = waste;
        });
      }
    });
  }

}
