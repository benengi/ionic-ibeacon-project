import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  hotmenuItems:any = [];
  coldmenuItems:any = [];
  cartPage = CartPage;
  item = {};
  type = 'hot';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP,
    private toastCtrl: ToastController,private storage: Storage) {
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

  addToFav(item:any){
    console.log('Item for fav: '+JSON.stringify(item));
    this.item = item;
    let toast = this.toastCtrl.create({
      message: 'Added To Favorites!',
      duration: 3000,
      position: 'bottom'
    });
    this.storage.get('User').then(user=>{
      this.http.post('https://smartcafeserver.herokuapp.com/api/addtofav',{item:this.item,user:user},{}).then(data=>{
        toast.present();
        console.log(data.data);
      });
    });   
  }

  ngOnInit() {
    console.log('Menu Items'+this.hotmenuItems);
    this.http.get('https://smartcafeserver.herokuapp.com/api/getitems',{},{}).then(data=>{
      console.log(data.data);
      const items = JSON.parse(data.data);
      items.items.forEach((item)=>{
        if(item.name == 'Cappucino' || item.name == 'Mocha' || item.name == 'Latte'){
          this.hotmenuItems.push(item);
          console.log('Item:'+JSON.stringify(item));
        } else {
          this.coldmenuItems.push(item);
        }        
      });
      console.log('Items:'+this.hotmenuItems);
    });
  }

}
