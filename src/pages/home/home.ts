import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlaygroundDetailPage } from '../playground-detail/playground-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 

import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers:[RestProvider]
})
export class HomePage {

    languageSelected : any = 'en';
    languages : Array<LanguageModel>;

    public court = new Array();
    private detailPage;
  
    options : GeolocationOptions;
    currentPos : Geoposition;

    apiUrl = 'https://berimbasket.ir/';
    apiFolder = 'bball';      
    
    data: any;
    //users: string[];
    errorMessage: string;
    page = 0;
    perPage = 10;
    totalData = 100;
    totalPage = 1;
    
    
  constructor(
        public navCtrl: NavController, 
        public playerDataProvider:RestProvider, 
        public loadingCtrl:LoadingController,
        private geolocation : Geolocation,    
        public translate: TranslateService,
        public languageService: LanguageServiceProvider
    ) {

      this.detailPage = PlaygroundDetailPage;
      
      let loader= loadingCtrl.create({content:"Loading Playgrounds"});
      loader.present();
      
      this.languages = this.languageService.getLanguages();
      this.setLanguage();
      
       playerDataProvider.getPlayground(0,35.723284,51.441968).subscribe(court=>{
        console.log('court : ' ,court)  ;
            for(let i =0;i<court.length;i++){
                if(court[i].images[0])
            court[i].logo=this.apiUrl+court[i].images[0];
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
            court[i].logo=this.apiUrl+court[i].images[0];
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

    setLanguage(){
        let defaultLanguage = this.translate.getDefaultLang();
        if(this.languageSelected){
          this.translate.setDefaultLang(this.languageSelected);
          this.translate.use(this.languageSelected);
        }else{
          this.languageSelected = defaultLanguage;
          this.translate.use(defaultLanguage);
        }
      }

}
