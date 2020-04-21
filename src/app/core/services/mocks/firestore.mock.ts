

export class MockAngularFirestore {
  constructor() {
    return  jasmine.createSpyObj('AngularFirestore', [
      jasmine.createSpyObj('collection', ['and']),
    ]);
  }
}
