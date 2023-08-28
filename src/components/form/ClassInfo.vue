<template>
    <el-form-item label="信息" prop="option1">
        <el-select v-model="ruleForm.option1" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input style="width: 200px;margin-left: 10px;" v-model="ruleForm.name" clearable />
    </el-form-item>
</template>
<script setup>
    let ruleForm = inject('ruleForm');
    let options = [];
    setTimeout(() => {
        options = [
            {
                value: 'Option1',
                label: '一班',
            },
            {
                value: 'Option2',
                label: '二班',
                disabled: true,
            },
            {
                value: 'Option3',
                label: '三班',
            },
            {
                value: 'Option4',
                label: '四班',
            },
            {
                value: 'Option5',
                label: 'Option5',
            },
        ]
    }, 10)

</script>
<style scoped>
</style>