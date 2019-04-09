 <template>
 	<div class="d-flex align-items-center list-row-k">
    	<div class="d-flex part-data align-items-center">
	    	<div class="p-2 cell cell-20" v-if="!edit"><span class="d-block d-sm-none label-mobile">Nazwisko i imię</span>{{contractordata.surname}} {{contractordata.name}} </div>
	    	<div class="p-2 cell cell-20" v-if="!edit"><span class="d-block d-sm-none label-mobile">Typ kontrahenta</span>{{contractordata.texttype}}</div>
	    	<div class="p-2 cell cell-20" v-if="!edit"><span class="d-block d-sm-none label-mobile">Adres</span>{{contractordata.postal_code}} {{contractordata.city}}, {{contractordata.street}}</div>
	    	<div class="p-2 cell cell-20" v-if="!edit"><span class="d-block d-sm-none label-mobile">Telefon</span>{{contractordata.phone}}</div>
	    	<div class="p-2 cell cell-20" v-if="!edit"><span class="d-block d-sm-none label-mobile">Email</span>{{contractordata.email}}</div>

	    	<div class="p-2 cell cell-100 cell-edit" v-if="edit">
	    	<div class="d-flex justify-content-between row-edit">
		  	<div class="form-group">
			    <label for="email">Nazwisko:</label>
			    <input type ="text" class="form-control input-k" v-model="editSurname">
			</div>
			<div class="form-group">
			    <label for="email">Imię:</label>
			    <input type ="text" class="form-control input-k" v-model="editName">
			</div>
		</div>
		<div class="d-flex justify-content-between row-edit">
			<div class="form-group">
			    <label for="email">PESEL:</label>
			    <input type ="text" class="form-control input-k" v-model="editIdcard">
			</div>
			<div class="form-group">
			    <label for="email">Kod pocztowy:</label>
			    <input type ="text" class="form-control input-k" v-model="editPostalcode">
			</div>
		</div>
		<div class="d-flex justify-content-between row-edit">
			<div class="form-group">
			    <label for="email">Miasto:</label>
			    <input type ="text" class="form-control input-k" v-model="editCity">
			</div>
			<div class="form-group">
			    <label for="email">Ulica:</label>
			    <input type ="text" class="form-control input-k" v-model="editStreet">
			</div>
		</div>
		<div class="d-flex justify-content-between row-edit">
			<div class="form-group">
			    <label for="email">Email:</label>
			    <input type ="text" class="form-control input-k" v-model="editEmail">
			</div>
			<div class="form-group">
			    <label for="email">Telefon:</label>
			    <input type ="text" class="form-control input-k" v-model="editPhone">
			</div>
		</div>
		
		  <div class="form-group">
		    <label for="email">Typ kontrahenta:</label>
		    <select class="form-control select-k" v-model="editType">
		    <option value=''>-wybierz-</option>
		    <option v-for="type of types" v-bind:value="type.id">{{type.name}}</option>
		   
		    </select>
		  </div>
	    	</div>
      	</div>
      	<div class="part-actions">
      		<router-link :to="'/card/' + contractordata.id" title="Karta kontrahenta" class="fa-k"><font-awesome-icon icon="file" /></router-link>
      		<span v-if="!edit"><a href="#" title="Edycja" class="fa-k" v-on:click="onEdit()"><font-awesome-icon icon="edit" /></a><a href="#" title="Usuń" class="fa-k" v-on:click="onDelete()"><font-awesome-icon icon="trash" /></a></span><span v-if="edit"><a href="#" title="Zapisz" class="fa-k" v-on:click="onUpdate()"><font-awesome-icon icon="check-square" /></a><a href="#" title="Anuluj" class="fa-k" v-on:click="onCancel()"><font-awesome-icon icon="square" /></a></span>
      	</div>
    </div>
</template>

<script>

export default {
props: ['contractordata','types'],
data(){
	return{
		edit:false,
	}
},
methods:{
	onEdit(){
		this.edit = true;
		this.editName = this.contractordata.name;
        this.editSurname = this.contractordata.surname;
        this.editIdcard = this.contractordata.idcard_number;
        this.editPostalcode = this.contractordata.postal_code;
        this.editCity = this.contractordata.city;
        this.editStreet= this.contractordata.street;
        this.editEmail = this.contractordata.email;
        this.editPhone = this.contractordata.phone;
        this.editType = this.contractordata.type;
	},
	onCancel(){
  			this.edit = false;
  	},
  	onUpdate(){
        this.contractordata.name = this.editName;
        this.contractordata.surname = this.editSurname;
        this.contractordata.idcard_number = this.editIdcard;
        this.contractordata.postal_code = this.editPostalcode;
        this.contractordata.city = this.editCity;
        this.contractordata.street = this.editStreet;
        this.contractordata.email = this.editEmail;
        this.contractordata.phone = this.editPhone;
        this.contractordata.type = this.editType;
        const token = localStorage.getItem('token');
        this.axios.put('http://backkontrah.nilow13.usermd.net/api/contractor/' + this.contractordata.id + '?token=' + token, {name: this.editName, surname: this.editSurname, idcard_number: this.editIdcard, postal_code: this.editPostalcode, city: this.editCity, street: this.editStreet, email: this.editEmail, phone: this.editPhone, type: this.editType})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
            this.edit = false;

      },

       onDelete(){
       /*	const token = localStorage.getItem('token');
        this.$emit('contractorDeleted', this.contractordata.id);
        this.axios.delete('http://backkontrah.nilow13.usermd.net/api/contractor/' + this.contractordata.id + '?token=' + token)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });*/
             this.$emit('confirmDeleted', this.contractordata.id);

      },
}
}
</script>