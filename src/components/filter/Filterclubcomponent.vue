<template>
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
props: ['provinceslist','citieslist','current_cityid','current_provinceid','is_filter'],

  data() {
    return {
      provinces: [],
      cities: [],
      errors: [],
      provinceid: this.current_provinceid,
      cityid: this.current_cityid,
      is_filtered: this.is_filter
    }
  },
  validations: {
    cityid: {
      required
    }
  },
  created(){
    console.log('current' + this.current_cityid + ',' + this.current_provinceid)
  },

  methods:{
  onSubmit(){
      this.is_filtered = true;
      const filters = {
      filterprovince: this.provinceid, 
      filtercity: this.cityid
      }
        this.$emit('clubFilter', filters);

  },
   clearFilter(){
     this.is_filtered = false;
     this.provinceid= '';
     this.cityid= '';
    this.$emit('clearFilter');
  },

  onSelectProvince(){
  console.log(this.provinceid);
  this.cityid = '';
  const body = {
    province_id: this.provinceid
  }
  this.$emit('provinceSelected', body);

  }
 }
 
  

}
</script>