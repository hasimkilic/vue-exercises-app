<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Kayıt Ol</h3>
      <input v-model="userData.fullname" type="text" placeholder="Tam Ad" class="input mb-3" />
      <input v-model="userData.username"  type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
      <input v-model="userData.password"  type="password" placeholder="Şifre" class="input mb-3" />
      <button @click="onSave" class="default-button">Kayıt ol</button>
      <span class="text-center mt-3 text-sm">
        Zaten Üyeyim,
        <router-link :to="{name:'login'}" class="text-red-900 hover:text-black">Giriş yap!</router-link>
      </span>
    </div>
</template>

<script>
//npm install crypto-js paketi ile kullanıcının gelen bilgilerini saklıyoruz.
import CryptoJs from "crypto-js"
export default {
    name:'RegisterView',
    data() {
        return {
            userData:{
              username:null,
              fullname:null,
              password:null
            }
        }
    },
    methods: {
      onSave(){
        const password = CryptoJs.HmacSHA1(password,this.$store.getters._saltKey).toString(); //Bu şekilde şifreyi gizliyoruzç.

        this.$appAxios.post("/users",{...this.userData,password}).then(registered_user_res =>{
          console.log('registered_user_res :>> ', registered_user_res);
          // this.$router.push({name:"home"})
        })
      }
    },
    
}
</script>

<style>

</style>