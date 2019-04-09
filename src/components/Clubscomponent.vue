<template>
<div>
<confirm-component v-if="confirmation" v-on:noDeleted="cancelDel" v-on:okDeleted="makeDel($event)" v-bind:itemid="del_id"></confirm-component>

<!--<div class="bg bg-sub"></div>-->
<div class="container-fluid container-k">
<menu-component></menu-component>
<div class="row">
<div class="col-md-3 filter-column">
<addclub-component v-bind:provinceslist="provinces" v-bind:citieslist="cities" v-on:provinceSelected="filterCities($event,'add')" v-on:clubAdded="updateList($event)"></addclub-component>
<filterclub-component v-bind:provinceslist="provinces_to_filter" v-bind:citieslist="cities_to_filter" v-on:provinceSelected="filterCities($event,'filter')" v-on:clubFilter="filterList($event)" v-bind:current_cityid="current_cityid" v-bind:current_provinceid="current_provinceid" v-on:clearFilter="clearFilter" v-bind:is_filter="is_filtered"></filterclub-component>


</div>
<div class="col-md-9">
<div class="d-flex justify-content-end"><h6><em>Liczba klubów: {{count}}</em></h6></div>
    <div class="list-row-k row-names d-none d-sm-flex">
    	<div class="d-flex part-data">
      		<div class="p-2 cell cell-50">Nazwa klubu</div>
      		<div class="p-2 cell cell-50">Adres</div>
      	</div>
      	<div class="d-flex part-actions">
      		<div class="p-2">&nbsp;</div>
      	</div>
    </div>
   
    <club-component v-for="club in clubs" v-bind:key="club.id" v-bind:clubdata="club" v-bind:provinceslist="provinces" v-bind:citieslist="provincechanged ? citiesafterfilter : provinciescities[club.province_id]" v-on:confirmDeleted="showConfirm($event)" v-on:provinceSelectedEdit="filterCitiesEdit($event)"></club-component>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0"></div>
    
   </div>
   </div>
</div>
</div>
</template>

<script>
import Club from '../components/Clubcomponent.vue';
import Menu from '../components/Menucomponent.vue';
import AddClub from '../components/add/Addclubcomponent.vue';
import FilterClub from '../components/filter/Filterclubcomponent.vue';
import Confirm from '../components/Confirmcomponent.vue';
export default {
   data() {
    return {
      clubs: [],
      cities: [],
      cities_to_filter: [],
      provinces:[],
      provinces_to_filter:[],
      provinciescities:[],
      provincechanged: false,
      citiesafterfilter:[],
      errors: [],
      count: 0,
      busy: false,
      start: 0,
      end: 0,
      portion: 20,
      current_filter: false,
      current_cityid: '',
      current_provinceid: '',
      is_filtered:false,
      confirmation: false,
      del_id:0,
    }
  },
  components:{
      'club-component': Club,
      'menu-component': Menu,
      'addclub-component': AddClub,
      'filterclub-component': FilterClub,
      'confirm-component': Confirm,
  },
  created() {
  const token = localStorage.getItem('token');
  //get data from route
  this.is_filtered = typeof this.$route.params.cityid !== 'undefined' && typeof this.$route.params.provinceid !== 'undefined' ? true : false;
	this.current_cityid = typeof this.$route.params.cityid !== 'undefined' ? this.$route.params.cityid : '';
	this.current_provinceid = typeof this.$route.params.provinceid !== 'undefined' ? this.$route.params.provinceid : '';
  console.log('current_city_id' + this.$route.params.cityid);

  //get provinceswithcities
  this.provinceswithCities();

if(!this.current_cityid && !this.current_provinceid){
    //countall
    this.countallClubs();

    //get first portion
     this.firstPortion();

    //cities to left filter and adding modal form
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allcities' + '?token=' + token)
    .then(response => {
      this.cities = response.data.cities;
      this.cities_to_filter = response.data.cities;
      console.log(this.cities);
    })
    .catch(e => {
      this.errors.push(e)
    });

}
else{
  const routefilter = {filtercity:this.current_cityid}
	this.filterList(routefilter);
 const cityfilter =  {province_id: this.current_provinceid}
  this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercitybyprovince' + '?token=' + token, cityfilter)
    .then(response => {
        this.cities_to_filter = response.data.cities 
    })
    .catch(e => {
      console.log(e)
    });

    //cities to adding modal form
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allcities' + '?token=' + token)
    .then(response => {
      this.cities = response.data.cities;
      console.log(this.cities);
    })
    .catch(e => {
      this.errors.push(e)
    });
}



    //provinces to left filter and adding modal form
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/provinces' + '?token=' + token)
    .then(response => {
      this.provinces = response.data.provinces;
      this.provinces_to_filter = response.data.provinces;
    })
    .catch(e => {
      this.errors.push(e)
    });
   
  },
  methods:{
    provinceswithCities(){
    const token = localStorage.getItem('token');
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/listprovinciescities' + '?token=' + token)
    .then(response => {
      this.provinciescities = response.data.cities;
    })
    .catch(e => {
      console.log(e)
    });
    },

    countallClubs(){
    const token = localStorage.getItem('token');
      this.axios.get('http://backkontrah.nilow13.usermd.net/api/clubscountall' + '?token=' + token)
    .then(response => {
      this.count = response.data.count
    })
    .catch(e => {
      console.log(e)
    });
    },

    firstPortion(){
    const token = localStorage.getItem('token');
      this.axios.get('http://backkontrah.nilow13.usermd.net/api/clubs/'+ (this.start * this.portion) + '?token=' + token)
    .then(response => {
      this.clubs = response.data.clubs;
      console.log(this.clubs);
    })
    .catch(e => {
      this.errors.push(e)
    });
    },


    updateList(body){
    const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/club' + '?token=' + token, body)
        .then(response => {
          console.log(response);
          if(!this.current_cityid && !this.current_provinceid){
	          if(!this.current_filter){
		          this.axios.get('http://backkontrah.nilow13.usermd.net/api/clubs/'+ (this.start * this.portion) + '?token=' + token)
		            .then(response => {
		              this.clubs = response.data.clubs;
		              this.count++;
		              console.log(this.clubs);
		            })
		            .catch(e => {
		              console.log(e)
		            });
	            }
	            else{
	            	const routefilter={filtercity:this.current_filter}
					this.filterList(routefilter);
					this.count++;
	            }
            }
            else{
            if(body.city_id == this.current_cityid){
            	const routefilter={filtercity:this.current_cityid}
				this.filterList(routefilter);
				this.count++;
            }
            }
        })
        .catch(e => {
          console.log(e)
        });
    },

    filterList(filter){
      const token = localStorage.getItem('token');
      console.log('xxxxxxfilter' + filter.filtercity);
       this.current_filter = filter.filtercity;
       this.start = 0;
       //count all filtered
       this.axios.post('http://backkontrah.nilow13.usermd.net/api/clubsfiltercountall' + '?token=' + token, {city_id:filter.filtercity})
            .then(response => {
              this.count = response.data.count
            })
            .catch(e => {
              console.log(e)
            });

            //get first portion filtered
      this.axios.post('http://backkontrah.nilow13.usermd.net/api/clubs' + '?token=' + token, {city_id:filter.filtercity, offset: (this.start * this.portion)})
            .then(response => {
              this.clubs = response.data.clubs;
             
              console.log(this.clubs);
            })
            .catch(e => {
              console.log(e)
            });
    },

clearFilter(){
    const token = localStorage.getItem('token');
    this.start = 0;
    this.current_filter = false;
    this.is_filtered = false;

    //countall
    this.countallClubs();

    //get first portion
    this.firstPortion();

    if(this.current_cityid && this.current_provinceid){

    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allcities' + '?token=' + token)
    .then(response => {
      this.cities_to_filter = response.data.cities;
      console.log(this.cities);
    })
    .catch(e => {
      this.errors.push(e)
    });
    }
    },

    loadMore(){
    console.log('load');
    const token = localStorage.getItem('token');
    //if clubs filtered
          if(this.current_filter){
	          if(this.clubs.length < this.count){
		         busy: true;
		         this.start++;
	          	 this.axios.post('http://backkontrah.nilow13.usermd.net/api/clubs' + '?token=' + token, {city_id:this.current_filter, offset: (this.start * this.portion)})
	            .then(response => {
	             this.clubs = this.clubs.concat(response.data.clubs);
	              console.log(this.clubs);
	              busy: false;
	            })
	            .catch(e => {
	              console.log(e)
	            });
            }
          }
//list without filter
          else{
	          if(this.clubs.length < this.count){
		          busy: true;
		          this.start++;
		          this.axios.get('http://backkontrah.nilow13.usermd.net/api/clubs/'+ (this.start * this.portion) + '?token=' + token)
		        .then(response => {
		          this.clubs = this.clubs.concat(response.data.clubs);
		          console.log(this.clubs);
		          busy: false;
		        })
		        .catch(e => {
		          console.log(e)
		        });
        	}
        }
      
    },

    /*onClubDeleted(id){
      const position = this.clubs.findIndex((element) => {
              return element.id == id;
      });
      this.clubs.splice(position, 1);
      this.count--;
    },*/


    showConfirm(clubid){
    this.confirmation = true;
    this.del_id = clubid;
    console.log('vvvvv' + clubid)
  },

  cancelDel(){
  this.confirmation = false;
  },

  makeDel(clubid){
    const token = localStorage.getItem('token');
    this.confirmation = false;
    console.log('usuwanie!!!!' + clubid);
    this.axios.delete('http://backkontrah.nilow13.usermd.net/api/club/'+ clubid + '?token=' + token)
            .then(response => {
              const position = this.clubs.findIndex((element) => {
                         return element.id == clubid;
              });
              this.clubs.splice(position, 1);
              this.count--;
            })
            .catch(e => {
              console.log(e)
            });
  },

    filterCities(filter, mode){
    const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercitybyprovince' + '?token=' + token, filter)
    .then(response => {
    	if(mode == 'add'){
    		this.cities = response.data.cities
    	}
    	else{
    		this.cities_to_filter = response.data.cities
    	}
      
    })
    .catch(e => {
      console.log(e)
    });
    },

    filterCitiesEdit(filter){
      console.log(filter);
      this.citiesafterfilter = this.provinciescities[filter.province_id];
      this.provincechanged = true;

    }
  }

  
}


</script>

