<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="color:#white; text-shadow: 3px 3px 2px #fb93fc;">
      <q-toolbar>

     <q-toolbar-title>
          <span style="font-family: 'Righteous', cursive;">The Cinema Database</span>
      </q-toolbar-title>

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
    goTo () {
      console.log('esto')
      this.$axios.post('http://localhost:8069/gestion/apirest/posibles_peliculas?data={"id":"1","nombre":"ejemplo","director":"ejemplo","genero":"ejemplo","sinopsis":"ejemplo"}')
      // https://gyazo.com/0f3b362c05aa3d7a4b4f5c0fe7674466
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

</style>
