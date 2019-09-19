import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceryService } from '../services/grocery.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  item={
    name:"",
    price:0,
    type:""
  }

  constructor(private alert:AlertController,private grocery: GroceryService) { //injecting alertController

    
   } 

  ngOnInit() {
  }

  submit(){
    this.grocery.post(this.item,this.alert)
  }

}
