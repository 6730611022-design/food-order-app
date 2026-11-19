<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-deep-orange-7">
      <q-toolbar>
        <q-icon name="restaurant" size="sm" class="q-mr-sm" />
        <q-toolbar-title>Food Order</q-toolbar-title>

        <q-btn flat no-caps icon="restaurant_menu" label="เมนู" to="/menu" />
        <q-btn flat no-caps icon="shopping_cart" label="ตะกร้า" to="/cart">
          <q-badge v-if="cart.count" color="yellow" text-color="black" floating>{{ cart.count }}</q-badge>
        </q-btn>
        <q-btn flat no-caps icon="settings" label="จัดการเมนู" to="/admin" />
        <q-btn flat no-caps icon="logout" label="ออก" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
