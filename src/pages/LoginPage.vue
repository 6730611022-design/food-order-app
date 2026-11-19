<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-orange-1">
        <q-card style="width: 360px" class="q-pa-md">
          <q-card-section class="text-center">
            <q-icon name="ramen_dining" size="64px" color="deep-orange" />
            <div class="text-h6">เข้าสู่ระบบ</div>
        <div class="text-caption text-grey-7">Username admin</div>
        <div class="text-caption text-grey-7">Password 123456</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="username" label="Username" outlined class="q-mb-md" />
            <q-input v-model="password" label="Password" type="password" outlined @keyup.enter="onLogin" />
          </q-card-section>

          <q-card-actions>
            <q-btn label="Login" color="deep-orange" class="full-width" :loading="loading" @click="onLogin" />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const username = ref('admin')
const password = ref('123456')
const loading = ref(false)

async function onLogin() {
  loading.value = true
  try {
    await auth.login(username.value, password.value)
    $q.notify({ type: 'positive', message: 'เข้าสู่ระบบสำเร็จ' })
    router.push(route.query.redirect || '/menu')
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Username หรือ Password ไม่ถูกต้อง' })
  } finally {
    loading.value = false
  }
}
</script>
