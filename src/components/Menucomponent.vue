<template>
	    <!--Nav-->
   <b-navbar toggleable="md" type="dark" class="navbar-k">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/home">Baza kontrahentów</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
    <b-nav-item to="/cities">Miasta</b-nav-item>
    <b-nav-item to="/clubs">Kluby</b-nav-item>
    <b-nav-item to="/contractors">Kontrahenci</b-nav-item>
    <b-nav-item to="/users">Użytkownicy</b-nav-item>
      <!--<b-nav-item-dropdown text="Miasta">
        <b-dropdown-item href="#">Wszystkie miasta</b-dropdown-item>
        <b-dropdown-item href="#">Dodaj miasto</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Kluby">
        <b-dropdown-item href="#">Wszystkie kluby</b-dropdown-item>
        <b-dropdown-item href="#">Dodaj klub</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Kontrahenci">
        <b-dropdown-item href="#">Wszyscy kontrahenci</b-dropdown-item>
        <b-dropdown-item href="#">Dodaj kontrahenta</b-dropdown-item>
      </b-nav-item-dropdown>-->
    </b-navbar-nav>

<!--right items-->
     <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown v-bind:text="user" right>
        
        <b-dropdown-item href="#" v-on:click.prevent="onLogout">Wyloguj</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>



  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->

</template>

<script>
export default {
 data () {
    return {
     user:'',
    }
  },

created(){
     const token= localStorage.getItem('token');
     this.axios.get('http://backkontrah.nilow13.usermd.net/api/loggeduser' + '?token=' + token)
            .then(response => {
             console.log(response);
             this.user = response.data.user;
            })
            .catch(e => {
              console.log(e)
            });
 
},

methods:{
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.$router.push('/');
  }
}
}
</script>
