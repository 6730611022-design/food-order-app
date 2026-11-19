<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <div class="text-h5 col">เมนูอาหาร</div>
      <q-input v-model="search" dense outlined placeholder="ค้นหาเมนู..." style="width: 240px">
        <template #append><q-icon name="search" /></template>
      </q-input>
    </div>

    <q-inner-loading :showing="menu.loading" />

    <div class="row q-col-gutter-md">
      <div v-for="food in filtered" :key="food.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="full-height column">
          <q-img v-if="food.image" :src="food.image" :ratio="4 / 3" />
          <div v-else class="bg-grey-3 flex flex-center" style="height: 160px">
            <q-icon name="fastfood" size="48px" color="grey-6" />
          </div>
          <q-card-section class="col">
            <div class="text-subtitle1 text-weight-medium">{{ food.name }}</div>
            <div class="text-caption text-grey-7">{{ food.cuisine }}</div>
          </q-card-section>
          <q-card-actions>
            <div class="text-h6 text-deep-orange q-pl-sm">฿{{ food.price }}</div>
            <q-space />
            <q-btn color="deep-orange" icon="add_shopping_cart" label="เพิ่ม" no-caps @click="addToCart(food)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-if="!menu.loading && !filtered.length" class="text-center text-grey q-mt-xl">ไม่พบเมนู</div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useMenuStore } from '../stores/menu'
import { useCartStore } from '../stores/cart'

const $q = useQuasar()
const menu = useMenuStore()
const cart = useCartStore()
const search = ref('')

const filtered = computed(() =>
  menu.items.filter((f) => f.name.toLowerCase().includes(search.value.toLowerCase()))
)

function addToCart(food) {
  cart.add(food)
  $q.notify({ type: 'positive', message: `เพิ่ม ${food.name} ลงตะกร้าแล้ว`, timeout: 1000 })
}

onMounted(() => {
  if (!menu.items.length) menu.fetchMenu()
})
</script>
