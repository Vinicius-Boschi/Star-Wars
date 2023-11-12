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

<!-- <template>
  <div id="app">
    <h1 class="title">Teste de paginação</h1>
    <div class="list">
      <div v-for="passenger in passengers" :key="passenger._id" class="card">
        <strong>{{ passenger.name }}</strong>
        <span class="tag">{{ passenger.trips }}</span>
      </div>
    </div>
    <pagination
      v-if="passengers.length"
      :offset="offset"
      :total="total"
      :limit="limit"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import Pagination from './components/Pagination.vue';
import axios from 'axios';


export default {
  name: 'App',
  components: {
    Pagination,
  },
  data() {
    return {
      passengers: [],
      offset: 0,
      total: 0,
      limit: 10, // Limita a quantidade de itens por página.
    };
  },
  methods: {
    changePage(value) {
      this.offset = value;
      this.getPassengers();
    },
    getPassengers() {
      const BASE_URL = 'https://swapi.dev/api';
      const url = `${BASE_URL}/people=${this.offset}&size=${this.limit}`;

      axios.get(url).then(({ data }) => {
        this.passengers = data.data;
        this.total = data.totalPassengers;
      });
    },
  },
  mounted() {
    this.getPassengers();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  margin-bottom: 2rem;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 1rem;

  .card {
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    padding: 1rem;

    .tag {
      display: inline-block;
      background-color: #999;
      color: #fff;
      border-radius: 0.25rem;
      padding: 0.15rem 0.25rem;
      font-size: 0.75rem;
      margin-left: 0.5rem;
    }
  }
}
</style> -->