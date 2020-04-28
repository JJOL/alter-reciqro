import { TestBed, async } from '@angular/core/testing';

import { EventsService } from './events.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

describe('EventsService', () => {
  let mockFirestoreSpy: jasmine.SpyObj<AngularFirestore>; /*Tipo del servicio que quiero espiar o simular*/
  let eventService: EventsService;

  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        EventsService,
        { provide: AngularFirestore, useValue: firestoreMockSpy },
      ]
    });
    eventService = TestBed.get(EventsService);
    mockFirestoreSpy = TestBed.get(AngularFirestore); /*Assign mock to Service*/
  }));

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });
});
