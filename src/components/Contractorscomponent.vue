<template>
<div>
<confirm-component v-if="confirmation" v-on:noDeleted="cancelDel" v-on:okDeleted="makeDel($event)" v-bind:itemid="del_id"></confirm-component>

<!--<div class="bg bg-sub"></div>-->
<div class="container-fluid container-k">
<menu-component></menu-component>
<div class="row">
<div class="col-md-3 filter-column">
<addcontractor-component v-bind:types="types" v-on:conAdded="updateList($event)"></addcontractor-component>
<filtercontractor-component v-bind:provinceslist="provinces_to_filter" v-bind:citieslist="cities_to_filter" v-bind:clubslist="clubs_to_filter" v-on:provinceSelected="filterCities($event);filterClubs($event)" v-on:citySelected="filterClubs($event)" v-on:contractorFilter="filterList($event)" v-on:clearFilter="onClearFilter" v-bind:current_cityid="current_cityid" v-bind:current_provinceid="current_provinceid" v-bind:current_clubid="current_clubid" v-bind:is_filter="is_filtered"></filtercontractor-component>


</div>
<div class="col-md-9">
<div class="d-flex justify-content-end"><h6><em>Liczba kontrahentów: {{count}}</em></h6></div>
    <div class="list-row-k row-names d-none d-sm-flex">
    	<div class="d-flex part-data">
      		<div class="p-2 cell cell-20">Nazwisko i imię</div>
      		<div class="p-2 cell cell-20">Typ kontrahenta</div>
      		<div class="p-2 cell cell-20">Adres</div>
      		<div class="p-2 cell cell-20">Telefon</div>
      		<div class="p-2 cell cell-20">Email</div>
      	</div>
      	<div class="d-flex part-actions">
      		<div class="p-2">&nbsp;</div>
      	</div>
    </div>
    

    <contractor-component v-for="contractor in contractors" v-bind:key="contractor.id" v-bind:contractordata="contractor" v-bind:types="types" v-on:confirmDeleted="showConfirm($event)"></contractor-component>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0"></div>

   </div>
   </div>
</div>
</div>
</template>

<script>
import Contractor from '../components/Contractorcomponent.vue';
import Menu from '../components/Menucomponent.vue';
import AddContractor from '../components/add/Addcontractorcomponent.vue';
import FilterContractor from '../components/filter/Filtercontractorcomponent.vue';
import Confirm from '../components/Confirmcomponent.vue';

export default {

  data() {
    return {
      types:[
        {id:1, name:'Trener'},
        {id:2, name:'Zawodnik'},
        {id:3, name:'Partner'},
      ],
      start: 0,
      portion: 20,
      count: 0,
      contractors:[],
      provinces:[],
      cities_to_filter:[],
      provinces_to_filter:[],
      clubs_to_filter:[],
      current_cityid: '',
      current_provinceid: '',
      current_clubid: '',
      is_filtered:false,
      confirmation: false,
      del_id:0,
    }
  },
  components:{
      'contractor-component': Contractor,
      'menu-component': Menu,
      'addcontractor-component': AddContractor,
      'filtercontractor-component': FilterContractor,
      'confirm-component': Confirm,
  },
  created() {
    const token = localStorage.getItem('token');
    this.is_filtered = typeof this.$route.params.clubid !== 'undefined' ? true : false;
    this.current_cityid = typeof this.$route.params.cityid !== 'undefined' ? this.$route.params.cityid : '';
    this.current_clubid = typeof this.$route.params.clubid !== 'undefined' ? this.$route.params.clubid : '';
    this.current_provinceid = typeof this.$route.params.provinceid !== 'undefined' ? this.$route.params.provinceid : '';

    console.log('current_city_id' + this.$route.params.cityid);
    if(!this.current_cityid && !this.current_provinceid && !this.current_clubid){
      this.countAll();
      this.getFirstPortion();
      //cities to left filter
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allcities' + '?token=' + token)
    .then(response => {
      this.cities_to_filter = response.data.cities;
      console.log(this.cities);
    })
    .catch(e => {
      this.errors.push(e)
    });
    }
    else{
      const routefilter={filterclub:this.current_clubid}
      this.filterList(routefilter);
      const cityfilter =  {province_id: this.current_provinceid}
      //cities to left filter
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercitybyprovince' + '?token=' + token, cityfilter)
    .then(response => {
        this.cities_to_filter = response.data.cities 
    })
    .catch(e => {
      console.log(e)
    });

    const clubfilter =  {city_id: this.current_cityid}
      //cities to left filter
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filterclubbycity' + '?token=' + token, clubfilter)
    .then(response => {
        this.clubs_to_filter = response.data.clubs 
    })
    .catch(e => {
      console.log(e)
    });
    }
   

    //provinces to left filter
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/provinces' + '?token=' + token)
    .then(response => {
      this.provinces_to_filter = response.data.provinces;
    })
    .catch(e => {
      this.errors.push(e)
    });

    //clubs to left filter
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allclubs' + '?token=' + token)
    .then(response => {
      this.clubs_to_filter = response.data.clubs;
    })
    .catch(e => {
      this.errors.push(e)
    });
  },

  methods:{
  countAll(){
    const token = localStorage.getItem('token');
    //countall
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractorscountall' + '?token=' + token)
    .then(response => {
      this.count = response.data.count
    })
    .catch(e => {
      console.log(e)
    });
  },
  getFirstPortion(){
    const token = localStorage.getItem('token');
    this.start=0;
    //get first portion
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractors/'+ (this.start * this.portion) + '?token=' + token)
    .then(response => {
      this.contractors = response.data.contractors;
      console.log(this.contractors);
    })
    .catch(e => {
      console.log(e)
    });
  },
    updateList(body){
    const token = localStorage.getItem('token');
    this.start=0;
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/contractor' + '?token=' + token, body)
        .then(response => {
          console.log(response);
          this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractors/'+ (this.start * this.portion) + '?token=' + token)
            .then(response => {
              this.contractors =  response.data.contractors;
              this.count++;
              console.log(this.contractors);
            })
            .catch(e => {
              console.log(e)
            });
        })
        .catch(e => {
          console.log(e)
        });
    },
   /* onContractorDeleted(id){
      const position = this.contractors.findIndex((element) => {
              return element.id == id;
      });
      this.contractors.splice(position, 1);
      this.count = this.contractors.length;
    },*/

    showConfirm(contractorid){
    this.confirmation = true;
    this.del_id = contractorid;
    //console.log('vvvvv' + contractorid)
  },

  cancelDel(){
  this.confirmation = false;
  },

  makeDel(contractorid){
    const token = localStorage.getItem('token');
    this.confirmation = false;
    //console.log('usuwanie!!!!' + contractorid);
    this.axios.delete('http://backkontrah.nilow13.usermd.net/api/contractor/'+ contractorid + '?token=' + token)
            .then(response => {
              const position = this.contractors.findIndex((element) => {
                         return element.id == contractorid;
              });
              this.contractors.splice(position, 1);
              this.count--;
            })
            .catch(e => {
              console.log(e)
            });
  },

    filterCities(filter){
    const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercitybyprovince' + '?token=' + token, filter)
    .then(response => {
        this.cities_to_filter = response.data.cities
    })
    .catch(e => {
      console.log(e)
    });
    },

    filterClubs(filter){
    const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/selectclubs' + '?token=' + token, filter)
    .then(response => {
        this.clubs_to_filter = response.data.clubs
    })
    .catch(e => {
      console.log(e)
    });
    },

    filterList(filter){
      console.log(filter);
      this.start = 0;
      const token = localStorage.getItem('token');
     /* this.axios.post('http://backkontrah.nilow13.usermd.net/api/contractorsfilter', filter)
    .then(response => {
        this.contractors = response.data.contractors;
        this.count = this.contractors.length;
        //console.log(this.contractors);
    })
    .catch(e => {
      console.log(e)
    });*/

    //count all filtered
       this.axios.post('http://backkontrah.nilow13.usermd.net/api/contractorsfiltercountall' + '?token=' + token, {filterclub:filter.filterclub})
            .then(response => {
              this.count = response.data.count
            })
            .catch(e => {
              console.log(e)
            });

            //get first portion filtered
      this.axios.post('http://backkontrah.nilow13.usermd.net/api/contractorsfilter' + '?token=' + token, {filterclub:filter.filterclub, offset: (this.start * this.portion)})
            .then(response => {
              this.contractors = response.data.contractors;
             
              console.log(this.clubs);
            })
            .catch(e => {
              console.log(e)
            });
    },

    onClearFilter(){
      this.is_filtered = false;
      this.countAll();
      this.getFirstPortion();
    },

    loadMore(){
      console.log('loadmore');
      const token = localStorage.getItem('token');
      if(this.contractors.length < this.count){
          busy: true;
          this.start++;
          this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractors/'+ (this.start * this.portion) + '?token=' + token)
        .then(response => {
          this.contractors = this.contractors.concat(response.data.contractors);
          console.log(this.contractors);
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


