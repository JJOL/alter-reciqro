import { from } from 'rxjs';


export class MockAngularFirestore {
  
  private testData: any[];

  setTestData(testData: any[]) {
    this.testData = testData;
  }

  collection(keyPath) {
    return {
      add: (obj: any) => {
        this.testData = [...this.testData, obj];
      },  
      snapshotChanges: () => {
        let functionData = [...this.testData];
        const fbData = functionData.map(testObj => {
          return {
            payload: {
              doc: {
                data: () => testObj
              }
            }
          };
        });
        return from([ fbData ]);
      },
      doc: (id) => {
        return {
          delete: () => {
            let functionData = [...this.testData];
            functionData = functionData.filter(obj => {
              return obj.id !== id;
            } );
            return new Promise((resolve) => {
              resolve();
            });
          },
          set: () => {},
          valueChanges: () => {
            return from( [...this.testData] );
          }
        };
      },
    }
  }
}
