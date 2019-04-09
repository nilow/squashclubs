<template>
<div class="d-flex align-items-center list-row-k">
	<div class="d-flex align-items-center part-data">
		<div class="p-2 cell cell-50"><span class="d-block d-sm-none label-mobile">Nazwa klubu</span>{{clubdata.name}}</div>

		<div class="p-2 cell cell-50"><span class="d-block d-sm-none label-mobile">Adres</span>{{clubdata.address}}</div>

					       
	</div>
	<div class="part-actions">
		<a href="#" title="Usuń" class="fa-k" v-on:click.prevent="onDeleteClub()"><font-awesome-icon icon="trash" /></a>
	</div>
</div>
</template>

<script>
export default {
	props: ['clubdata'],
	methods:{
		 onDeleteClub(){
		 //alert(this.clubdata.ccid);
        /*this.$emit('contractorsclubsDeleted', this.clubdata.ccid);
        this.axios.delete('http://backkontrah.nilow13.usermd.net/api/contractorsclubs/' + this.clubdata.ccid)
            .then(response => {
              console.log(response);
            })
            .catch(e => {
              console.log(e)
            });*/

			 this.$emit('confirmDeletedContractorClub', 'contactorclub_' + this.clubdata.ccid);
		

      },
	}
}
</script>