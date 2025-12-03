<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
<!-- 
      <div class="q-pa-md column q-gutter-sm">
        <q-btn color="primary" label="Record" to="/record" />

      </div> -->

      <router-view />

    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>