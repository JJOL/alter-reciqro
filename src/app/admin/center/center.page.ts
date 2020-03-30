import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-center',
  templateUrl: './center.page.html',
  styleUrls: ['./center.page.scss'],
})

export class CenterPage implements OnInit {
  
  constructor(private firedb: AngularFirestore) { 
    
  }

  ngOnInit() {
  }

}
