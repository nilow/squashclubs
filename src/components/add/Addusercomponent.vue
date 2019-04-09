<template>
<div>
<b-btn v-b-modal.modal1 class="btn btn-primary btn-k-new"><font-awesome-icon icon="plus-circle" /> Dodaj nowego użytkownika</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal1" hide-footer title="Dodaj nowego użytkownika" class="addmodal-k">
	  <form v-on:submit.prevent="onSubmit">
	  	<div class="d-flex justify-content-between row-modal">
		  	<div class="form-group">
			    <label for="email">Imię:</label>
			    <input type ="text" class="form-control input-k" v-model="uname">
			</div>
			<div class="form-group">
			    <label for="email">Nazwisko:</label>
			    <input type ="text" class="form-control input-k" v-model="usurname">
			</div>
		</div>
		
		
		<div class="d-flex justify-content-between row-modal">
			<div class="form-group">
			    <label for="email">Email:</label>
			    <input type ="email" class="form-control input-k" v-model="uemail">
			</div>
			<div class="form-group">
			    <label for="email">Hasło:</label>
			    <input type ="password" class="form-control input-k" v-model="upassword">
			</div>
		</div>
		
		  
		  <button type="submit" class="btn btn-primary btn-k" :disabled="$v.$invalid">Dodaj użytkownika</button>
	  </form> 
  </b-modal>
  </div>
</template>
<script>
import { required} from 'vuelidate/lib/validators';

export default {
props: ['types'],
data(){
	return{
		uname:'',
		usurname:'',
		uemail:'',
		upassword:'',
	}
},
validations: {
    uname: {
      required,
    },
    usurname: {
      required
    },
    uemail: {
      required
    },
    upassword: {
      required
    },
  },

methods:{
	onSubmit(){

 		const body = {
	 		name: this.uname, 
	 		surname: this.usurname,
	 		password: this.upassword,
	 		email: this.uemail,
 		}
 	
		    this.$emit('userAdded', body);
		    this.uname = '';
		    this.usurname = '';
		    this.uemail = '';
		    this.upassword = '';
		    

 	},
}

}
</script>