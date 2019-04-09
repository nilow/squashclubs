 <template>
 	<div class="d-flex align-items-center list-row-k">
    	<div class="d-flex align-items-center part-data">
        <div class="p-2 cell cell-50" v-if="!edit"><span class="d-block d-sm-none label-mobile">Nazwisko</span>{{userdata.surname}}</div>
        <div class="p-2 cell cell-50" v-if="!edit"><span class="d-block d-sm-none label-mobile">Imię</span>{{userdata.name}}</div>
        <div class="p-2 cell cell-100 cell-edit" v-if="edit">
            <div class="d-flex justify-content-between row-edit">
              <div class="form-group">
                <label for="email">Nazwisko</label>
                <input type ="text" class="form-control input-k" v-model="editSurname">
              </div>
              <div class="form-group">
                <label for="email">Imię</label>
                <input type ="text" class="form-control input-k" v-model="editName">
              </div>
          </div>
           <div class="d-flex justify-content-between row-edit">
              <div class="form-group">
                <label for="email">Email</label>
                <input type ="text" class="form-control input-k" v-model="editEmail">
              </div>
              <div class="form-group">
                <label for="email">Nowe hasło</label>
                <input type ="text" class="form-control input-k" v-model="editPassword">
              </div>
              
          </div>
        </div>
      	</div>
      	<div class="part-actions">
      		<span v-if="!edit"><a href="#" title="Edycja" class="fa-k" v-on:click="onEdit()"><font-awesome-icon icon="edit" /></a><a href="#" title="Usuń" class="fa-k" v-on:click="onDelete()"><font-awesome-icon icon="trash" /></a></span><span v-if="edit"><a href="#" title="Zapisz" class="fa-k" v-on:click="onUpdate()"><font-awesome-icon icon="check-square" /></a><a href="#" title="Anuluj" class="fa-k" v-on:click="onCancel()"><font-awesome-icon icon="square" /></a></span>
      	</div>
	</div>
</template>

<script>
export default {
props: ['userdata'],
	data(){
		return{
		edit: false,
    editName: '',
    editSurname: '',
    editEmail: '',
    editPassword: '',
      
		}
	},
  methods:{
  		onEdit(){
        this.edit = true;
        this.editName=this.userdata.name;
        this.editSurname=this.userdata.surname;
        this.editEmail=this.userdata.email;
      },

      onUpdate(){
        this.userdata.name = this.editName;
        this.userdata.surname = this.editSurname;
        this.userdata.email = this.editEmail;
        const token = localStorage.getItem('token');
        this.axios.put('http://backkontrah.nilow13.usermd.net/api/user/' + this.userdata.id + '?token=' + token, {name: this.editName, surname: this.editSurname, email: this.editEmail, password: this.editPassword})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
            this.edit = false;

      },

      onCancel(){
        this.edit = false;
      },

       onDelete(){
         this.$emit('confirmDeleted', this.userdata.id);
      }

    }
  }

</script>
