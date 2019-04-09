<template>
<form v-on:submit.prevent="onSubmit">
	<div class="form-group">
		<label for="email">Klub:</label>
		<select class="form-control select-k" v-model="clubcontrid">
		    <option value="">-wybierz-</option>
		    <option v-for="club in clubslist" v-bind:value="club.ccid">{{club.name}}, {{club.city.name}}</option>
		</select>
	</div>
	<div class="d-flex justify-content-between"><button type="submit" class="btn btn-primary btn-k btn-filterorclear" :disabled="$v.$invalid">Filtruj</button>
  <button type="button" class="btn btn-primary btn-k btn-filterorclear" :disabled="!is_filtered" v-on:click="clearFilter">Wyczyść filtr</button></div>
</form> 
</template>

<script>
import { required} from 'vuelidate/lib/validators';
export default {
	props: ['clubslist'],
	data() {
    return {
      clubcontrid: '',
      is_filtered: false
    }
  },
	validations: {
    clubcontrid: {
      required
    }
  },
  methods:{
  onSubmit(){
     this.is_filtered = true;
      const filters = {
      filterclub: this.clubcontrid, 
      }
    this.$emit('clubFilter', filters);
     
    
  },
  clearFilter(){
     this.is_filtered = false;
     this.clubcontrid= '';
    this.$emit('clearFilter');
  }
 }
}
</script>