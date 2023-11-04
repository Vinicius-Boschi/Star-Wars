<template>
  <Preloader :preloader="logo_src" :alt="name"/>
  <Header />
  <Search />
  <Main />
  <Footer />
</template>

<script>
  import Preloader from './components/Preloader.vue'
  import Header from './components/Header.vue'
  import Search from './components/Search.vue'
  import Main from './components/Main.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      Preloader,
      Header,
      Search,
      Main,
      Footer
    },

    data() {
      return {
        logo_src: 'https://i.gifer.com/N7VV.gif',
        name: 'Sabre de Luz'
      }
    },

    methods: {
      loadPreloader() {
        const preloader = document.querySelector('.preloader')
        
        window.addEventListener('load', () => {
          preloader.classList.add('hide-preloader')
        })
      }
    },
    
    mounted() {
      this.loadPreloader()
    }
  }

</script>

<style lang="scss">
  @import "./assets/scss/variables.scss";

  body {
    background-image: url("https://github-production-user-asset-6210df.s3.amazonaws.com/74377158/280483955-11005287-0407-4608-9c7c-e237c1cd341c.jpg");
    width: 100vw;
    overflow-x: hidden;
    background-size: max(100vw, 100vh);
    background-position: 0 50%;
    background-attachment: fixed;
    font-family: $font;
  }
</style>