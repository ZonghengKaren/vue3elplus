<template>
  <div>
    <div>这是myChildSon</div>
    <div class="myChild">
      <div>count: {{state.count}}</div>
      <div @click="changUpdate">使用update 修改父级数据</div>
    </div>

    <div>--------------------------------------------------</div>
    <el-button text @click="state.dialogVisible = true">
      click to open the Dialog  | {{state.dialogVisible}}
    </el-button>
    <el-dialog
        v-model="state.dialogVisible"
        title="Tips"
        width="30%"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="state.dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
const state = reactive({
  count:1,
  data: {
    a: '222'
  },
  arr:[3333],
  dialogVisible: false
})

const emits = defineEmits(['update:changesyncData'])

const changUpdate = () => {
  emits('update:changesyncData', 'vvvvvvv');
  console.log(34324);
}

defineExpose({
  changUpdate,
  state
})
</script>

<style lang="scss" scoped>

</style>
