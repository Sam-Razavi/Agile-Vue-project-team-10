<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
export default {
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  data() {
    return {
      mobileNav: null,
      mobileMenuOpen: null,
      windowWidth: null,
      isActive: false
    }
  },
  methods: {
    mobileMenuShow() {
      this.mobileMenuOpen = true
      return
    },
    mobileMenuHide() {
      this.mobileMenuOpen = false
    },
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 600) {
        this.mobileNav = true
        return
      }
      this.mobileNav = false
      this.mobileMenuOpen = false
      return
    }
  }
}
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="logo" :class="{ 'logo-position': !mobileNav, 'logo-align': mobileMenuOpen }">
        <img class="logo-img" src="../assets/logo.png" alt="" />
      </div>
      <div v-show="!mobileNav">
        <ul class="desktop-nav">
          <li>
            <RouterLink class="nav-link" to="/">Month</RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" to="/week">Week</RouterLink>
          </li>
        </ul>
      </div>
      <div v-show="mobileNav && !mobileMenuOpen" class="mobile-nav">
        <div class="btn" @click="mobileMenuShow">
          <div class="bars"></div>
          <div class="bars"></div>
          <div class="bars"></div>
        </div>
      </div>
      <div v-show="mobileMenuOpen">
        <div class="btn" @click="mobileMenuHide">
          <div class="close-btn angle-left"></div>
          <div class="close-btn angle-right"></div>
        </div>
        <ul class="mobile-menu">
          <li>
            <RouterLink class="nav-link" to="/">Month</RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" to="/week">Week</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <RouterView class="views" />
</template>

<style scoped>
.views {
  margin-top: 74px;
}

header {
  width: 100vw;
  height: 74px;
  padding-bottom: 50px;
  position: fixed;
  top: 0;
  background-color: black;
  z-index: 999;
}
.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 50px;
  width: 50px;
  margin-left: 10px;
  margin-top: 4px;
}

.logo-position {
  margin-bottom: 28px;
}

.logo-align {
  align-self: flex-start;
  margin-top: 7px;
}

.logo-img {
  width: 100%;
}

.desktop-nav {
  max-width: 60%;
  min-width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem;
}

li {
  padding: 8px;
  margin-left: 5px;
  margin-right: 5px;
  list-style-type: none;
}
.nav-link {
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 2px;
  color: white;
}

.nav-link:hover {
  border-bottom: 1px solid white;
}

.active {
  border-bottom: 1px solid white;
}

.btn {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 60px;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.bars {
  width: 50px;
  height: 2px;
  margin: 5px 0;
  background-color: white;
}

.close-btn {
  width: 50px;
  height: 2px;
  margin: 5px 0;
  background-color: white;
}

.angle-left {
  transform: rotate(45deg);
  position: absolute;
  top: 30px;
  right: 10px;
}

.angle-right {
  transform: rotate(-45deg);
  position: absolute;
  top: 30px;
  right: 10px;
}

.mobile-menu {
  width: 65vw;
  height: 100vh;
  background-color: black;
}
</style>
