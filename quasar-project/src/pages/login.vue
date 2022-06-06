<template>
  <q-page>
<div id="q-app">
 <q-layout view="lHh Lpr fff">
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:540px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">{{ title}}</h4>

          </q-card-section>
          <q-card-section>
          <q-fab
          color="primary" @click="switchTypeForm"
          icon="add"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        >
          <q-tooltip>
Registro de nuevo usuario
        </q-tooltip>
        </q-fab>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                       ref="user"
                       square
                       clearable
                       v-model="user"
                       type="user"
                       lazy-rules

                       label="Usuario">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                        ref="username"
                        v-if="register"
                        square
                        clearable
                        v-model="username"
                        lazy-rules
                        :rules="[this.required,this.short]"
                       type="username"
                       label="Usuario">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                       ref="password"
                       square
                       clearable
                       v-model="password"
                       :type="passwordFieldType"
                       lazy-rules
                       :rules="[this.required,this.short]"
                       label="Contraseña">

                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
              <q-icon
                  :name="visibilityIcon"
                  @click="switchVisibility"
                  class="cursor-pointer" />
                </template>
              </q-input>
              <q-input
                  ref="repassword"
                  v-if="register"
                  square
                  clearable
                  v-model="repassword"
                  :type="passwordFieldType"
                  lazy-rules
                  :rules="[this.required,this.short,this.diffPassword]"
                  label="repite la contraseña">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
           <template v-slot:append>
          <q-icon
                 :name="visibilityIcon"
                 @click="switchVisibility"
                 class="cursor-pointer" />
          </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
                   unelevated
                   size="lg"
                   color="secondary"
                   @click="submit"
                   class="full-width text-white"
                   :label="btnLabel" />
          </q-card-actions>

        </q-card>
      </div>
    </div>

  </q-page>
      </q-layout>
 </div>

  </q-page>
</template>

<script>
// import { defineComponent } from 'vue'
// import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'dirInfo',
  el: '#q-app',
  setup () {
    const $q = useQuasar()
    $q.sessionStorage.set('user', '')
  },
  data: function () {
    return {
      title: 'Iniciar Sesión',
      user: '',
      username: '',
      password: '',
      repassword: '',
      register: false,
      passwordFieldType: 'password',
      btnLabel: 'Entrar',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },

  methods: {

    submit () {
      if (this.register) {
        this.$refs.user.validate()
        this.$refs.username.validate()
        this.$refs.password.validate()
        this.$refs.repassword.validate()
      } else {
        // this.$refs.user.validate()
        // this.$refs.password.validate()

        this.$axios.get('http://localhost:8069/gestion/apirest/usuarios?data={"nombre":"' + this.user + '","contrasenya":"' + this.password + '"}')
          .then((res) => {
            console.log(res.data)
            if (res.data === 'existe') {
              console.log('pasas')
              // document.location.href = 'http://localhost:8080/#/?user=' + this.user

              this.$router.push('/?user=' + this.user)
            } else {
              console.log('contraseña incorrecta')
            }
            this.u = res.data
            console.log('2 ' + this.u)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    switchTypeForm () {
      this.register = !this.register
      this.title = this.register ? 'Nuevo Usuario' : 'Autorización'
      this.btnLabel = this.register ? 'Registro' : 'Entrada'
    },
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    },
    sesion () {

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
