<template>
  <div>
    <slot name="header"></slot>
    <div>-----</div>
    <slot name="con"></slot>
    <div>--------------------------------------------------</div>
    <div>这是myChildSon</div>
    <div class="myChild">
      <div>count: {{state.count}}</div>
      <div >injectA: {{injectA}}  <el-input type="text" v-model="injectA" /> ---------- <el-button type="primary" @click="bindEdit">修改provide</el-button> </div>
      <div>prpos: {{prpos.modelValue}}</div>
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
  dialogVisible: false,
  color: 'red'
})
const prpos = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
let injectA = inject('provideA');
let editProvideA = inject('editProvideA');
const bindEdit = () => {
  editProvideA('443353');
}

const emits = defineEmits(['update:modelValue'])

const changUpdate = () => {
  emits('update:modelValue', 'vvvvvvv');
  console.log(34324);
}

defineExpose({
  changUpdate,
  state
})
</script>

<style lang="scss" scoped>
.myChild {
  color: v-bind('state.color')
}
</style>
