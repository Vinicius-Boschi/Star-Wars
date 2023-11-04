<template>
    <header class="header">
        <nav>
            <router-link to="/"><img src="../assets/logo.png" alt="Star Wars"/></router-link>
            <ul>
                <li><router-link to="/">Personagens</router-link></li>
                <li><router-link to="/">Filmes</router-link></li>
                <li><router-link to="/">Naves Espaciais</router-link></li>
                <li><router-link to="/">Veiculos</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
    @import '../assets/scss/variables.scss';
    @import '../assets/scss/styles/header.scss';
</style>