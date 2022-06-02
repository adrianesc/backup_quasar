<template>
  <q-page>

    <div class="row">
      <p></p>
 <q-table
      grid
      dark
      bordered
      color="accent"
      card-class="bg-primary"
      title="Todas las Peliculas"
      :rows="rows"
      :columns="columns"
      row-key="id"
      style="margin-left: 7%;margin-right: 3%;"
      v-model:pagination="pagination"
    >
      <template v-slot:item="props">
        <q-card bordered dark class="q-ma-sm tileBGColor" style="max-width: 300px; min-width: 300px; cursor: pointer" @click="getFilm(props.row.id)">
          <div class="q-ma-sm" >
            <div>
              <q-img :src='props.row.imagen' basic />
            </div>
            <div >
              <div class="text-h6">
                {{props.row.nombre}}
              </div>
            </div>
            <div >
              <div class="row text-h8">
                <div class="column col-4">Director:</div>
                <div class="column">{{props.row.director}}</div>
              </div>
            </div>
            <div >
              <div class="row text-h8">
                <div class="column col-4">Puntuación:</div>
                <div class="column">{{props.row.puntuacion}}</div>
              </div>
            </div>
          </div>
        </q-card>
      </template>
    </q-table>
    </div>
    <div>

    </div>

  </q-page>
</template>

<script>
// import { defineComponent } from 'vue'
// http://192.168.0.30:8069/gestion/apirest/peliculas?data={"id":"1"}
import { useQuasar } from 'quasar'

import { ref } from 'vue'
const a = 'https://static.posters.cz/image/1300/posters/the-batman-i-am-the-shadows-i122326.jpg'
export default {
  name: 'EjemPage',
  data () {
    // ----RELLENAR TABLA
    return {
      pagination: {
        rowsPerPage: 30 // current rows per page being displayed
      },
      columns: [
        {
          name: 'nombre',
          label: 'NOMBRE',
          field: 'nombre',
          align: 'left',
          sortable: true
        },
        {
          name: 'director',
          label: 'DIRECTOR',
          field: 'director',
          align: 'left',
          sortable: true
        },
        {
          name: 'Nota',
          label: 'Puntuación',
          field: 'puntuacion',

          align: 'left',
          sortable: true
        },
        {
          name: 'img',
          label: 'IMAGEN',
          field: 'portada',
          align: 'left',
          sortable: true
        }
      ],
      rows: [],
      slide: ref('style'),
      lorem: ref('https://placeimg.com/500/300/nature?t=' + Math.random()),
      lab: [{}],
      l: [],
      a: []

    }
  },
  mounted () {
    this.sesion()

    this.getPosts()
  },
  methods: {
    getFilm (id) {
      window.location.href = 'http://localhost:8080/#/film?id=' + id
    },
    goTo (event, row) {
      // Here you can navigate to where ever you have to
      // this.$router.push('film?id=' + row.id)
      window.location.href = 'http://localhost:8080/#/film?id=' + row.id

      console.log('aaaaaa ' + row)
    },
    getPosts () {
      this.$axios.get('http://localhost:8069/peliculas')
        .then((res) => {
          this.l = res.data.length
          // const cars = []
          this.rows = res.data
          this.lab = res.data
          console.log(this.rows)
          // this.dir = res.data.director[1]
          console.log('rrrrr' + res.data[1].imagen)
          // this.rows = res.data

          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
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
    const url = ref('https://placeimg.com/500/300/nature')
    const url2 = ref(a)

    return {
      url,
      url2,
      refresh () {
        url.value = 'https://placeimg.com/500/300/nature?t=' + Math.random()
        url2.value = 'https://placeimg.com/500/300/nature?t=' + Math.random()
      }
    }
  }
}

</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
