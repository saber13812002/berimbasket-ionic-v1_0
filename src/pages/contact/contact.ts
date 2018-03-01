import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerDetailPage } from '../player-detail/player-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
    providers:[RestProvider]
})

export class ContactPage {

    
    public people = new Array();
    
    private detailPage;
    
    data: any;
    //users: string[];
    errorMessage: string;
    page = 0;
    perPage = 10;
    totalData = 100;
    totalPage = 1;
    
    
  constructor(public navCtrl: NavController , public playerDataProvider:RestProvider, public loadingCtrl:LoadingController) {
      
      this .detailPage = PlayerDetailPage;
      
      let loader= loadingCtrl.create({content:"Loading Players"});
      loader.present();    
      
      playerDataProvider.getPlayer(0).subscribe(people=>{
        console.log('people : ' ,people)  ;
            for(let i =0;i<people.length;i++){
            people[i].logo="http://berimbasket.ir"+people[i].uImages;
            //people[i].logoB="http://berimbasket.ir"+people[i].logoTitleB;
            }
          loader.dismiss();
          
         this.data = people;
         this.people = this.data.data;
         this.perPage = this.data.per_page;
         this.totalData = this.data.total;
         this.totalPage +=1 ;//this.data.total_pages;
          
          this.people=people;
      });
      
//      this.people.push({name:"p1",id:1});
//      this.people.push({name:"p2",id:2});
//      this.people.push({name:"p3",id:3});
  }

    loadPlayerDetail(person){
        console.log(person);
        this.navCtrl.push(this.detailPage,{person:person});
    }
    
    doInfinite(infiniteScroll) {
      this.page = this.page+1;
      setTimeout(() => {
        this.playerDataProvider.getPlayer(this.page*10)
           .subscribe(
             people => {
            for(let i =0;i<people.length;i++){
            people[i].logo="https://berimbasket.ir"+people[i].uImages;
            //people[i].logoB="http://berimbasket.ir"+people[i].logoTitleB;
            }
               this.data = people;
               this.perPage = this.data.per_page;
               this.totalData = this.data.total;
               this.totalPage +=1;// this.data.total_pages;
               for(let i=0; i<this.data.length; i++) {
                 this.people.push(this.data[i]);
               }
             },
             error =>  this.errorMessage = <any>error);

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }
}
