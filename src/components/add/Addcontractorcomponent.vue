<template>
<div>
<b-btn v-b-modal.modal1 class="btn btn-primary btn-k-new"><font-awesome-icon icon="plus-circle" /> Dodaj nowego kontrahenta</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal1" hide-footer title="Dodaj nowego kontrahenta" class="addmodal-k">
	  <form v-on:submit.prevent="onSubmit">
	  	<div class="d-flex justify-content-between row-modal">
		  	<div class="form-group">
			    <label for="email">Imię:</label>
			    <input type ="text" class="form-control input-k" v-model="conname">
			</div>
			<div class="form-group">
			    <label for="email">Nazwisko:</label>
			    <input type ="text" class="form-control input-k" v-model="consurname">
			</div>
		</div>
		<div class="d-flex justify-content-between row-modal">
			<div class="form-group">
			    <label for="email">PESEL:</label>
			    <input type ="text" class="form-control input-k" v-model="conidcard">
			</div>
			<div class="form-group">
			    <label for="email">Kod pocztowy:</label>
			    <input type ="text" class="form-control input-k" v-model="conpostalcode">
			</div>
		</div>
		<div class="d-flex justify-content-between row-modal">
			<div class="form-group">
			    <label for="email">Miasto:</label>
			    <input type ="text" class="form-control input-k" v-model="concity">
			</div>
			<div class="form-group">
			    <label for="email">Ulica:</label>
			    <input type ="text" class="form-control input-k" v-model="constreet">
			</div>
		</div>
		<div class="d-flex justify-content-between row-modal">
			<div class="form-group">
			    <label for="email">Email:</label>
			    <input type ="text" class="form-control input-k" v-model="conemail">
			</div>
			<div class="form-group">
			    <label for="email">Telefon:</label>
			    <input type ="text" class="form-control input-k" v-model="conphone">
			</div>
		</div>
		
		  <div class="form-group">
		    <label for="email">Typ kontrahenta:</label>
		    <select class="form-control select-k" v-model="contype">
		    <option value=''>-wybierz-</option>
		    <option v-for="type of types" v-bind:value="type.id">{{type.name}}</option>
		   
		    </select>
		  </div>
		  <button type="submit" class="btn btn-primary btn-k">Dodaj kontrahenta</button>
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
		conname:'',
		consurname:'',
		conpostalcode:'',
		concity:'',
		constreet:'',
		conidcard:'',
		conphone:'',
		conemail:'',
		contype:'',
	}
},

methods:{
	onSubmit(){
 		const body = {
	 	name: this.conname,
	 	surname: this.consurname,
	 	postal_code: this.conpostalcode,
	 	city: this.concity,
	 	street: this.constreet,
	 	idcard_number: this.conidcard,
	 	phone: this.conphone,
	 	email: this.conemail,
	 	type:this.contype
 	};
 	
	this.$emit('conAdded', body);
	this.conname = '';
	this.consurname = '';
	this.conpostalcode = '';
	this.concity = '';
	this.constreet = '';
	this.conidcard = '';
	this.conphone = '';
	this.conemail = '';
	this.contype = '';
		    

 	},
}

}
</script>