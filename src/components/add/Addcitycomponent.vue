<template>
<div>
<b-btn v-b-modal.modal1 class="btn btn-primary btn-k-new"><font-awesome-icon icon="plus-circle" /> Dodaj nowe miasto</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal1" hide-footer title="Dodaj nowe miasto" class="addmodal-k">
	  <form v-on:submit.prevent="onSubmit">
	  	<div class="form-group">
		    <label for="email">Nazwa:</label>
		    <input type ="text" class="form-control input-k" v-model="cityname">
		     <!--<span>{{$v.cityname}}</span>-->
		</div>
		  <div class="form-group">
		    <label for="email">Województwo:</label>
		    <select class="form-control select-k" v-model="provinceid">
		    <option value="">-wybierz-</option>
		    <option v-for="province in provinceslist" :value="province.id">{{province.name}}</option>
		    </select>
		    <!--<span>{{$v.provinceid}}</span>-->
		  </div>
		  <button type="submit" class="btn btn-primary btn-k" :disabled="$v.$invalid">Dodaj miasto</button>
	  </form> 
  </b-modal>
  </div>
</template>

<script>
import { required} from 'vuelidate/lib/validators';

export default {
props: ['provinceslist'],
  data() {
    return {
      provinces: [],
      cityname: '',
      provinceid: '',

    }
  },
   
  validations: {
    cityname: {
      required,
    },
    provinceid: {
      required
    }
  },
 methods:{
 	onSubmit(){
 		const body = {
	 		name: this.cityname, 
	 		province_id: this.provinceid 
 		}
 	
		    this.$emit('cityAdded', body);
		    this.cityname = '';
		    this.provinceid = ''
		    

 	}
 }
 

}
</script>
