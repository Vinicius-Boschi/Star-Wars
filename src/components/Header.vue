<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__navbar">
        <div class="header__action">
          <img src="" alt="Logo Star Wars" class="header__logo" />
          <button class="header__button">
            <div class="header__burguer burguer-slip">
              <div class="header__burguer-lines"></div>
            </div>
          </button>
        </div>
        <div class="header__links-container">
          <ul class="header__list">
            <li class="header__links">
              <a href="">Home</a>
            </li>
            <li class="header__links">
              <a href="">Personagens</a>
            </li>
            <li class="header__links">
              <a href="">Filmes</a>
            </li>
            <li class="header__links">
              <a href="">Planetas</a>
            </li>
            <li class="header__links">
              <a href="">Naves</a>
            </li>
            <li class="header__links">
              <a href="">Veículos</a>
            </li>
            <li class="header__links">
              <a href="">Espécies</a>
            </li>
            <li class="header__links">
              <a href="">Favoritos</a>
            </li>
          </ul>
        </div>
        <div class="header__search">
          <input type="search" class="header__input" placeholder="Pesquise...">
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
@use "../assets/scss/variables.scss";
</style>