import { Component } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  // template: `
  //   <div *ngIf="afAuth.user | async as user; else showLogin">
  //     <h1>Hello {{ user.displayName }}!</h1>
  //     <button (click)="logout()">Logout</button>
  //   </div>
  //   <ng-template #showLogin>
  //     <p>Please login.</p>
  //     <button (click)="login()">Login with Google</button>
  //   </ng-template>
  // `,
})

// <div *ngIf="afAuth.user | async as user; else showLogin">
//       <h1>Hello {{ user.displayName }}!</h1>
//       <button (click)="logout()">Logout</button>
//     </div>
//     <ng-template #showLogin>
//       <p>Please login.</p>
//       <button (click)="login()">Login with Google</button>
//     </ng-template>

export class HomePage {
groceryList;
itemList;


name:any;
price:any;
type:any;

key:any;
[x:string]:any;

  constructor(private grocery: GroceryService,private router:Router,private route:ActivatedRoute,)  {

   //this.groceryList=this.grocery.getItem();

    this.grocery.getItem2().subscribe(data => {
      //this.data = true;
     this.itemList = data.map ( e => {
       return{
         key: e.payload.doc.id,
         ...e.payload.doc.data()
       } as item;
     });
    console.log(this.itemList);
  })
}

ngOnInit(){
  this.route.queryParams.subscribe(params =>{
    console.log(params);
    this.key=params.key;
    this.price=params.price,
    this.name=params.name,
    this.type=params.type
   })
}


// update()
// {
//   this.grocery.update(this.itemList);
// }

click(item){
  this.router.navigate(['/edit'], { queryParams: {key:item.key ,name:item.name,price:item.price,type:item.type} });

}



}
