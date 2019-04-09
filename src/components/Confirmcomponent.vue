<template>
<div class="confirm-wrapper">
	<div class="confirm-box">
		<p class="text-center">Czy na pewno usunąć ten element z listy?</p>
		<div class="button-container">
			<button class="btn btn-primary btn-k" v-on:click="onOk()">Potwierdź</button> 
			<button class="btn btn-primary btn-k" v-on:click="onNo()">Anuluj</button>
		</div>
	</div>
</div>

</template>
<script>
export default {
	props:['itemid'],
	methods:{
		onOk(){
			this.$emit('okDeleted', this.itemid);
		},
		onNo(){
			this.$emit('noDeleted');
		},
	}
}
</script>