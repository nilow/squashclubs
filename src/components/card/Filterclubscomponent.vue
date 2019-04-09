<template>
<form v-on:submit.prevent="onSubmit">
	<div class="form-group">
		<label for="email">Miasto:</label>
		<select class="form-control select-k" v-model="cityid">
			<option value="">-wybierz-</option>
			<option v-for="city of citieslist" v-bind:value="city.id">{{city.name}}</option>
		</select>
	</div>
	<div class="d-flex justify-content-between"><button type="submit" class="btn btn-primary btn-k btn-filterorclear" :disabled="$v.$invalid">Filtruj</button>
  <button type="button" class="btn btn-primary btn-k btn-filterorclear" :disabled="!is_filtered" v-on:click="clearFilter">Wyczyść filtr</button></div>
</form> 
</template>

<script>
import { required} from 'vuelidate/lib/validators';
export default {
	props: ['citieslist'],
	data() {
    return {
      cityid: '',
      is_filtered: false
    }
  },
	validations: {
    cityid: {
      required
    }
  },
  methods:{
  onSubmit(){
     this.is_filtered = true;
      const filters = {
      filtercity: this.cityid, 
      }
    this.$emit('cityFilter', filters);
     
    
  },
  clearFilter(){
     this.is_filtered = false;
     this.cityid= '';
    this.$emit('clearFilter');
  }
 }
}
</script>