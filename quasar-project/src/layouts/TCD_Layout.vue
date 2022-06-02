<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="color:#white; text-shadow: 3px 3px 2px #fb93fc;">
      <q-toolbar>
        <q-img src="../assets/icono.png" style="max-width: 3%; max-height: 3%;"></q-img>
      <q-toolbar-title>
          <span style="font-family: 'Righteous', cursive;">The Cinema Database</span>
        </q-toolbar-title>

      <q-btn-group push style="text-align:left;color:#white; text-shadow: 3px 3px 2px #fb93fc;">
        <q-btn push label="Inicio" icon="menu" @click="goTo('http://localhost:8080/#/')"/>
        <q-btn push label="Listado de Peliculas" icon="movie"  @click="goTo('http://localhost:8080/#/filmList')"/>
        <q-btn push label="Géneros" icon="visibility" @click="goTo('http://localhost:8080/#/genreList')"/>
        <q-btn push label="Directores" icon="visibility"  @click="goTo('http://localhost:8080/#/directorList')"/>
        <q-btn push label="Añadir" icon="playlist_add" @click="goTo('http://localhost:8080/#/newfilm')"/>

      </q-btn-group>
    <q-space />
        <q-btn push color="red" label="SALIR" icon="logout" href="http://localhost:8080/#/login" @click="goTo('http://localhost:8080/#/login')"/>

      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'TCD_Layout',

  components: {

  },

  methods: {
    goTo (url) {
      window.location.href = url
      window.location.reload()
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
button{
  color:white;
text-shadow: 3px 3px 2px #fb93fc;}
</style>
