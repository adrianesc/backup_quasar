<template>
  <q-page>

    <div class="row">
 <q-table
      grid
      dark
      bordered
      color="accent"
      card-class="bg-primary"
      :title="dName"
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
                <div class="column">{{props.row.director[1]}}</div>
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
// import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'dirInfo',
  data () {
    // ----RELLENAR TABLA
    return {
      columns: [
        {
          name: 'nombre',
          label: 'NOMBRE',
          field: 'nombre',
          align: 'center',
          sortable: true
        },
        {
          name: 'director',
          label: 'DIRECTOR',
          field: 'director',
          align: 'center',
          sortable: true
        },
        {
          name: 'Nota',
          label: 'Puntuación',
          field: 'puntuacion',
          align: 'center',
          sortable: true
        },
        {
          name: 'img',
          label: 'IMAGEN',
          field: 'portada',
          align: 'center',
          sortable: true
        }
      ],
      rows: [],
      dName: []
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
      this.$axios.get('http://localhost:8069/gestion/apirest/peliculas?data={"director":"' + this.$route.query.director + '"}')
        .then((res) => {
          console.log('uuuuuu ' + res.data[0].director[1])
          this.rows = res.data
          this.lab = res.data
          this.dName = 'Peliculas de'.concat(' ', res.data[0].director[1])
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
