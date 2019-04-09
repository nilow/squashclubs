 <template>
 	<div class="d-flex align-items-center list-row-k">
    	<div class="d-flex align-items-center part-data">
	    	<div class="p-2 cell cell-50" v-if="!edit"><span class="d-block d-sm-none label-mobile">Nazwa klubu</span>{{clubdata.name}}</div>

	    	<div class="p-2 cell cell-50" v-if="!edit"><span class="d-block d-sm-none label-mobile">Adres</span>{{clubdata.address}}</div>

        <div class="p-2 cell cell-100 cell-edit" v-if="edit">
          <div class="d-flex justify-content-between row-edit">
            <div class="form-group">
            <label for="email">Nazwa:</label>
            <input type ="text" class="form-control input-k" v-model="Editclubname">
            </div>

            <div class="form-group">
            <label for="email">Adres:</label>
            <input type ="text" class="form-control input-k" v-model="Editclubaddress">
            </div>
          </div>
          <div class="d-flex justify-content-between row-edit">
            <div class="form-group">
              <label for="email">Województwo:</label>
              <select class="form-control select-k" v-model="Editprovinceid" v-on:change="onSelectProvinceEdit">
              <option value="">-wybierz-</option>
              <option v-for="province of provinceslist" v-bind:value="province.id">{{province.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="email">Miasto:</label>
              <select class="form-control select-k" v-model="Editcityid">
              <option value="">-wybierz-</option>
             <option v-for="city of citieslist" v-bind:value="city.id">{{city.name}}</option>
              </select>
            </div>
          </div>
        </div>
      	</div>
      	<div class="part-actions">
      		<router-link :to="'/contractors/' + clubdata.province_id + '/' + clubdata.city_id + '/' + clubdata.id" title="Kontrahenci" class="fa-k"><font-awesome-icon icon="user-friends" /></router-link><span v-if="!edit"><a href="#" title="Edycja" class="fa-k" v-on:click.prevent="onEdit()"><font-awesome-icon icon="edit" /></a><a href="#" title="Usuń" class="fa-k" v-on:click.prevent="onDelete()"><font-awesome-icon icon="trash" /></a></span><span v-if="edit"><a href="#" title="Zapisz" class="fa-k" v-on:click.prevent="onUpdate()"><font-awesome-icon icon="check-square" /></a><a href="#" title="Anuluj" class="fa-k" v-on:click.prevent="onCancel()"><font-awesome-icon icon="square" /></a></span>
      	</div>
	</div>
</template>

<script>
export default {
props: ['clubdata','provinceslist','citieslist'],
	data(){
		return{
			edit: false,
      Editclubname: '',
      Editclubaddress: '',
      Editcityid: '',
      Editprovinceid: '',
		}
	},
  methods:{
  		/*onEdit: function(){
  			alert('haha')
  		}*/
  		onEdit(){
  			this.edit = true;
        this.Editclubname = this.clubdata.name;
        this.Editclubaddress = this.clubdata.address;
        this.Editcityid = this.clubdata.city_id;
        this.Editprovinceid = this.clubdata.province_id;
  		},
  		onCancel(){
  			this.edit = false;
  		},
      onUpdate(){
        this.clubdata.name = this.Editclubname;
        this.clubdata.address = this.Editclubaddress;
        const token = localStorage.getItem('token');
        this.axios.put('http://backkontrah.nilow13.usermd.net/api/club/' + this.clubdata.id + '?token=' + token, {name: this.Editclubname, address: this.Editclubaddress, city_id: this.Editcityid})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
            this.edit = false;

      },
      onDelete(){
        /*const token = localStorage.getItem('token');
        this.$emit('clubDeleted', this.clubdata.id);
        this.axios.delete('http://backkontrah.nilow13.usermd.net/api/club/' + this.clubdata.id + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });*/
            this.$emit('confirmDeleted', this.clubdata.id);

      },
      onSelectProvinceEdit(){
      console.log(this.Editprovinceid);
      const body = {
        province_id: this.Editprovinceid
      }
      this.$emit('provinceSelectedEdit', body);
      this.Editcityid = '';

    }
  }
}
</script>