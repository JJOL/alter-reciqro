import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { InfoPage } from './info.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { AngularFirestore } from '@angular/fire/firestore';
import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { BannerPopUpPage } from './banner-pop-up/banner-pop-up.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerPopUpPageRoutingModule } from './banner-pop-up/banner-pop-up-routing.module';

const mockBannerService = jasmine.createSpyObj('bannerService', ['getBannerofDay', 'getAllInfoBanners']);

mockBannerService.getBannerofDay.and.returnValue(
    new Promise<any>((res) => {
      res([]);
}));

mockBannerService.getAllInfoBanners.and.returnValue(
    new Promise<any>((res) => {
      res([]);
}));

@NgModule({
  declarations: [ BannerPopUpPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerPopUpPageRoutingModule
  ]
})
class BannerModule {}

describe('InfoPage', () => {
  let component: InfoPage;
  let fixture: ComponentFixture<InfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), SharedPageModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: InfoBannerService, useValue: mockBannerService }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(InfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
