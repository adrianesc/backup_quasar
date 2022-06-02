<template>
  <q-page>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px;float:left">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >

          <q-input standout="bg-cyan-12 text-purple-12" v-model="titulo" label="Título" :dense="dense" />
          <q-input standout="bg-cyan-12 text-purple-12" v-model="director" label="Director" :dense="dense" />
          <q-input standout="bg-cyan-12 text-purple-12" v-model="genero" label="Género" :dense="dense" />
          <q-input v-model="sinopsis" label="Sinopsis" standout="bg-cyan-12 text-purple-12" filled type="textarea"/>
          <q-input v-model="imagen" filled type="textarea" standout="bg-cyan-12 text-purple-12" label="URL imagen" />

          <q-input
            @update:model-value="val => { file = val[0] }"
            v-model="portada"
            filled
            type="file"
            hint="Native file"
          />

      <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </q-form>
    </div>
    <div style="margin-left:20%">
      <span id="titu">Añade tu Película:</span><br>
      <span id="texto">
      Si tu película no está en la la web y te gustaría añadirla, rellena este formulário y revisaremos tu solcitud.<br>
      Muchas gracias por tu colaboración!
      </span>
    </div>
  </div>
  </q-page>
</template>

<script>
// import { defineComponent } from 'vue'
// http://192.168.0.30:8069/gestion/apirest/peliculas?data={"id":"1"}
// import { dir } from 'console'
import { useQuasar } from 'quasar'
// import { ref } from 'vue'
export default {
  name: 'EjemPage',
  data () {
    // ----RELLENAR TABLA
    return {
      titulo: null,
      director: null,
      genero: null,
      sinopsis: null,
      portada: null

    }
  },
  mounted () {
    this.sesion()

    // this.getPosts()
  },
  methods: {
    goTo (event, row) {
      // Here you can navigate to where ever you have to
      this.$router.push('film?id=' + row.id)
      console.log('aaaaaa ' + row)
    },
    onSubmit () {
      console.log(URL.createObjectURL(this.portada))
      this.$axios.post('http://localhost:8069/gestion/apirest/posibles_peliculas?data={"id":"1","nombre":"' + this.titulo + '","director":"' + this.director + '","genero":"' + this.genero + '","sinopsis":"' + this.sino + '"}')
    },
    sesion () {
      const $q = useQuasar()
      const ses = $q.sessionStorage.getItem('user')
      console.log('Comprobando sesion: ' + ses)

      if (ses === 'undefined' || ses === '' || ses === null) {
        document.location.href = 'http://localhost:8080/#/login'
        console.log('NO SE HA INICIADO SESION')
        // console.log('ESE USUARIO ' + otherValue)
      }
    }
  },
  // ---- PRINT IMAGE
  setup () {

  }
}

</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

#texto{
  font-size: 150%;
  color: #6600cc;
  font-family: 'Jost', cursive;}

#titu{
  font-size: 200%;
  color:#fb93fc;
  text-shadow: #6600cc 0px 0px 1px;
  font-family: 'Jost', cursive;
}
</style>
