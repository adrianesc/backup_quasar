<template>
  <q-page id="cuerpo" >
    <q-carousel q-pa-xl
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      autoplay="yes"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center" img-src= "https://aroadsidecafe.files.wordpress.com/2014/11/interstellarfi.jpg"
      style=" background-size: cover; background-repeat: no-repeat; background-color: grey;">

        <div class="q-mt-md text-center absolute-top custom-caption">
          {{lab[0].nombre}}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center"  img-src="https://i0.wp.com/josegeek.com/wp-content/uploads/2021/12/thebatman.png?resize=769%2C285&ssl=1" >

        <div class="q-mt-md text-center absolute-top custom-caption">
          {{lab[1].nombre}}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center" img-src="https://plethoranetwork.com/wp-content/uploads/2021/07/turning-red-pixar-1024x576.jpeg">

        <div class="q-mt-md text-center absolute-top custom-caption">
          Tunring red
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center" img-src="https://i0.wp.com/www.septimacaja.com/wp-content/uploads/1633816242712_TheLastDuel_homemadebanner.png?fit=1141%2C422&ssl=1">

        <div class="q-mt-md text-center absolute-top custom-caption">
          The Last Duel
        </div>
      </q-carousel-slide>
    </q-carousel>
     <div class="row justify-center">
    </div>

<div class="row">
      <q-table
      :pagination="paginationBest"
      title="MEJOR VALORADAS"
      @row-click="goTo"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="col"
      hide-bottom
      style="font-family: 'Abril Fatface', cursive; text-align: center;"
    >
     <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <span v-if="col.name !='img'"  style="font-size: 210%; color:#fb93fc; text-shadow: 3px 3px 2px #5bdede, 0px 0px 2px black; ">
              {{ col.value }}</span>

             <q-image v-if="col.name =='img'" size="100px" class="shadow-10" @click="test(props.row.id)">
                    <img :src="props.row.imagen" style="width:75px;cursor: pointer;">
              </q-image>
              <br>
              <span  v-if="col.name =='img'" style="font-size: 150%; color:#fb93fc;   text-shadow: grey 2px 2px 1px; cursor: pointer;" @click="test(props.row.id)">{{props.row.nombre}}</span>
          </q-td>
        </q-tr>
      </template>

      </q-table>

    <q-table style="font-family: 'Abril Fatface', cursive; text-align: center;"
      :pagination="paginationVisited"
      title="MÁS VISITADAS"
      @row-click="goTo"
      :rows="rows"
      :columns="columns2"
      row-key="name"
      class="col"
      hide-bottom

    >
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
             <q-image v-if="col.name =='img'" size="100px" class="shadow-10 " @click="test(props.row.id)">
                    <img :src="props.row.imagen" style="width:75px; cursor: pointer;" >
              </q-image>
              <br>
              <span v-if="col.name =='img'" ><a style="font-size: 150%; color:#5bdede;text-shadow: grey 2px 2px 1px;cursor: pointer; " @click="test(props.row.id)">{{props.row.nombre}}</a></span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  </q-page>
</template>

<script>
// import { defineComponent } from 'vue'
// http://192.168.0.30:8069/gestion/apirest/peliculas?data={"id":"1"}
import { ref } from 'vue'
import { useQuasar } from 'quasar'

let a = 'https://static.posters.cz/image/1300/posters/the-batman-i-am-the-shadows-i122326.jpg'
export default {
  name: 'EjemPage',

  data () {
    // ----RELLENAR TABLA
    return {
      paginationBest: {
        sortBy: 'puntuacion',
        descending: true
      },
      paginationVisited: {
        sortBy: 'visitas',
        descending: true
      },
      columns: [
        {
          name: 'img',
          label: 'PELICULA',
          field: 'portada',
          align: 'center',
          sortable: false
        },
        {
          name: 'puntuacion',
          label: 'PUNTUACION',
          field: 'puntuacion',
          align: 'center',
          sortable: false
        },
        {
          name: 'nombre',
          label: '',
          field: 'nombre',
          align: 'left',
          sortable: false,
          classes: 'hidden'
        }

      ],
      columns2: [
        {
          name: 'img',
          label: 'PELICULA',
          field: 'portada',
          align: 'center',
          sortable: false
        },
        {
          name: 'nombre',
          label: ' ',
          field: 'nombre',
          align: 'left',
          sortable: false,
          classes: 'hidden'

        },
        {
          name: 'visitas',
          label: '',
          field: 'visitas',
          align: 'left',
          classes: 'hidden',
          sortable: false
        }
      ],
      rows: [],
      slide: ref('style'),
      lorem: ref('https://placeimg.com/500/300/nature?t=' + Math.random()),
      lab: [{}],
      dir: []

    }
  },
  mounted () {
    const usuario = this.$route.query.user
    console.log('aaa' + usuario)

    const arr = window.location.href.split('?')
    if (arr.length > 1 && arr[1] !== '') {
      this.nuevaSesion(usuario)
    } else {
      this.sesion()
    }

    this.getPosts()
  },
  methods: {
    test (id) {
      window.location.href = 'http://localhost:8080/#/film?id=' + id
    },
    goTo (event, row) {
      // Here you can navigate to where ever you have to
      // this.$router.push('film?id=' + row.id)
      window.location.href = 'http://localhost:8080/#/film?id=' + row.id
      console.log('aaaaaa ' + row)
    },
    getPosts () {
      this.$axios.get('http://localhost:8069/gestion/peliculas')
        .then((res) => {
          // const cars = []
          this.rows = res.data
          this.lab = res.data
          a = res.data.imagen
          // this.paginationBest = ref({ sortBy: 'puntuacion', descending: false })
          // this.paginationVisited = ref({ sortBy: 'visitas', descending: false })

          // this.ordernar(res.data)
          // this.var = res.data.sort(res.data.puntuacion)
          // console.log('ordernados ' + this.var[0].puntuacion)
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
    nuevaSesion (user) {
      const $q = useQuasar()
      $q.sessionStorage.set('user', user)
      console.log('NUEVA SESION ' + user)
    },
    sesion () {
      const $q = useQuasar()
      const ses = $q.sessionStorage.getItem('user')
      console.log('SESION: ' + ses)

      if (ses === 'undefined' || ses === '' || ses === null) {
        document.location.href = 'http://localhost:8080/#/login'
        console.log('NO SE HA INICIADO SESION')
        // console.log('ESE USUARIO ' + otherValue)
      }
    }
  },
  // ---- PRINT IMAGE
  setup () {
    // const user = this.$route.query.user

    const url = ref('https://placeimg.com/500/300/nature')
    const url2 = ref(a)
    // console.log($q)

    // SessionStorage.set('user', 'hola')

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
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Sen&display=swap')

.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

#cuerpo

</style>
