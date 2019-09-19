import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GroceryService } from '../services/grocery.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;

  constructor(private navCtrl: NavController,private grocery: GroceryService) { }

  ngOnInit() {

    if(this.grocery.userDetails()){
      this.userEmail = this.grocery.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

  }

  logout(){
    this.grocery.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
