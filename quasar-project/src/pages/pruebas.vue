<template>
  <q-page id="cuerpo">

                          <q-table
                            grid
                            dark
                            bordered
                            color="accent"
                            card-class="bg-primary"
                            title="Top Games"
                            :rows="rows"
                            :columns="columns"
                            row-key="id"
                            style="margin-left: 7%;margin-right: 3%;"
                            v-model:pagination="pagination"
                          >
                            <template v-slot:item="props">
                              <q-card bordered dark class="q-ma-sm tileBGColor" style="max-width: 300px; min-width: 300px; ">
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
                          </q-page>
</template>

<script>
// import { defineComponent } from 'vue'
// http://192.168.0.30:8069/gestion/apirest/peliculas?data={"id":"1"}
import { ref } from 'vue'
import { useQuasar } from 'quasar'

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
    this.getPosts()
    // this.comments()
  },
  methods: {
    goTo (event, row) {
      // Here you can navigate to where ever you have to
      this.$router.push('film?id=' + row.id)
      console.log('aaaaaa ' + row)
    },
    getPosts () {
      this.$axios.get('http://localhost:8069/gestion/peliculas')
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
    ordernar (datos) {
      // const max = 0
      // const maxI = 0
      for (let step = 0; step < datos.length; step++) {
        if (datos[step].puntuacion) { console.log(datos[step].id) }
      }
    },
    comments () {
      this.$axios.get('http://localhost:8069/gestion/comentarios')
        .then((res) => {
          console.log('1 ' + res)
          this.i = res.data
          // this.i = res.data[0].usuario
          console.log('2 ' + this.i)
          console.log('3 ' + this.i[0].usuario)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  // ---- PRINT IMAGE
  setup () {
    const url = ref('https://placeimg.com/500/300/nature')
    const url2 = ref(a)
    const $q = useQuasar()
    // console.log($q)
    $q.sessionStorage.set('user', '')
    // SessionStorage.set('user', 'hola')

    // let v = 'a'
    // this.$axios.get('http://localhost:8069/gestion/apirest/cargamento?data={"id":"1"}')
    //  .then((res) => {
    // console.log(res)
    // const cars = []
    // v = res.data.imagen
    // url2 = ref(v)
    // }).catch((err) => {
    // console.log(err)
    // })
    return {

      refresh () {
        url.value = 'https://placeimg.com/500/300/nature?t=' + Math.random()
        url2.value = 'https://placeimg.com/500/300/nature?t=' + Math.random()
      }
    }
  },
  sesion () {
    // nada
  }
}

</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

#cuerpo

</style>
