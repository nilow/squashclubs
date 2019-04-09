<template>
<div class="d-flex align-items-center list-row-k">
    	<div class="d-flex align-items-center part-data">
	    	<div class="p-2 cell cell-50" v-if="!edit"><span class="d-block d-sm-none label-mobile">Nazwa miasta</span>{{citydata.name}}</div>
	    	<div class="p-2 cell cell-50" v-if="!edit"><span class="d-block d-sm-none label-mobile">Województwo</span>{{citydata.province_name}}</div>
	    	<div class="p-2 cell cell-100 cell-edit" v-if="edit">
        <div class="d-flex justify-content-between row-edit">
  	    	<div class="form-group">
            <label for="email">Nazwa:</label>
            <input type ="text" class="form-control input-k" v-model="editName">
          </div>
          <div class="form-group">
            <label for="email">Województwo:</label>
            <select class="form-control select-k" v-model="editProvince" v-on:change="updateFromSelectedText">
              <option value=''>-wybierz-</option>
              <option v-for="province of provinceslist" v-bind:value="province.id">{{province.name}}</option>
            </select>
          </div>
          </div>
	    	</div>
      	</div>
      	<div class="part-actions">
        <router-link :to="'/clubs/' + citydata.province_id + '/' + citydata.id" title="Kluby" class="fa-k"><font-awesome-icon icon="home" /></router-link>
      		<span v-if="!edit"><a href="#" title="Edycja" class="fa-k" v-on:click.prevent="onEdit()"><font-awesome-icon icon="edit" /></a><a href="#" title="Usuń" class="fa-k" v-on:click.prevent="onDelete()"><font-awesome-icon icon="trash" /></a></span><span v-if="edit"><a href="#" title="Zapisz" class="fa-k" v-on:click.prevent="onUpdate()"><font-awesome-icon icon="check-square" /></a><a href="#" title="Anuluj" class="fa-k" v-on:click.prevent="onCancel()"><font-awesome-icon icon="square" /></a></span>
      	</div>
</div>
</template>

<script>

export default {
props: ['citydata', 'provinceslist'],

	data(){
		return{
			edit:false,
      editName: '',
      editProvince: '',
      provinces: [],
      errors: []

		}
	},
  methods:{
  		/*onEdit: function(){
  			alert('haha')
  		}*/
  		onEdit(){
  			this.edit = true;
        this.editName = this.citydata.name;
        this.editProvince = this.citydata.province_id;
  		},
  		onCancel(){
  			this.edit = false;
  		},
      onDelete(){
        /*const token = localStorage.getItem('token');
        this.$emit('cityDeleted', this.citydata.id);
        this.axios.delete('http://backkontrah.nilow13.usermd.net/api/city/' + this.citydata.id + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });*/
            this.$emit('confirmDeleted', this.citydata.id);

      },
      onUpdate(){
        const token = localStorage.getItem('token');
        this.citydata.name = this.editName;
        this.axios.put('http://backkontrah.nilow13.usermd.net/api/city/' + this.citydata.id + '?token=' + token, {name: this.editName, province_id: this.editProvince})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
            this.edit = false;

      },
      updateFromSelectedText(event) {
        const options = event.target.options;
        const selectedOption = options[options.selectedIndex];
        this.citydata.province_name = selectedOption.textContent;
        this.citydata.province_id = this.editProvince;
    }
  },
  
}


</script>
