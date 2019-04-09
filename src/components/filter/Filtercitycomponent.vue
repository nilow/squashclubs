<template>
<form v-on:submit.prevent="onSubmit">
  <div class="form-group">
    <label for="email">Województwo:</label>
    <select class="form-control select-k" v-model="provinceid">
    <option value=''>-wybierz-</option>
    <option v-for="province of provinceslist" v-bind:value="province.id">{{province.name}}</option>
    
    </select>
  </div>
  <div class="d-flex justify-content-between"><button type="submit" class="btn btn-primary btn-k btn-filterorclear" :disabled="$v.$invalid">Filtruj</button>
  <button type="button" class="btn btn-primary btn-k btn-filterorclear" :disabled="!is_filtered" v-on:click="clearFilter">Wyczyść filtr</button></div>

</form> 
</template>

<script>
import { required} from 'vuelidate/lib/validators';
export default {
props: ['provinceslist'],
  data() {
    return {
      provinces: [],
      errors: [],
      provinceid: '',
      is_filtered: false
    }
  },
  validations: {
    provinceid: {
      required
    }
  },

  methods:{
  onSubmit(){
     this.is_filtered = true;
      const filters = {
      filterprovince: this.provinceid, 
      }
        this.$emit('cityFilter', filters);
     
    
  },
  clearFilter(){
     this.is_filtered = false;
     this.provinceid= '';
    this.$emit('clearFilter');
  }
 }
 
}
</script>