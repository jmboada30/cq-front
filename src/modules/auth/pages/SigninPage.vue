<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { version } from '../../../../package.json';
import LogoImage from '../../shared/components/BlueLogoImage.vue';
import useValidators from '../../shared/composables/useValidators';
import useAuth from '../composables/useAuth';
import useUi from 'src/modules/start/composables/useUi';

const isPwd = ref(true);
const { loginForm, login, getLoginFormFromLocalStore } = useAuth();
const { isRequired, isPassword, isEmail } = useValidators();
const { isDarkMode } = useUi();
const onSubmit = () => login();

onMounted(() => {
  const resp = getLoginFormFromLocalStore();
  if (resp) loginForm.value = resp;
});
</script>

<template>
  <q-page-container :class="isDarkMode ? 'bg-dark' : 'bg-white'">
    <q-page class="q-px-md row items-center justify-center">
      <main id="mainStyle" class="col-11 col-sm-6">
        <q-card flat>
          <q-card-section class="text-center column items-center justify-center">
            <LogoImage />
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="column q-gutter-y-sm">
              <q-input
                dark
                v-model="loginForm.email"
                standout
                color="dark"
                lazy-rules
                type="email"
                label="Correo electrónico"
                :rules="[isRequired, isEmail]"
              />

              <q-input
                v-model="loginForm.password"
                dark
                standout
                color="dark"
                label="Contraseña"
                :type="isPwd ? 'password' : 'text'"
                :rules="[isRequired, isPassword]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'sym_r_visibility_off' : 'sym_r_visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <section class="q-mt-none">
                <q-checkbox
                  v-model="loginForm.remember"
                  color="secondary"
                  label="Recordar mis datos"
                />
              </section>

              <label class="column">
                <q-btn label="Ingresar" type="submit" color="primary" />
              </label>
            </q-form>
          </q-card-section>
        </q-card>
      </main>
      <div class="absolute-bottom-right q-pr-md q-pb-sm">
        <span class="text-subtitle2 text-weight-light opacity"> v{{ version }} </span>
      </div>
    </q-page>
  </q-page-container>
</template>

<style scoped>
.opacity {
  opacity: 0.5;
}
#mainStyle {
  max-width: 400px;
}
</style>
