import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroceryService } from '../services/grocery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
  key;

object={
  name:"",
  price:"",
  type:""
}
  constructor(private route:ActivatedRoute,private grocery:GroceryService) { }

  ngOnInit() {
    this.route.queryParams
     
      .subscribe(params => {
        console.log(params); 

        this.key=params.key;
        this.object.name = params.name;
        this.object.price = params.price;
        this.object.type = params.type;
        console.log(this.key)
        console.log(params.name,params.price,params.type);
      });
  }
 
  update()
  {
    this.grocery.update(this.key,this.object)
  }

  delete()
  {
    this.grocery.delete(this.key);
   // console.log("deleted")
  }

  // save()
  // {
  //   this.grocery.set(this.key,this.object);
  // }

 
}