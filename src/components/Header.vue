<template>
  <ul id="navbar">
    <li class="logo"><a href="https://www.venturacollege.edu/" target="_blank"><img src="../assets/VC-logo.png" alt=""/></a></li>
    <li><router-link :to="{name: 'home'}">Home</router-link></li>
     <li><router-link :to="{name: 'students'}">Students</router-link></li>
    <li><router-link :to="{name: 'settings'}">Settings</router-link></li>
    <li><router-link :to="{name: 'about'}">About</router-link></li>
    <div id="authLinks">
      <li><router-link :to="{name: 'login'}">Log In</router-link></li>
      <li><router-link :to="{name: 'signup'}">Sign Up</router-link></li>
    </div>
  </ul>
</template>
<script>
export default {
  name: 'VCHeader'
}
</script>

<style scoped>
  #navbar{
    list-style-type: none;
    margin: 0;
    padding:0;
    position: fixed;
    top:0;
    right:0;
    width:100%;
    overflow: hidden;
    background-color:#FF6C0E;
  }
  #navbar li{
    float:left;
  }
  #navbar li a{
    display: block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 18px;
    color: #030000;
    border-right: 1px solid #cecece;
  }
  #navbar li a:hover{
    background-color:#FF9015;
  }
  #navbar li.logo a img{
    height:49px;
    width:auto;
    padding:0;
    margin:0;
  }
  #navbar li.logo a{
    height:49px;
    padding:0;
    margin:0;
  }
  #authLinks li a{
    border-left: 1px solid #cecece;
    border-right: 0 !important;
  }
  #authLinks li{
    float: right !important;
  }
</style>
