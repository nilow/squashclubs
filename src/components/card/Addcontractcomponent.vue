<template>
<div>
<b-btn v-b-modal.modal1 class="btn btn-primary btn-k-new"><font-awesome-icon icon="plus-circle" /> Dodaj nową umowę</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal1" hide-footer title="Dodaj nową umowę" class="addmodal-k">
	  <form v-on:submit.prevent="onSubmit">
	  <div class="d-flex justify-content-between row-modal">
		  	<div class="form-group">
				<label for="email">Nazwa umowy:</label>
				<input type ="text" class="form-control input-k" v-model="contractname">
			</div>
			<div class="form-group">
			    <label for="email">Warunki umowy:</label>
			    <textarea class="form-control input-k" v-model="contractconditions"></textarea>
			</div>
		</div>
		<div class="d-flex justify-content-between row-modal">
			<div class="form-group">
				<label for="email">Data rozpoczęcia umowy:</label>
				<!--<input type ="text" class="form-control input-k" v-model="contractname">-->
				<datepicker v-model="contractfrom" :language="pl" :input-class="customclass" :format="customformat"></datepicker>
			</div>
			<div class="form-group">
				<label for="email">Data zakończenia umowy:</label>
				<!--<input type ="text" class="form-control input-k" v-model="contractname">-->
				<datepicker v-model="contractto" :language="pl" :input-class="customclass" :format="customformat"></datepicker>
			</div>
		</div>
		<div class="d-flex justify-content-between row-modal">
		  <div class="form-group">
		    <label for="email">Klub:</label>
		    <select class="form-control select-k" v-model="clubcontrid">
		    <option value="">-wybierz-</option>
		   <option v-for="club of clubslist" v-bind:value="club.ccid">{{club.name}}, {{club.city.name}}</option>
		    </select>
		  </div>
		  <div class="form-group">
		    <label for="email">Plik umowy:</label><br />
		    <input type="file" name="contactFile" id="contractFile" v-on:change="onFileSelected" style="display:none" ref="uploadInput"/>
		    <button type="button" v-on:click="$refs.uploadInput.click()" class="btn btn-info btn-upload">Wybierz plik</button>
		    <button type="button" v-on:click="onUpload" class="btn btn-info btn-upload">Wgraj plik</button> <span v-if="uploading">Postęp: {{percent}} %</span>

		  </div>
		  </div>
		  <button type="submit" class="btn btn-primary btn-k" :disabled="$v.$invalid">Dodaj umowę</button>
	  </form> 
  </b-modal>
  </div>
</template>
<script>
import { required} from 'vuelidate/lib/validators';
import Datepicker from 'vuejs-datepicker';
import {pl} from 'vuejs-datepicker/dist/locale';

export default {
props: ['clubslist'],
  data() {
    return {
      contractname: '',
      contractconditions: '',
      contractfrom: '',
      contractto: '',
      clubcontrid: '',
      pl: pl,
      customclass: 'form-control input-k',
      customformat: 'yyyy-MM-dd',
      selectedFile:null,
      percent:0,
      uploading:false,
    }
  },
  components:{
  	Datepicker
  },
  validations: {
    contractname: {
      required
    },
    contractconditions: {
      required
    },
     clubcontrid: {
      required
    }
  },
  methods:{


  	onSubmit(){
  	 this.uploading = false;
  	 this.percent = 0;
 		const body = {
	 		clubcontr_id: this.clubcontrid,
	 		name: this.contractname,
	    	conditions: this.contractconditions,
	    	from: this.contractfrom,
	    	to: this.contractto,
	    	file: this.selectedFile.name,
 		}

		this.$emit('contractAdded', body);
		this.contractname = '';
	    this.contractconditions = '';
	    this.contractfrom = '';
	    this.contractto = '';
	    this.clubcontrid = '';
 	},

 	onFileSelected(event){
 		this.selectedFile = event.target.files[0]
 	},

 	onUpload(event){
 		this.uploading = true;
 		const fd = new FormData();
 		const token = localStorage.getItem('token');
 		fd.append('contractfile', this.selectedFile, this.selectedFile.name);
 		this.axios.post('http://backkontrah.nilow13.usermd.net/api/contractuploadfile' + '?token=' + token, fd,{
 			onUploadProgress: uploadEvent=>{
 			 this.percent = Math.round((uploadEvent.loaded / uploadEvent.total)*100)
 			}

 		})
	    .then(response => {
	    	console.log(response);

	    })
	    .catch(e => {
	      console.log(e)
	    });
 	},
 	
 	onSelectProvince(){
 	console.log(this.provinceid);
 	const body = {
	 	province_id: this.provinceid
 	}
 	this.cityid='';
 	this.$emit('provinceSelected', body);

 	},

 	onSelectCity(){
 	console.log(this.cityid);
 	const body = {
	 	city_id: this.cityid
 	}
 	this.clubcontrid='';
 	this.$emit('citySelected', body);

 	}
  }
 
  
}
</script>
