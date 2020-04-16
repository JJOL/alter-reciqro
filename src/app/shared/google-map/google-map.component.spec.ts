import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GoogleMapComponent } from './google-map.component';


describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const place = {id: 'asd', name: 'dasd', description: 'dasd', location: {lat: 100, lng: 200}, qr_code: 'das', photo: 'das', address: 'dsa', postal_code: 1, places_type: {id: '', name: 'das', icon: 'das'}};

  it('should add marker', () => {
    expect(component.addPlace(place)).toEqual(1);
  });

  it('should add place', () => {
    expect(component.addMarker(place)).toEqual(1);
  });
});
