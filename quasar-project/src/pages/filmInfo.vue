<template>
  <q-page>
    <div class="q-pa-xl" style = "overflow: hidden;">
      <q-img
        :src="src"
        spinner-color="white"
        style="height: 400px; max-width: 260px; float:left"
      />
      <span id="nombreP">{{titulo}}</span>
      <div :bind="text" style="position:absolute; top: 15%; left:20%; max-width:70%; min-width: 50%;">
        <q-card class="my-card" style="max-width:70%;">
          <q-card-section>
            <span class="etiq">Director:</span> <a  @click="goTo(dirID,'d')" class="link">{{dir}}</a><br>
            <span class="etiq">Genero:</span> <a  @click="goTo(genID,'g')" class="link">{{gen}}</a><br><br>
            <span class="etiq">Sinopsis:</span><br>
            <span id="sinop" >{{ lorem }}</span>
              <div class="q-pa-md">
                <span class="etiq">Puntuación:</span>
                <q-rating
                  v-model="ratingModel"
                  max="5"
                  size="3em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                  @click="withAtClick(ident,pts)"

                />
              </div>
          </q-card-section>
        </q-card>
      </div>
      <div :bind="text" style="position:absolute; top: 15%; left:75%; max-width:70%; min-width: 11%;">
        <q-card class="my-card" style="max-width:100%;">
          <q-card-section style="text-align:center">
            <span id="ptcn"><b><u>PUNTUACION</u></b></span><br>
              <span id="puntuacion">{{pts}}</span>

          </q-card-section>
        </q-card>
      </div>
    </div>
    <div style="overflow:hidden; ">
      <div class="q-pa-md" style = "width: 30%; float:left" >
          <span class="apart">TRAILER:</span>

        <q-video
          :ratio="16/9"
          :src="tr"
        />

      </div>
      <div :bind="text" style="width:40%;display:inline; ">
      <p class="apart" style="text-align:center;">RECOMENDACIONES BASADAS EN: {{gen}}</p>
      <div class="row">
          <q-card class="my-card" style="max-width:160px; margin-left: 32%;">
            <q-card-section>
                    <q-img
                      :src="rcm0.imagen"
                      spinner-color="white"
                      style="height: 200px; width:130px; max-width: 150px; float:left"
        />
              <a class="link" @click="goTo(rcm0.id,'p')">{{rcm0.nombre}}</a>
            </q-card-section>
          </q-card>
          <q-card class="my-card" style="max-width:160px">
            <q-card-section>
                    <q-img
                      :src="rcm1.imagen"
                      spinner-color="white"
                      style="height: 200px; width:130px; max-width: 150px; float:left"
        />
              <a  class="link" @click="goTo(rcm1.id,'p')">{{rcm1.nombre}}</a><br>
            </q-card-section>
          </q-card>
          <q-card class="my-card" style="max-width:160px">
            <q-card-section>
                    <q-img
                      :src="rcm2.imagen"
                      spinner-color="white"
                      style="height: 200px; width:130px; max-width: 150px; float:left"
        />
              <a @click="goTo(rcm2.id,'p')" class="link">{{rcm2.nombre}}</a><br>
            </q-card-section>
          </q-card>
        </div>
        </div>
      </div>

    <div class="q-pa-md">
      <span class="apart">OPINIONES DE USUARIOS</span>
    <q-card v-for="x in comentarios" :key="x.id" flat bordered >
      <q-item>
        <q-item-section avatar >
          <img style="max-width:70px" src="https://i0.wp.com/www.followchain.org/wp-content/uploads/2021/09/best-discord-profile-pictures-7.png?resize=256%2C256&ssl=1"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <b>{{ x.usuario[1] }}</b>
            <br>
          </q-item-label>
          <q-item-label >
            {{ x.comentario }}
          </q-item-label>
        </q-item-section>
      </q-item>

    </q-card>
     <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >

          <q-input  standout="bg-cyan-4
 text-white" v-model="comentario" label="Deja tu comentario..." :dense="dense" />

      <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </q-form>
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'filmInfo',

  data () {
    // ----RELLENAR DATOS
    return {
      lorem: [],
      dir: [],
      url: [],
      url2: [],
      gen: [],
      src: [],
      tr: [],
      bind: [],
      ident: [],
      pts: [],
      rcm0: [],
      rcm1: [],
      rcm2: [],
      titulo: [],
      urlrcm0: [],
      urlrcm1: [],
      urlrcm2: [],
      comentarios: [],
      genID: [],
      dirID: [],
      comentario: null

    }
  },
  mounted () {
    this.sesion()
    this.getPosts()
    console.log('HA SALIDO DEL POSTS')
  },
  methods: {
    getPosts () {
      this.$axios.get('http://localhost:8069/gestion/apirest/peliculas?data={"id":"' + this.$route.query.id + '"}')
        .then((res) => {
          this.src = ref(res.data.imagen)
          this.lorem = res.data.sinopsis
          this.dir = res.data.director
          console.log(res.data.director[0])
          this.ident = res.data.id
          this.pts = res.data.puntuacion
          this.titulo = res.data.nombre

          this.gen = res.data.genero
          this.genID = res.data.genID
          this.dirID = res.data.dirID
          this.tr = res.data.trailer
          console.log(res.data)
          this.puntua(res.data.puntuacion)
          console.log('puntos enviados ' + res.data.putuacion)
          this.recommend(this.genID, this.ident)
          this.comments(this.ident)

          // SUMAR UNA VISITA AL CARGAR LA PÁGINA
          this.$axios.get(
            'http://localhost:8069/editar/pelicula/' + this.ident + '/v/' + (res.data.visitas + 1)
          ).then(response => {
            console.log('Success ========>', response)
          })
            .catch(error => {
              console.log('Error ========>', error)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    recommend (genID, id) {
      this.$axios.get('http://localhost:8069/gestion/apirest/peliculas?data={"genero":' + genID + '}')
        .then((res) => {
          console.log('ee ' + res.data)

          // numero de recomendados
          let num = Math.floor(Math.random() * res.data.length)
          if (num !== id) {
            this.rcm0 = res.data[num]
            // console.log('num1 ' + num)
          } else {
            // console.log('num1 ' + num)

            this.rcm0 = res.data[num + 1]
            num = num + 1
          }
          console.log('REC 1 = ' + num)
          this.urlrcm0 = 'http://localhost:8080/film?id='.concat('', this.rcm0.id)

          let num2 = 0
          do {
            num2 = Math.floor(Math.random() * res.data.length)
            this.rcm1 = res.data[num2]
            // console.log('num2 ' + num2)
          } while ((num2 === num) || (num2 === id))
          // this.rcm1 = res.data[num + 2]
          let num3 = 0
          console.log('REC 2 = ' + num2)
          this.urlrcm1 = 'http://localhost:8080/film?id='.concat('', this.rcm1.id)

          do {
            num3 = Math.floor(Math.random() * res.data.length)
            this.rcm2 = res.data[num3]
            // console.log('num3 ' + num3)
          } while ((num3 === num) || (num3 === id) || (num3 === num2))
          console.log('REC 3 =' + num3)
          this.urlrcm2 = 'http://localhost:8080/film?id='.concat('', this.rcm2.id)
          console.log('recomendaciones ' + this.rcm0.id + ' ' + this.rcm1.nombre + ' ' + this.rcm2.nombre + ' ' + num + ' ' + num2 + ' ' + num3)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    withAtClick (id, oldPts) {
      const puntos = (this.ratingModel + oldPts) / 2
      document.getElementById('puntuacion').innerHTML = Math.round(puntos * 100) / 100

      this.$axios.get(
        'http://localhost:8069/editar/pelicula/' + id + '/p/' + Math.round(puntos * 100) / 100

      ).then(response => {
        console.log('Success ========>', response)
      })
        .catch(error => {
          console.log('Error ========>', error)
        })
    },
    puntua (pts) {
      console.log('puntos recibidos ' + pts)
      const ratingModel = ref(parseFloat(pts))

      return {
        ratingModel,

        resetModels () {
          ratingModel.value = 0
        }
      }
    },
    sesion () {
      const $q = useQuasar()
      const ses = $q.sessionStorage.getItem('user')
      console.log('Comprobando sesion: ' + ses)

      if (ses === 'undefined' || ses === '' || ses === null) {
        // document.location.href = 'http://localhost:8080/#/login'
        this.$router.push('login')
        console.log('NO SE HA INICIADO SESION')
      }
    },
    goTo (id, tipo) {
      // Here you can navigate to where ever you have to

      // this.$router.push('film?id=' + row.id)
      console.log('entra al goto ' + id + ' -- ' + tipo)
      if (tipo === 'p') {
        console.log('entra al p')
        // window.location.href = 'http://localhost:8080/#/film?id=' + id
        this.$router.push('/film?id=5')
        // this.$router.push('/film?id=' + id)
      } else if (tipo === 'd') {
        // window.location.href = 'http://localhost:8080/#/director?director=' + id
        this.$router.push('/director?director=' + id)
        // this.$router.push('/director?director=' + id)
      } else if (tipo === 'g') {
        // window.location.href = 'http://localhost:8080/#/genre?genre=' + id
        this.$router.push('/genre?genre=' + id)
        // this.$router.push('/genre?genre=' + id)
      }
      // window.location.reload()
    },
    comments (id) {
      this.$axios.get('http://localhost:8069/gestion/apirest/comentarios?data={"pelicula":' + id + '}')
        .then((res) => {
          console.log('1 ' + res)
          this.comentarios = res.data
          console.log('2 ' + this.comentarios)
          console.log('3 ' + this.comentarios[0].usuario)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit () {
      // console.log(URL.createObjectURL(this.portada))
      this.$axios.post('http://localhost:8069/gestion/apirest/comentarios?data={"id":"1","usuario":"' + 2 + '","pelicula":"' + this.ident + '","comentario":"' + this.comentario + '"}')
    }

  }

}

</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Smooch&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

#ptcn{
  font-size: 160%;
  color:#5bdede;
  text-shadow: #6600cc 0px 0px 3px;
}
#puntuacion{
  font-size: 250%;
  color:#fb93fc;
  text-shadow: #6600cc 0px 0px 1px;
}

#nombreP{
  position: absolute;
  left: 20%;
  font-size: 300%;
  font-family: 'Poiret One', cursive;
  color: #6600cc;
  text-shadow: 3px 3px 2px #fb93fc
  }

#sinop{
  font-family: 'Poiret One', cursive;
  font-size: 120%;
  color:#6600cc;

}

.etiq{
  font-family: 'Dancing Script', cursive;
  font-size: 130%;
  color: #ff33cc

}
.apart{
  font-family: 'Jost', cursive;
  font-size: 130%;
  color: #6600cc

}
.link{
    font-family: 'Poiret One', cursive;
    font-size: 120%;
    color:#6600cc;
    cursor: pointer;
}

div{
 border: 0px solid

}
</style>
