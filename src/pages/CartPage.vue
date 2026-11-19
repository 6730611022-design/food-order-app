<template>
  <q-page padding style="max-width: 720px; margin: 0 auto">
    <div class="text-h5 q-mb-md">ตะกร้าของฉัน</div>

    <div v-if="!cart.items.length" class="text-center text-grey q-mt-xl">
      <q-icon name="remove_shopping_cart" size="64px" />
      <div>ยังไม่มีสินค้าในตะกร้า</div>
      <q-btn flat color="deep-orange" label="ไปเลือกเมนู" to="/menu" class="q-mt-md" />
    </div>

    <template v-else>
      <q-list bordered separator class="bg-white rounded-borders">
        <q-item v-for="item in cart.items" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>฿{{ item.price }} x {{ item.qty }} = ฿{{ item.price * item.qty }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row items-center">
              <q-btn flat round dense icon="remove" @click="cart.decrease(item.id)" />
              <div class="q-mx-sm">{{ item.qty }}</div>
              <q-btn flat round dense icon="add" @click="cart.increase(item.id)" />
              <q-btn flat round dense icon="delete" color="negative" class="q-ml-sm" @click="cart.remove(item.id)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row items-center q-mt-lg">
        <div class="text-h6 col">รวมทั้งหมด: ฿{{ cart.total }}</div>
        <q-btn color="deep-orange" icon="check" label="สั่งอาหาร" :loading="loading" @click="order" />
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const $q = useQuasar()
const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()
const loading = ref(false)

async function order() {
  loading.value = true
  try {
    await cart.checkout(auth.user?.id || 1)
    $q.notify({ type: 'positive', message: 'สั่งอาหารสำเร็จ!' })
    router.push('/menu')
  } catch (e) {
    $q.notify({ type: 'negative', message: 'สั่งอาหารไม่สำเร็จ ลองใหม่อีกครั้ง' })
  } finally {
    loading.value = false
  }
}
</script>
