 <template>
 <div class="d-flex list-row-k align-items-center">
    	<div class="d-flex part-data align-items-center">
		    <div class="p-2 cell cell-25"><span class="d-block d-sm-none label-mobile">Nazwisko i imię</span>{{contractdata.contractor_surname}} {{contractdata.contractor_name}}<br /><span class="typetext">{{contractdata.texttype}}</span></div>
		    <div class="p-2 cell cell-25"><span class="d-block d-sm-none label-mobile">Tytuł umowy</span>{{contractdata.name}}</div>
		    <div class="p-2 cell cell-25"><span class="d-block d-sm-none label-mobile">Data wygaśnięcia</span>{{contractdata.to}}</div>
		    <div class="p-2 cell cell-25"><span class="d-block d-sm-none label-mobile">Klub, miasto</span>{{contractdata.club_name}}, {{contractdata.city_name}}</div>
      	</div>
      	<div class="part-actions">
      		<div class="p-2"><router-link :to="'/card/' + contractdata.contractor_id" title="Karta kontrahenta" class="fa-k"><font-awesome-icon icon="file" /></router-link></div>
      	</div>
</div>
</template>

<script>
export default {
props:['contractdata']
}
</script>