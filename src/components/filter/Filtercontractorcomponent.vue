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
  <div class="d-flex justify-content-between"><button type="submit" class="btn btn-primary btn-k btn-filterorclear" :disabled="$v.$invalid">Filtruj</button>
  <button type="button" class="btn btn-primary btn-k btn-filterorclear" :disabled="!is_filtered" v-on:click="clearFilter">Wyczyść filtr</button></div>
</form> 
</template>

<script>
import { required} from 'vuelidate/lib/validators';
export default {
props: ['provinceslist','citieslist', 'clubslist','current_cityid','current_provinceid', 'current_clubid','is_filter'],
 data() {
    return {
      provinceid: this.current_provinceid,
      cityid: this.current_cityid,
      clubid: this.current_clubid,
      is_filtered: this.is_filter,
    }
  },
  validations: {
    clubid: {
      required
    }
  },
methods:{
  onSubmit(){
      this.is_filtered = true;
      const filters = {
      filterclub: this.clubid,
      }
        this.$emit('contractorFilter', filters);

  },
   clearFilter(){
     this.is_filtered = false;
     this.provinceid= '';
     this.cityid= '';
     this.clubid= '';
    this.$emit('clearFilter');
  },

  onSelectProvince(){
    console.log(this.provinceid);
    this.cityid = '';
    this.clubid = '';
    const body = {
      province_id: this.provinceid
    }
    this.$emit('provinceSelected', body);
  },

  onSelectCity(){
    console.log(this.cityid);
    this.clubid = '';
    const body = {
      city_id: this.cityid
    }
    this.$emit('citySelected', body);
  }
 }
}
</script>