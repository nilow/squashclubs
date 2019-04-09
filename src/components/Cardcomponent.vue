<template>
	<div>
	<confirm-component v-if="confirmation" v-on:noDeleted="cancelDel" v-on:okDeleted="makeDel($event)" v-bind:itemid="del_id"></confirm-component>

		<div class="container-fluid container-k">
			<menu-component></menu-component>
			<p>Karta kontrahenta <strong>{{contractor.name}} {{contractor.surname}}</strong></p>
			<!--tabs-->
			<b-tabs>
		  		<b-tab class="tab-front-k" title="Dane osobowe" active>
					<div class="row">
                    	<div class="col-md-3"><div class="icon-box"><font-awesome-icon icon="user" /></div></div>
                    	<div class="col-md-9">
                    		<div class="row">
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Imię</span>{{contractor.name}}</div></div>
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Nazwisko</span>{{contractor.surname}}</div></div>
                    			<div class="col-md-4 col-6"><div class="data-box"><span>PESEL</span>{{contractor.idcard_number}}</div></div>
                    		
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Kod pocztowy</span>{{contractor.postal_code}}</div></div>
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Miasto</span>{{contractor.city}}</div></div>
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Ulica</span>{{contractor.street}}</div></div>
                    		
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Adres email</span>{{contractor.email}}</div></div>
                    			<div class="col-md-4 colm-6"><div class="data-box"><span>Telefon</span>{{contractor.phone}}</div></div>
                    			<div class="col-md-4 col-6"><div class="data-box"><span>Typ</span>{{contractor.type}}</div></div>
                    		</div>
                    	</div>
                    </div>
		  		</b-tab>
		  		<b-tab class="tab-front-k" title="Umowy">
		  			<div class="row">
                    	<div class="col-md-3 filter-column">
                    		<addcontract-component v-bind:clubslist="contractorclubs" v-on:contractAdded="contractAdd($event)"></addcontract-component>


                    		<filtercontracts-component v-bind:clubslist="clubs_to_filter" v-on:clubFilter="filterContracts($event)" v-on:clearFilter="clearClubFilter"></filtercontracts-component>

                    	</div>
                    	<div class="col-md-9">
                    		
    <div class=" list-row-k row-names d-none d-sm-flex">
    	<div class="d-flex part-data">
      		
      		<div class="p-2 cell cell-25">Tytuł umowy</div>
      		<div class="p-2 cell cell-25">Data rozpoczęcia</div>
      		<div class="p-2 cell cell-25">Data wygaśnięcia</div>
      		<div class="p-2 cell cell-25">Klub, miasto</div>
      	</div>
      	<div class="part-actions">
      		<div class="p-2">&nbsp;</div>
      	</div>
    </div>

    <contract-component v-for="contract in contracts" v-bind:key="contract.id" v-bind:contractdata="contract" v-bind:clubslist="clubs" v-on:confirmDeletedContract="showConfirm($event)"></contract-component>
    
                    	</div>
                    </div>
		  		</b-tab>
		  		<b-tab class="tab-front-k" title="Przypisane kluby">
		  			<div class="row">
                    	<div class="col-md-3 filter-column">
                    		<addclub-component v-bind:provinceslist="provinces" v-bind:citieslist="cities" v-bind:clubslist="clubs_to_modal" v-on:provinceSelected="filterCities($event)" v-on:citySelected="filterClubs($event)" v-on:clubConnected="connectClub($event)"></addclub-component>

                    		<filterclubs-component v-bind:citieslist="cities_to_filter" v-on:cityFilter="filterContractorsClubs($event)" v-on:clearFilter="clearCityFilter"></filterclubs-component>

                    			
                    	</div>

                    	<div class="col-md-9">
                    		
					    <div class="list-row-k row-names d-none d-sm-flex">
					    	<div class="d-flex part-data">
					      		<div class="p-2 cell cell-50">Nazwa klubu</div>
					      		<div class="p-2 cell cell-50">Adres</div>
					      	</div>
					      	<div class="d-flex part-actions">
					      		<div class="p-2">&nbsp;</div>
					      	</div>
					    </div>

					    <club-component v-for="club in clubs" v-bind:key="club.id" v-bind:clubdata="club" v-on:confirmDeletedContractorClub="showConfirm($event)"></club-component>

                    	</div>
                    </div>
		  		</b-tab>
			</b-tabs>
		</div>
	</div>
</template>
<script>
import Menu from '../components/Menucomponent.vue';
import AddClub from '../components/card/Addclubcomponent.vue';
import AddContract from '../components/card/Addcontractcomponent.vue';
import Contract from '../components/card/Contractcomponent.vue';
import Club from '../components/card/Clubcomponent.vue';
import Filtercontracts from '../components/card/Filtercontractscomponent.vue';
import Filterclubs from '../components/card/Filterclubscomponent.vue';
import Confirm from '../components/Confirmcomponent.vue';

export default {
	data(){
		return{
			contactorid: '',
			contractor: [],
			clubs: [],
			contracts: [],
			cities: [],
			clubs_to_modal: [],
			clubs_to_filter:[],
			cities_to_filter:[],
			cityid:'',
			provinces:[],
			contractor_club: [],
			current_filter_club: '',
			current_filter_city: '',
			contractorclubs:[],
			confirmation: false,
      		del_id:'',
		}
	},

	created(){
		const token = localStorage.getItem('token');
		//get contractorid from route
		this.contactorid = parseInt(this.$route.params.contractorid);

		//get contactor data
	  	this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractor/' + this.contactorid + '?token=' + token) 
	    .then(response => {
	      this.contractor = response.data.contractor;
	    })
	    .catch(e => {
	      console.log(e)
	    });

	    //get contactor clubs

	  	this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractorclubs/' + this.contactorid + '?token=' + token)
	    .then(response => {
	      this.clubs = response.data.clubs;
	      this.clubs_to_filter = response.data.clubs;
	      this.contractorclubs = response.data.clubs;
	    })
	    .catch(e => {
	      console.log(e)
	    });

	    //get contactor clubscities
	  	this.axios.get('http://backkontrah.nilow13.usermd.net/api/getclubscities/' + this.contactorid + '?token=' + token)
	    .then(response => {
	      this.cities_to_filter = response.data.cities;

	    })
	    .catch(e => {
	      console.log(e)
	    });

	    //get contactor contracts
	  	this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractorcontracts/' + this.contactorid + '?token=' + token)
	    .then(response => {
	      this.contracts = response.data.contracts;
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

    //provinces to adding modal form
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/provinces' + '?token=' + token)
    .then(response => {
      this.provinces = response.data.provinces;
    })
    .catch(e => {
      this.errors.push(e)
    });

      //clubs to adding modal form
    this.axios.get('http://backkontrah.nilow13.usermd.net/api/allclubs' + '?token=' + token)
    .then(response => {
      this.clubs_to_modal = response.data.clubs;
    })
    .catch(e => {
      this.errors.push(e)
    });
	},

	methods:{

	updateClubsCitiesList(){
		const token = localStorage.getItem('token');
		//get contactor clubscities
	  	this.axios.get('http://backkontrah.nilow13.usermd.net/api/getclubscities/' + this.contactorid + '?token=' + token)
	    .then(response => {
	      this.cities_to_filter = response.data.cities;

	    })
	    .catch(e => {
	      console.log(e)
	    });
	},

	updateClubsList(){
		const token = localStorage.getItem('token');
		//console.log('xxxxxupdatelist');
		//get contactor clubs
	  	this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractorclubs/' + this.contactorid + '?token=' + token)
	    .then(response => {
	      this.clubs = response.data.clubs;
	      this.clubs_to_filter = response.data.clubs;
	      this.contractorclubs = response.data.clubs;
	    })
	    .catch(e => {
	      console.log(e)
	    });

	},

	updateContractsList(){
		const token = localStorage.getItem('token');
		this.axios.get('http://backkontrah.nilow13.usermd.net/api/contractorcontracts/' + this.contactorid + '?token=' + token)
	    .then(response => {
	      this.contracts = response.data.contracts;
	    })
	    .catch(e => {
	      console.log(e)
	    });

	},

	filterCities(filter){
	const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercitybyprovince' + '?token=' + token, filter)
    .then(response => {
    	
    		this.cities = response.data.cities
      
    })
    .catch(e => {
      console.log(e)
    });
    },

    filterClubs(filter){
    const token = localStorage.getItem('token');
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filterclubbycity' + '?token=' + token, filter)
    .then(response => {
    	
    		this.clubs_to_modal = response.data.clubs
      
    })
    .catch(e => {
      console.log(e)
    });
    },

    filterContractorsClubs(filter){
    const token = localStorage.getItem('token');
    this.current_filter_city = filter.filtercity;
    const filterdata = {
		 	city_id: filter.filtercity,
		 	contractor_id: this.contactorid,
		 	
	 	};

	 console.log(filterdata);

    this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercontractorclubs' + '?token=' + token, filterdata)
    .then(response => {
    	
    		this.clubs = response.data.clubs
      
    })
    .catch(e => {
      console.log(e)
    });
    },


    filterContracts(filter){
    const token = localStorage.getItem('token');
    console.log(filter);
  	this.current_filter_club = filter.filterclub;
   this.axios.post('http://backkontrah.nilow13.usermd.net/api/filtercontractorcontracts' + '?token=' + token, filter)
    .then(response => {
    	
    		this.contracts = response.data.contracts
      
    })
    .catch(e => {
      console.log(e)
    });
    },

    connectClub(body){
    	const token = localStorage.getItem('token');
	    const bodyconnect = {
		 	club_id: body.club_id,
		 	contractor_id: this.contactorid,
		 	city_id: body.city_id,
	 	}
	 	this.axios.post('http://backkontrah.nilow13.usermd.net/api/connectclubtocontractor' + '?token=' + token, bodyconnect)
	    .then(response => {
	    	this.contractor_club = response.data.contractor_club;
	    	this.updateClubsCitiesList()
	    	if(this.current_filter_city==body.city_id){
	    		 this.filterContractorsClubs({filtercity: this.current_filter_city})
	    	}
	    	else{
	    	if(this.current_filter_city=='')
	    	this.updateClubsList();
	    	}
	    })
	    .catch(e => {
	      console.log(e)
	    });

    },

    clearClubFilter(){
      this.updateContractsList();
      this.current_filter_club='';

    },
     clearCityFilter(){
      this.updateClubsList();
      this.current_filter_city='';

    },
    contractAdd(body){
    	const token = localStorage.getItem('token');
    	const bodyadd = {
		 	//club_id: body.club_id,
		 	//contractor_id: this.contactorid,
		 	contractorsclubs_id: body.clubcontr_id,
		 	name: body.name,
	    	conditions: body.conditions,
	    	file: body.file,
	    	from: body.from.toJSON(),
	    	to: body.to.toJSON(),
	 	};
	 	this.axios.post('http://backkontrah.nilow13.usermd.net/api/addcontract' + '?token=' + token, bodyadd)
	    .then(response => {
	    	this.contract = response.data.contract;
	    	if(this.current_filter_club == body.clubcontr_id){
		    	const f = {
		    		filterclub: this.current_filter_club
		    	};
		    	 this.filterContracts(f);
	    	}
	    	else{
	    		if(this.current_filter_club=='')
	    		this.updateContractsList();
	    	}
	    })
	    .catch(e => {
	      console.log(e)
	    });

    },
    /*onContractorclubDeleted(id){

    	const position = this.clubs.findIndex((element) => {
              return element.ccid == id;
      });

      this.clubs.splice(position, 1);
      //dziwne, bo splice na this.clubs usuwa też element z this.contractorclubs i this.clubs_to_filter

    
    }*/

    showConfirm(itemid){
    this.confirmation = true;
    this.del_id = itemid;
    //console.log('vvvvv' + itemid)
  },

  cancelDel(){
  this.confirmation = false;
  },

  makeDel(strid){
    const token = localStorage.getItem('token');
    
    const delstr = strid.split('_')[0];
    const delid = strid.split('_')[1];
    this.confirmation = false;

    if(delstr == 'contract'){
    console.log('usuwaniecontract '+delid)
     /*this.axios.delete('http://backkontrah.nilow13.usermd.net/api/contract/'+ delid + '?token=' + token)
            .then(response => {
              const position = this.contracts.findIndex((element) => {
                         return element.id == delid;
              });
              this.contracts.splice(position, 1);
              //this.count--;
            })
            .catch(e => {
              console.log(e)
            });*/

    }
    else{
    console.log('usuwaniecontractorclub '+delid)
    /*this.axios.delete('http://backkontrah.nilow13.usermd.net/api/contractorsclubs/' + delid + '?token=' + token)
            .then(response => {
               const position = this.clubs.findIndex((element) => {
                    return element.id == delid;
              });
              this.clubs.splice(position, 1);
              //this.count--;
            })
            .catch(e => {
              console.log(e)
            });*/

    }
   
  },
},

	components:{
	  	'menu-component': Menu,
	  	'addclub-component': AddClub,
	  	'addcontract-component': AddContract,
	  	'contract-component': Contract,
	  	'club-component': Club,
	  	'filtercontracts-component': Filtercontracts,
	  	'filterclubs-component': Filterclubs,
	  	'confirm-component': Confirm,

	},
}

</script>