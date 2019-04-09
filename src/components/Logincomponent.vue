<template>
<div>
<div class="bg" v-bind:class="{loaded:bgload}"></div>
<div class="login-form-wrapper">
<div class="login-form-title">Kluby squasha w Polsce - baza kontrahentów</div>
<div class="login-form">
 <form v-on:submit.prevent="onSubmit">
  <div class="form-group">
  <span class="errorinfo" v-if="errorinfo">Nieprawidłowe dane logowania</span>
    <label for="email">Email:</label>
    <div class="log">
      <span><font-awesome-icon icon='envelope' /></span>
      <input type="email" class="form-control" id="email" v-model="email">
    </div>
  </div>
  <div class="form-group">
    <label for="pwd">Hasło:</label>
      <div class="log">
        <span><font-awesome-icon icon='lock' /></span>
        <input type="password" class="form-control" id="pwd" v-model="password">
      </div>
  </div>
  
  <button type="submit" class="btn btn-primary btn-k" :disabled="$v.$invalid">Zaloguj się</button>
  <br /><br />
  <label>Login: nilow123@gmail.com<br />
  Hasło: test</label>
</form> 
</div>
</div>
</div>

</template>

<script>
import { required} from 'vuelidate/lib/validators';
export default {

  data () {
    return {
      bgload: false,
      email: '',
      password: '',
      errorinfo: false,
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    },
     
  },

 created() {
    window.addEventListener('load', () => {
         this.bgload = true;
    })
},
methods:{
  onSubmit(){
    this.axios.post('http://backkontrah.nilow13.usermd.net/api/user/signin',{
      email: this.email, password: this.password

      })
            .then(response => {
              console.log(response);
              if(response.status === 200){
                const token = response.data.token;
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace("-","+").replace("_","/");
                const decoded = JSON.parse(window.atob(base64));
                const date = new Date(0); 
                const utc = date.setUTCSeconds(decoded.exp);
                //const date = decoded.exp; 
                localStorage.setItem('token', token);
                localStorage.setItem('expiration', utc);
                 this.$router.push('/home');
              }
             
            })
            .catch(e => {
              console.log(e);
              this.errorinfo = true;
            });
  }
  }

    

 
}
</script>
