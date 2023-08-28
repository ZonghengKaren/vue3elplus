<template>
    <div class="elForm">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
            <el-form-item label="Password" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" clearable/>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
                <el-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                    clearable
                />
            </el-form-item>
            <el-form-item label="Age" prop="age">
                <el-input v-model.number="ruleForm.age" clearable/>
            </el-form-item>

            <!--自定义组件-->
            <ClassInfo></ClassInfo>
            <ClassInfo2></ClassInfo2>

            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                >Submit
                </el-button
                >
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import ClassInfo from '@/components/form/ClassInfo.vue';
import ClassInfo2 from '@/components/form/ClassInfo2.vue';
const ruleFormRef = ref(null);

const checkAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
    option1: '',
    name: '',
})

const rules = reactive({
    pass: [{validator: validatePass, trigger: 'blur'}],
    checkPass: [{validator: validatePass2, trigger: 'blur'}],
    age: [{validator: checkAge, trigger: 'blur'}],
    option1: [{
        required: true,
        message: '班级不能为空',
        trigger: 'change',
    },],
})
provide('ruleForm', ruleForm);
const submitForm = (formEl) => {
    console.log(ruleForm);
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>
<style lang="less">
  .el-form {
      text-align: left;
  }
</style>