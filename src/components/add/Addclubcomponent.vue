<template>
<div>
<b-btn v-b-modal.modal1 class="btn btn-primary btn-k-new"><font-awesome-icon icon="plus-circle" /> Dodaj nowy klub</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal1" hide-footer title="Dodaj nowy klub" class="addmodal-k">
	  <form v-on:submit.prevent="onSubmit">
	  	<div class="form-group">
		    <label for="email">Nazwa:</label>
		    <input type ="text" class="form-control input-k" v-model="clubname">
		</div>
		<div class="form-group">
		    <label for="email">Adres:</label>
		    <input type ="text" class="form-control input-k" v-model="clubaddress">
		</div>
		  <div class="form-group">
		    <label for="email">Województwo:</label>
		    <select class="form-control select-k" v-model="provinceid" v-on:change="onSelectProvince">
		    <option value="">-wybierz-</option>
		    <option v-for="province of provinceslist" v-bind:value="province.id">{{province.name}}</option>
		    </select>
		  </div>
		  <div class="form-group">
		    <label for="email">Miasto:</label>
		    <select class="form-control select-k" v-model="cityid">
		    <option value="">-wybierz-</option>
		   <option v-for="city of citieslist" v-bind:value="city.id">{{city.name}}</option>
		    </select>
		  </div>
		  <button type="submit" class="btn btn-primary btn-k" :disabled="$v.$invalid">Dodaj klub</button>
	  </form> 
  </b-modal>
  </div>
</template>
<script>
import { required} from 'vuelidate/lib/validators';

export default {
props: ['provinceslist','citieslist'],
  data() {
    return {
      provinces: [],
      cities: [],
      errors: [],
      clubname: '',
      clubaddress: '',
      provinceid: '',
      cityid:'',
    }
  },
  validations: {
    clubname: {
      required,
    },
    clubaddress: {
      required,
    },
    provinceid: {
      required
    },
    cityid: {
      required
    }
  },
  methods:{
  	onSubmit(){
 		const body = {
	 		name: this.clubname,
	 		address: this.clubaddress,
	 		city_id: this.cityid,
 		}
 	
		this.$emit('clubAdded', body);
		this.clubname = '';
		this.cityid = '';
		this.provinceid = '';
		this.clubaddress = ''
		    

 	},
 	onSelectProvince(){
 	console.log(this.provinceid);
 	const body = {
	 	province_id: this.provinceid
 	}
 	this.$emit('provinceSelected', body);

 	}
  }
 
  
}
</script>