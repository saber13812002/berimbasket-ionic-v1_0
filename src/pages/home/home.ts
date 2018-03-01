import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlaygroundDetailPage } from '../playground-detail/playground-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers:[RestProvider]
})
export class HomePage {

    public court = new Array();
    private detailPage;
  
    options : GeolocationOptions;
    currentPos : Geoposition;

    
    data: any;
    //users: string[];
    errorMessage: string;
    page = 0;
    perPage = 10;
    totalData = 100;
    totalPage = 1;
    
    
  constructor(public navCtrl: NavController, public playerDataProvider:RestProvider, public loadingCtrl:LoadingController,private geolocation : Geolocation) {

      this.detailPage = PlaygroundDetailPage;
      
      let loader= loadingCtrl.create({content:"Loading Playgrounds"});
      loader.present();
      
      
       playerDataProvider.getPlayground(0,35.723284,51.441968).subscribe(court=>{
        console.log('court : ' ,court)  ;
           for(let i =0;i<court.length;i++){
               if(court[i].images[0])
            court[i].logo="http://berimbasket.ir"+court[i].images[0];
               else
                    court[i].logo="../../assets/imgs/logo.png";
            }
           //images
           
           loader.dismiss();
                     
         this.data = court;
         this.court = this.data.data;
         this.perPage = this.data.per_page;
         this.totalData = this.data.total;
         this.totalPage +=1 ;//this.data.total_pages;
           
           
           
          this.court=court;
      });
      
      
      
//      this.court.push({name:"aviny",id:1});
//      this.court.push({name:"talaghani",id:2});
//      this.court.push({name:"bagh iranian",id:3});
  }
    loadPlaygroundDetail(playground){
        console.log(playground);
        this.navCtrl.push(this.detailPage,{playground:playground});
    }
     
    doInfinite(infiniteScroll) {
      this.page = this.page+1;
        setTimeout(() => {
        this.playerDataProvider.getPlayground(((this.page)-1)*10,this.currentPos.coords.latitude,this.currentPos.coords.longitude)
           .subscribe(
             court => {
            for(let i =0;i<court.length;i++){
               if(court[i].images[0])
            court[i].logo="http://berimbasket.ir"+court[i].images[0];
               else
                    court[i].logo="../../assets/imgs/logo.png";
            }
               this.data = court;
               this.perPage = this.data.per_page;
               this.totalData = this.data.total;
               this.totalPage +=1;// this.data.total_pages;
               for(let i=0; i<this.data.length; i++) {
                 this.court.push(this.data[i]);
               }
             },
             error =>  this.errorMessage = <any>error);

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }


    getUserPosition(){
        this.options = {
            enableHighAccuracy : true
        };

        this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

            this.currentPos = pos;      
            console.log(pos);

        },(err : PositionError)=>{
            console.log("error : " + err.message);
        });
    }   

    ionViewDidEnter(){
        this.getUserPosition();
    }    



}
