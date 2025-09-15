<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Loading } from "quasar";
import useUi from "../composables/useUi";
// import useAuth from 'src/modules/auth/composables/useAuth';
import MenuLg from "src/modules/settings/menuItems/components/MenuLg.vue";
// import { AuthRoutes } from 'src/modules/auth/interfaces/auth-routes';
import { useMenuUi } from "src/modules/settings/menuItems/composables/usMenuUi";

const { isDarkMode } = useUi();
const { toggleDrawer } = useMenuUi();
const router = useRouter();
// const { user, logout } = useAuth();
const search = ref(null);

Loading.hide("auth-login");
const isVisible = ref(false);
const scrollThreshold = 1500;

const isAnimating = ref(false);

const handleScroll = () => {
  if (window.scrollY > scrollThreshold) {
    if (!isVisible.value) {
      isVisible.value = true;
      isAnimating.value = true;
    }
  } else {
    if (isVisible.value) {
      isAnimating.value = false;
      setTimeout(() => {
        isVisible.value = false;
      }, 500);
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// const redirect = (route: string) => {
//   router.push({
//     name: route,
//   });
// };

// const logoutUser = () => {
//   logout();
//   redirect(AuthRoutes.LOGIN);
// };

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
const revealActive = ref(true);
const hookCleanup = router.beforeEach(() => {
  revealActive.value = false;
  nextTick(() => {
    revealActive.value = true;
  });
});

onBeforeUnmount(() => {
  hookCleanup();
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header :reveal="revealActive" bordered height-hint="75">
      <q-toolbar :class="isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'">
        <q-btn flat dense round icon="sym_r_menu" @click="toggleDrawer" class="q-mr-md" />
        <template v-if="$q.platform.is.mobile">
          <q-img src="svg/isologo-color.png" height="26px" fit="contain" no-spinner />
        </template>
        <template v-else>
          <q-img
            src="images/svg/logo-b.svg"
            height="26px"
            width="144px"
            fit="contain"
            no-spinner
          />
        </template>
        <q-space />

        <div class="row justify-end q-gutter-sm">
          <q-input
            rounded
            standout="border-color-primary"
            dense
            v-model="search"
            placeholder="Buscar..."
            clearable
            style="width: 350px"
          />
          <q-btn flat color="white" icon="sym_r_add" label="Crear publicación" />
          <q-btn round>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-menu
              dark
              auto-close
              fit
              anchor="bottom right"
              self="top right"
              :offset="[0, 10]"
              class="q-pa-md"
            >
              <div class="row items-center q-pa-sm q-gutter-sm">
                <q-avatar size="32px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="column">
                  <span class="text-body2">John Doe</span>
                  <span class="text-tiny text-primary">Miembro</span>
                </div>
              </div>

              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="primary" name="sym_r_logout" size="xs" />
                  </q-item-section>
                  <q-item-section>Cerrar sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn flat color="primary" class="bg-primary" label="Iniciar sesión" />
          <!-- <div class="col-12 ellipsis">
            <q-btn no-caps flat :label="user.email">
              <q-menu auto-close>
                <q-list style="min-width: 100px">
                  <q-item clickable @click="logoutUser">
                    <q-item-section>Cerrar sesión</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="col-12 text-caption">{{ user?.Profile?.name }}</div> -->
        </div>
      </q-toolbar>
    </q-header>
    <MenuLg />

    <q-page-container>
      <div style="max-width: 1600px; margin: 0 auto">
        <router-view />
        <transition>
          <q-btn
            v-if="isVisible"
            @click="scrollToTop"
            class="scroll-to-top fixed q-pa-sm"
            icon="sym_r_keyboard_arrow_up"
            round
            color="primary"
          />
        </transition>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.q-item__label {
  line-height: 3em !important;
}

.q-img__content > div {
  background: rgb(58 89 234 / 70%);
}

.scroll-to-top {
  bottom: 60px;
  right: 30px;
  z-index: 999;
  opacity: 0.5;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
