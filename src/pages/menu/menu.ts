import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  menuItems:any = [];
  cartPage = CartPage;
  item = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP,
    private toastCtrl: ToastController) {
  }

  addToCart(item:any){
    console.log('Item:'+JSON.stringify(item));
    this.item = item;
    console.log('This item'+JSON.stringify(this.item));
    let toast = this.toastCtrl.create({
      message: 'Added To Cart!',
      duration: 3000,
      position: 'bottom'
    });
    this.http.post('https://smartcafeserver.herokuapp.com/api/addtocart',{item:this.item},{}).then(data=>{
      toast.present();
      console.log(data.data);
    });
  }

  ngOnInit() {
    console.log('Menu Items'+this.menuItems);
    this.http.get('https://smartcafeserver.herokuapp.com/api/getitems',{},{}).then(data=>{
      console.log(data.data);
      const items = JSON.parse(data.data);
      items.items.forEach((item)=>{
        this.menuItems.push(item);
        console.log('Item:'+JSON.stringify(item));
      });
      console.log('Items:'+this.menuItems);
    });
  }

}
