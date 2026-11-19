<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <div class="text-h5 col">จัดการเมนูอาหาร</div>
      <q-btn color="deep-orange" icon="add" label="เพิ่มเมนู" no-caps @click="openAdd" />
    </div>

    <q-table :rows="menu.items" :columns="columns" row-key="id" :loading="menu.loading" flat bordered>
      <template #body-cell-actions="props">
        <q-td align="right">
          <q-btn flat round dense icon="edit" color="primary" @click="openEdit(props.row)" />
          <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showDialog">
      <q-card style="width: 400px">
        <q-card-section class="text-h6">{{ editId ? 'แก้ไขเมนู' : 'เพิ่มเมนู' }}</q-card-section>
        <q-card-section>
          <q-input v-model="form.name" label="ชื่อเมนู" outlined class="q-mb-md" />
          <q-input v-model="form.cuisine" label="ประเภท/อาหารชาติ" outlined class="q-mb-md" />
          <q-input v-model.number="form.price" type="number" label="ราคา (บาท)" outlined class="q-mb-md" />
          <q-input v-model="form.image" label="URL รูปภาพ (ไม่บังคับ)" outlined />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ยกเลิก" v-close-popup />
          <q-btn color="deep-orange" label="บันทึก" :loading="saving" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useMenuStore } from '../stores/menu'

const $q = useQuasar()
const menu = useMenuStore()

const columns = [
  { name: 'name', label: 'ชื่อเมนู', field: 'name', align: 'left', sortable: true },
  { name: 'cuisine', label: 'ประเภท', field: 'cuisine', align: 'left' },
  { name: 'price', label: 'ราคา', field: 'price', align: 'right', sortable: true },
  { name: 'actions', label: '', field: 'actions' }
]

const showDialog = ref(false)
const saving = ref(false)
const editId = ref(null)
const emptyForm = () => ({ name: '', cuisine: '', price: 0, image: '' })
const form = ref(emptyForm())

function openAdd() {
  editId.value = null
  form.value = emptyForm()
  showDialog.value = true
}

function openEdit(row) {
  editId.value = row.id
  form.value = { name: row.name, cuisine: row.cuisine, price: row.price, image: row.image }
  showDialog.value = true
}

async function save() {
  if (!form.value.name.trim()) {
    $q.notify({ type: 'warning', message: 'กรุณากรอกชื่อเมนู' })
    return
  }
  saving.value = true
  try {
    if (editId.value) await menu.updateItem(editId.value, form.value)
    else await menu.addItem(form.value)
    $q.notify({ type: 'positive', message: 'บันทึกสำเร็จ' })
    showDialog.value = false
  } catch (e) {
    $q.notify({ type: 'negative', message: 'บันทึกไม่สำเร็จ' })
  } finally {
    saving.value = false
  }
}

function confirmDelete(row) {
  $q.dialog({ title: 'ลบเมนู', message: `ต้องการลบ "${row.name}" ใช่ไหม?`, cancel: true }).onOk(async () => {
    try {
      await menu.removeItem(row.id)
      $q.notify({ type: 'positive', message: 'ลบแล้ว' })
    } catch (e) {
      $q.notify({ type: 'negative', message: 'ลบไม่สำเร็จ' })
    }
  })
}

onMounted(() => {
  if (!menu.items.length) menu.fetchMenu()
})
</script>
