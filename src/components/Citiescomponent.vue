<template>
<div>
<confirm-component v-if="confirmation" v-on:noDeleted="cancelDel" v-on:okDeleted="makeDel($event)" v-bind:itemid="del_id"></confirm-component>

<!--<div class="bg bg-sub"></div>-->
<div class="container-fluid container-k">
<menu-component></menu-component>
<div class="row">
<div class="col-md-3 filter-column">
<addcity-component v-bind:provinceslist="provinces" v-on:cityAdded="updateList($event)"></addcity-component>
<filtercity-component v-bind:provinceslist="provinces" v-on:cityFilter="filterList($event)" v-on:clearFilter="clearFilter"></filtercity-component>




</div>
<div class="col-md-9">
<div class="d-flex justify-content-end"><h6><em>Liczba miast: {{count}}</em></h6></div>
    <div class="list-row-k row-names d-none d-sm-flex">
    	<div class="d-flex part-data">
      		<div class="p-2 cell cell-50">Nazwa miasta</div>
      		<div class="p-2 cell cell-50">Województwo</div>
      	</div>
      	<div class="d-flex part-actions">
      		<div class="p-2">&nbsp;</div>
      	</div>
    </div>

    <city-component v-for="city in cities" v-bind:key="city.id" v-bind:citydata="city" v-bind:provinceslist="provinces" v-on:confirmDeleted="showConfirm($event)"></city-component>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0"></div>
    
    </div>
   </div>
</div>
</div>
</template>

<script>
import City from '../components/Citycomponent.vue';
import Menu from '../components/Menucomponent.vue';
import AddCity from '../components/add/Addcitycomponent.vue';
import FilterCity from '../components/filter/Filtercitycomponent.vue';
import Confirm from '../components/Confirmcomponent.vue';

export default {
  data() {
    return {
      cities: [],
      provinces: [],
      errors: [],
      count: 0,
      busy: false,
      start: 0,
      end: 0,
      portion: 20,
      current_filter:'',
      confirmation: false,
      del_id:0,
    }
  },
  components:{
  		'city-component': City,
  		'menu-component': Menu,
      'addcity-component': AddCity,
      'filtercity-component': FilterCity,
      'confirm-component': Confirm,

  },
  created() {
      this.countAll();
      this.getFirstPortion();
      this.getProvinces();
  },
  methods:{
    getProvinces(){
      const token = localStorage.getItem('token');
      this.axios.get('http://backkontrah.nilow13.usermd.net/api/provinces' + '?token=' + token)
    .then(response => {
      this.provinces = response.data.provinces;
    })
    .catch(e => {
      console.log(e)
    });
    },

    countAll(){
      //countall
      const token = localStorage.getItem('token');
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/citiescountall' + '?token=' + token)
    .then(response => {
      this.count = response.data.count
    })
    .catch(e => {
      console.log(e)
    });
    },

    getFirstPortion(){
    const token = localStorage.getItem('token');
    this.start = 0;
    //get first portion
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/cities/'+ (this.start * this.portion) + '?token=' + token)
    .then(response => {
      this.cities = response.data.cities;
      console.log(this.cities);
    })
    .catch(e => {
      console.log(e)
    });
    },

    updateList(body){
    const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/city' + '?token=' + token, body)
        .then(response => {
          if(this.current_filter == body.province_id){
           this.axios.post('http://backkontrah.nilow13.usermd.net/api/cities' + '?token=' + token,{
      province_id: body.province_id

      })
            .then(response => {
              this.cities = response.data.cities;
              this.count = this.cities.length;
              console.log(this.cities);
            })
            .catch(e => {
              console.log(e)
            });
          }
          else{
          if(this.current_filter ==''){
             this.countAll();
             this.getFirstPortion();
           }
           }
         
        })
        .catch(e => {
          console.log(e)
        });
    },
    /*onCityDeleted(id){
      const position = this.cities.findIndex((element) => {
              return element.id == id;
      });
      this.cities.splice(position, 1);
      this.count--;
    },*/

    showConfirm(cityid){
    this.confirmation = true;
    this.del_id = cityid;
    //console.log('vvvvv' + cityid)
  },

  cancelDel(){
  this.confirmation = false;
  },

  makeDel(cityid){
    const token = localStorage.getItem('token');
    this.confirmation = false;
    console.log('usuwanie!!!!' + cityid);
    this.axios.delete('http://backkontrah.nilow13.usermd.net/api/city/'+ cityid + '?token=' + token)
            .then(response => {
              const position = this.cities.findIndex((element) => {
                         return element.id == cityid;
              });
              this.cities.splice(position, 1);
              this.count--;
            })
            .catch(e => {
              console.log(e)
            });
  },

    filterList(filter){
    const token = localStorage.getItem('token');
    this.current_filter = filter.filterprovince;
      //console.log('filter' + filter.filterprovince);
      this.axios.post('http://backkontrah.nilow13.usermd.net/api/cities' + '?token=' + token,{
      province_id: filter.filterprovince 

      })
            .then(response => {
              this.cities = response.data.cities;
              this.count = this.cities.length;
              console.log(this.cities);
            })
            .catch(e => {
              console.log(e)
            });
    },
    clearFilter(){
      this.countAll();
      this.getFirstPortion();

    },

    loadMore(){
      console.log('loadmore');
      const token = localStorage.getItem('token');
      if(this.cities.length < this.count){
          busy: true;
          this.start++;
          this.axios.get('http://backkontrah.nilow13.usermd.net/api/cities/'+ (this.start * this.portion) + '?token=' + token)
        .then(response => {
          this.cities = this.cities.concat(response.data.cities);
          console.log(this.cities);
          busy: false;
        })
        .catch(e => {
          console.log(e)
        });
    }
    }
  }

}


</script>

