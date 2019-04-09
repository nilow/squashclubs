<template>
<div class="d-flex align-items-center list-row-k">
    	<div class="d-flex part-data">
		    
		    <div class="p-2 cell cell-25" v-if="!edit"><span class="d-block d-sm-none label-mobile">Tytuł umowy</span>{{contractdata.name}}</div>
		    <div class="p-2 cell cell-25" v-if="!edit"><span class="d-block d-sm-none label-mobile">Data rozpoczęcia</span>{{contractdata.from}}</div>
		    <div class="p-2 cell cell-25" v-if="!edit"><span class="d-block d-sm-none label-mobile">Data wygaśnięcia</span>{{contractdata.to}}</div>
		    <div class="p-2 cell cell-25" v-if="!edit"><span class="d-block d-sm-none label-mobile">Klub, miasto</span>{{contractdata.clubnamecity}}</div>

		    <div class="p-2 cell cell-100 cell-edit" v-if="edit">
	          	<div class="d-flex justify-content-between row-edit">
		            <div class="form-group">
			            <label for="email">Tytuł umowy:</label>
			            <input type ="text" class="form-control input-k" v-model="Editcontractname">
		            </div>

		            <div class="form-group">
			            <label for="email">Warunki:</label>
			            <textarea class="form-control input-k" v-model="Editcontractconditions"></textarea>
		            </div>
	          	</div>
	          	<div class="d-flex justify-content-between row-edit">
		            <div class="form-group">
						<label for="email">Data rozpoczęcia umowy:</label>
						<!--<input type ="text" class="form-control input-k" v-model="contractname">-->
						<datepicker v-model="Editcontractfrom" :language="pl" :input-class="customclass" :format="customformat"></datepicker>
					</div>
					<div class="form-group">
						<label for="email">Data zakończenia umowy:</label>
						<!--<input type ="text" class="form-control input-k" v-model="contractname">-->
						<datepicker v-model="Editcontractto" :language="pl" :input-class="customclass" :format="customformat"></datepicker>
					</div>
	          	</div>
	          	<div class="d-flex justify-content-between row-edit">
		          	<div class="form-group">
					    <label for="email">Klub:</label>
					    <select class="form-control select-k" v-model="Editcontrclubid" v-on:change="updateFromSelectedText">
						    <option value="">-wybierz-</option>
						   <option v-for="club of clubslist" v-bind:value="club.ccid">{{club.name}}, {{club.city.name}}</option>
					    </select>
			  		</div>

			  		<div class="form-group">
					    <label for="email">Plik umowy:</label>
					    <a :href="'http://backkontrah.nilow13.usermd.net/uploads/'+ contractdata.file" target="_blank">{{contractdata.file}}</a><br />
					    <input type="file" name="contactFile" id="contractFile" v-on:change="onFileSelected" style="display:none" ref="uploadInput"/>
		    <button type="button" v-on:click="$refs.uploadInput.click()" class="btn btn-info btn-upload">Wybierz plik</button>
		    <button type="button" v-on:click="onUpload" class="btn btn-info btn-upload">Wgraj plik</button> <span v-if="uploading">Postęp: {{percent}} %</span>
			  		</div>
		  		</div>
          </div>
      	</div>
      	<div class="part-actions">
      		<span v-if="!edit"><a href="#" title="Edycja" class="fa-k" v-on:click.prevent="onEdit()"><font-awesome-icon icon="edit" /></a><a href="#" title="Usuń" class="fa-k" v-on:click.prevent="onDeleteContract()"><font-awesome-icon icon="trash" /></a></span><span v-if="edit"><a href="#" title="Zapisz" class="fa-k" v-on:click.prevent="onUpdate()"><font-awesome-icon icon="check-square" /></a><a href="#" title="Anuluj" class="fa-k" v-on:click.prevent="onCancel()"><font-awesome-icon icon="square" /></a></span>
      	</div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {pl} from 'vuejs-datepicker/dist/locale';
export default {
	props: ['contractdata', 'clubslist'],
	data(){
	return{
		edit:false,
		pl: pl,
      	customclass: 'form-control input-k',
      	customformat: 'yyyy-MM-dd',
      	Editcontractname:'',
      	Editcontractconditions:'',
      	Editcontractfrom:'',
      	Editcontractto:'',
      	Editcontrclubid:'',
      	percent:0,
      	selectedFile:null,
      	uploading: false,

		}
	},
	components:{
  	Datepicker
  },
	methods:{
		onEdit(){
			this.edit = true;
			this.Editcontractname = this.contractdata.name;
      		this.Editcontractconditions = this.contractdata.conditions;
      		this.Editcontractfrom = this.contractdata.from;
      		this.Editcontractto = this.contractdata.to;
      		this.Editcontrclubid = this.contractdata.ccid;
		},
		onCancel(){
			this.edit = false
		},
		onUpdate(){
			const token = localStorage.getItem('token');
			this.percent = 0;
			this.uploading = false;
			this.contractdata.name = this.Editcontractname;
        	this.contractdata.conditions = this.Editcontractconditions;
        	this.contractdata.file = this.selectedFile !==null ? this.selectedFile.name : this.contractdata.file;
        	this.contractdata.from = this.Editcontractfrom;
        	if(typeof this.contractdata.frome === 'object'){
        		this.contractdata.from = this.contractdata.from.toJSON().split("T")[0];
        	}
        	this.contractdata.to = this.Editcontractto;
        	if(typeof this.contractdata.to === 'object'){
        		this.contractdata.to = this.contractdata.to.toJSON().split("T")[0];
        	}
        this.axios.put('http://backkontrah.nilow13.usermd.net/api/contract/' + this.contractdata.id + '?token=' + token, {name: this.Editcontractname, conditions: this.Editcontractconditions, from: this.Editcontractfrom, to: this.Editcontractto, contractorsclubs_id: this.Editcontrclubid, file: this.contractdata.file})
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });
            this.edit = false;
		},

		onDeleteContract(){
			 this.$emit('confirmDeletedContract', 'contract_' + this.contractdata.id);
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

		updateFromSelectedText(event) {
	        const options = event.target.options;
	        const selectedOption = options[options.selectedIndex];
	        this.contractdata.clubnamecity = selectedOption.textContent;
	        this.contractdata.ccid = this.Editcontrclubid;
    }
	}
}
</script>