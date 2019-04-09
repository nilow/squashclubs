<template>
<div>
	<confirm-component v-if="confirmation" v-on:noDeleted="cancelDel" v-on:okDeleted="makeDel($event)" v-bind:itemid="del_id"></confirm-component>
	<div class="container-fluid container-k">
		<menu-component></menu-component>
		<div class="row">
			<div class="col-md-3 filter-column">
			<adduser-component v-on:userAdded="updateList($event)"></adduser-component>
			</div>
			<div class="col-md-9">
				<div class="d-flex justify-content-end"><h6><em>Liczba użytkowników: {{count}}</em></h6></div>
    			<div class="list-row-k row-names d-none d-sm-flex">
		    	<div class="d-flex part-data">
		      		<div class="p-2 cell cell-50">Nazwisko</div>
		      		<div class="p-2 cell cell-50">Imię</div>
		      	</div>
		      	<div class="d-flex part-actions">
		      		<div class="p-2">&nbsp;</div>
		      	</div>
    		</div>
    		<user-component v-for="user in users" v-bind:key="user.id" v-bind:userdata="user" v-on:confirmDeleted="showConfirm($event)"></user-component>

			</div>
		</div>
	</div>

</div>
</template>

<script>
import Menu from '../components/Menucomponent.vue';
import User from '../components/Usercomponent.vue';
import Adduser from '../components/add/Addusercomponent.vue';
import Confirm from '../components/Confirmcomponent.vue';
export default {
data(){
	return{
	users:[],
	count: 0,
	start: 0,
    portion: 20, 
    confirmation: false,
    del_id:0,
		}
	},

components:{
	'menu-component': Menu,
	'user-component': User,
	'adduser-component': Adduser,
	'confirm-component': Confirm,
	},

created(){
	//countall
    this.countAll();

    //get first portion
    this.firstPortion();
	},

methods:{
	countAll(){
		const token = localStorage.getItem('token');
		this.axios.get('http://backkontrah.nilow13.usermd.net/api/userscountall' + '?token=' + token)
	    .then(response => {
	      this.count = response.data.count
	    })
	    .catch(e => {
	      console.log(e)
	    });
	},

	firstPortion(){
		const token = localStorage.getItem('token');
		this.axios.get('http://backkontrah.nilow13.usermd.net/api/users/'+ (this.start * this.portion) + '?token=' + token)
	    .then(response => {
	      this.users = response.data.users;
	      console.log(this.users);
	    })
	    .catch(e => {
	      console.log(e)
	    });
	},

	updateList(body){
		const token = localStorage.getItem('token');
		this.axios.post('http://backkontrah.nilow13.usermd.net/api/user' + '?token=' + token, body)
        .then(response => {
         //countall
		    this.axios.get('http://backkontrah.nilow13.usermd.net/api/userscountall' + '?token=' + token)
		    .then(response => {
		      this.count = response.data.count
		    })
		    .catch(e => {
		      console.log(e)
		    });

		    this.start=0;

		    //get first portion
			    this.axios.get('http://backkontrah.nilow13.usermd.net/api/users/'+ (this.start * this.portion) + '?token=' + token)
			    .then(response => {
			      this.users = response.data.users;
			      console.log(this.users);
			    })
			    .catch(e => {
			      console.log(e)
			    });

        })
        .catch(e => {
          console.log(e)
        });
	},
	
	showConfirm(userid){
		this.confirmation = true;
		this.del_id = userid;
		//console.log('vvvvv' + userid)
	},

	cancelDel(){
	this.confirmation = false;
	},

	makeDel(userid){
		const token = localStorage.getItem('token');
		this.confirmation = false;
		console.log('usuwanie!!!!' + userid);
		this.axios.delete('http://backkontrah.nilow13.usermd.net/api/user/'+ userid + '?token=' + token)
				    .then(response => {
				      const position = this.users.findIndex((element) => {
                         return element.id == userid;
      				});
				      this.users.splice(position, 1);
				      this.count--;
				    })
				    .catch(e => {
				      console.log(e)
				    });
	},
	
	}
}
</script>