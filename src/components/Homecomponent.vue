<template>
<div>
<!--<div class="bg bg-sub"></div>-->
<div class="container-fluid container-k">
<menu-component></menu-component>
<div class="row">
<div class="col-md-3 filter-column">
    <filtercontractor-component v-bind:provinceslist="provinces_to_filter" v-bind:citieslist="cities_to_filter" v-bind:clubslist="clubs_to_filter" v-on:provinceSelected="filterCities($event);filterClubs($event)" v-on:citySelected="filterClubs($event)" v-on:contractorFilter="onFilter($event)" v-on:clearFilter="onClearFilter" v-bind:current_cityid="current_cityid" v-bind:current_provinceid="current_provinceid" v-bind:current_clubid="current_clubid" v-bind:is_filter="is_filtered"></filtercontractor-component>
</div>
<div class="col-md-9">

<!--tabs-->
<b-tabs>
  <b-tab class="tab-front-k" title="Kontrahenci, którym umowy kończą się w ciągu 30 dni" active>
<div class="row">
<div class="col-12">
  <div class="d-flex justify-content-end"><h6><em>Kontrahentów: {{count1}}</em></h6></div>
    <div class="list-row-k row-names d-none d-sm-flex">
      <div class="d-flex part-data">
          <div class="p-2 cell cell-25">Nazwisko i imię</div>
          <div class="p-2 cell cell-25">Tytuł umowy</div>
          <div class="p-2 cell cell-25">Data wygaśnięcia</div>
          <div class="p-2 cell cell-25">Klub, miasto</div>
        </div>
        <div class="part-actions">
          <div class="p-2">&nbsp;</div>
        </div>
    </div>
   <contractorhome-component v-for="contract in contracts1" v-bind:key="contract.id" v-bind:contractdata="contract"></contractorhome-component>
    </div>
    </div>
  </b-tab>
  <b-tab class="tab-front-k" title="Kontrahenci, którym umowy wygasły do 90 dni">
  <div class="row">
  <div class="col-12">
    <div class="d-flex justify-content-end"><h6><em>Kontrahentów: {{count2}}</em></h6></div>
    <div class=" list-row-k row-names d-none d-sm-flex">
      <div class="d-flex part-data">
          <div class="p-2 cell cell-25">Nazwisko i imię</div>
          <div class="p-2 cell cell-25">Tytuł umowy</div>
          <div class="p-2 cell cell-25">Data wygaśnięcia</div>
          <div class="p-2 cell cell-25">Klub, miasto</div>
        </div>
        <div class="part-actions">
          <div class="p-2">&nbsp;</div>
        </div>
    </div>

    <contractorhome-component v-for="contract in contracts2" v-bind:key="contract.id" v-bind:contractdata="contract"></contractorhome-component>
    </div>
    </div>
  </b-tab>
</b-tabs>

</div>
</div>


</div>
</div>
</template>

<script>
import ContractorHome from '../components/Contractorhomecomponent.vue';
import Menu from '../components/Menucomponent.vue';
import FilterContractor from '../components/filter/Filtercontractorcomponent.vue';
export default {
  data(){
    return{
        count1: 0,
        count2:0,
        contracts1:[],
        contracts2:[],
        cities_to_filter:[],
        provinces_to_filter:[],
        clubs_to_filter:[],
        current_cityid:'',
        current_provinceid:'',
        current_clubid:'',
        is_filtered: false,
    }
  },
  components:{
      'contractorhome-component': ContractorHome,
      'menu-component': Menu,
      'filtercontractor-component': FilterContractor,
  },
  created(){
  const token = localStorage.getItem('token');
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/homecontracts' + '?token=' + token)
    .then(response => {
      this.contracts1 = response.data.contracts;
      this.count1 = this.contracts1.length;
    })
    .catch(e => {
      console.log(e)
    });
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/homecontracts2' + '?token=' + token)
    .then(response => {
      this.contracts2 = response.data.contracts;
      this.count2 = this.contracts2.length;
    })
    .catch(e => {
      console.log(e)
    });

    //cities to left filter
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allcities' + '?token=' + token)
    .then(response => {
      this.cities_to_filter = response.data.cities;
      console.log(this.cities);
    })
    .catch(e => {
      this.errors.push(e)
    });

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

    onFilter(filter){
    const token = localStorage.getItem('token');
      console.log(filter);
     this.axios.post('http://backkontrah.nilow13.usermd.net/api/homecontractsfilter' + '?token=' + token, filter)
    .then(response => {
        this.contracts1 = response.data.contracts;
        this.count1 = this.contracts1.length;
    })
    .catch(e => {
      console.log(e)
    });

    this.axios.post('http://backkontrah.nilow13.usermd.net/api/homecontracts2filter' + '?token=' + token, filter)
    .then(response => {
        this.contracts2 = response.data.contracts;
        this.count2 = this.contracts2.length;
    })
    .catch(e => {
      console.log(e)
    });
    },

    onClearFilter(){
    const token = localStorage.getItem('token');
     this.axios.get('http://backkontrah.nilow13.usermd.net/api/homecontracts' + '?token=' + token)
    .then(response => {
      this.contracts1 = response.data.contracts;
      this.count1 = this.contracts1.length;
    })
    .catch(e => {
      console.log(e)
    });
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/homecontracts2' + '?token=' + token)
    .then(response => {
      this.contracts2 = response.data.contracts;
      this.count2 = this.contracts2.length;
    })
    .catch(e => {
      console.log(e)
    });
    }
  }
}


</script>


