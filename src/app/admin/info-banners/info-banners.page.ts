import { Component, OnInit } from '@angular/core';
import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { InfoBanner } from 'src/app/core/models/info-banner.model';

@Component({
  selector: 'app-info-banners',
  templateUrl: './info-banners.page.html',
  styleUrls: ['./info-banners.page.scss'],
})
export class InfoBannersPage implements OnInit {

  infoBanners: InfoBanner[]

  constructor(
    private infoBannerService: InfoBannerService
  ) { }

  ngOnInit() {
    this.infoBannerService.getAllInfoBanners()
    .then(infoBanners => {
      this.infoBanners = infoBanners;
    });
  }

}
