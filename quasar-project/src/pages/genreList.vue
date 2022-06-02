<template>
  <q-page>

    <div class="row">
      <q-table grid title="Listado de Generos" @row-click="goTo" :rows="rows" :columns="columns" row-key="name" class="col">

     <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <img src="https://static.posters.cz/image/1300/posters/the-batman-i-am-the-shadows-i122326.jpg">
        </q-td>
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
  name: 'genreList',
  data () {
    // ----RELLENAR TABLA
    return {
      columns: [
        {
          name: 'nombre',
          label: 'NOMBRE',
          field: 'nombre',
          align: 'left',
          sortable: true
        }
      ],
      rows: []
    }
  },
  mounted () {
    this.sesion()
    this.getPosts()
  },
  methods: {
    goTo (event, row) {
      // Here you can navigate to where ever you have to
      this.$router.push('genre?genre=' + row.id)
      window.location.href = 'http://localhost:8080/#/genre?genre=' + row.id

      console.log('aaaaaa ' + row)
    },
    getPosts () {
      this.$axios.get('http://localhost:8069/generos')
        .then((res) => {
          this.rows = res.data
          this.lab = res.data

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
