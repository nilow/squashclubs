<template>
<div>
<b-btn v-b-modal.modal2 class="btn btn-primary btn-k-new"><font-awesome-icon icon="plus-circle" /> Powiąż z nowym klubem</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal2" hide-footer title="Powiąż z nowym klubem" class="addmodal-k">
	  <form v-on:submit.prevent="onSubmit">
		  <div class="form-group">
		    <label for="email">Województwo:</label>
		    <select class="form-control select-k" v-model="provinceid" v-on:change="onSelectProvince">
		    <option value="">-wybierz-</option>
		    <option v-for="province of provinceslist" v-bind:value="province.id">{{province.name}}</option>
		    </select>
		  </div>
		  <div class="form-group">
		    <label for="email">Miasto:</label>
		    <select class="form-control select-k" v-model="cityid" v-on:change="onSelectCity">
		    <option value="">-wybierz-</option>
		   <option v-for="city of citieslist" v-bind:value="city.id">{{city.name}}</option>
		    </select>
		  </div>
		  <div class="form-group">
		    <label for="email">Klub:</label>
		    <select class="form-control select-k" v-model="clubid">
		    <option value="">-wybierz-</option>
		   <option v-for="club of clubslist" v-bind:value="club.id">{{club.name}}</option>
		    </select>
		  </div>
		  <button type="submit" class="btn btn-primary btn-k" :disabled="$v.$invalid">Przypisz klub</button>
	  </form> 
  </b-modal>
  </div>
</template>
<script>
import { required} from 'vuelidate/lib/validators';

export default {
props: ['provinceslist','citieslist','clubslist'],
  data() {
    return {
      provinces: [],
      cities: [],
      errors: [],
      clubname: '',
      clubaddress: '',
      provinceid: '',
      cityid:'',
      clubid: ''
    }
  },
  validations: {
    provinceid: {
      required
    },
    cityid: {
      required
    },
     clubid: {
      required
    }
  },
  methods:{
  	onSubmit(){
 		const body = {
	 		club_id: this.clubid,
	 		city_id: this.cityid
 		}
 	
		this.$emit('clubConnected', body);
		this.provinceid = '';
		this.cityid = '';
		this.clubid = '';
 	},
 	
 	onSelectProvince(){
 	console.log(this.provinceid);
 	const body = {
	 	province_id: this.provinceid
 	}
 	this.cityid='';
 	this.$emit('provinceSelected', body);

 	},

 	onSelectCity(){
 	console.log(this.cityid);
 	const body = {
	 	city_id: this.cityid
 	}
 	this.clubid='';
 	this.$emit('citySelected', body);

 	}
  }
 
  
}
</script>
