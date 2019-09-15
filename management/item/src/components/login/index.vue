<template>
  <div class="login">
    <div class="login_b">
      <div class="border">
        <h2 style="text-align:center;margin-top:200px">elm后台管理系统</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm yan"
        >
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="ruleForm.user_name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login('ruleForm')">登陆</el-button>
          </el-form-item>
          <div class="msg">
            <div>温馨提示</div>
            <div>未登录过的新用户，自动注册</div>
            <div>注册过的用户可凭用户密码登录</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        user_name: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {


//http://cangdu.org:8001/admin/login
    login() {
		console.log(this.ruleForm)
		this.$axios({
			url:'http://cangdu.org:8001/admin/login',
			method:'post',
			data:this.ruleForm,
		}).then(res => {

			console.log(res)
			if(res.data.success) {
				alert(res.data.success)
        location.href='http://localhost:8080/#/manage'
			}else{
				this.open(res.data.success)
			}
			
		}) 
    }
  }
};
</script>

<style>
.login_b {
  width: 100%;
  height: 960px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  top: 300px;
}
.border {
  width: 500px;
  color: white;
  /* border: 1px solid red; */
}
.yan {
  padding: 30px 30px 30px 0px;
  background: white;
  border-radius: 10px;
}
.msg {
  color: red;
  font-size: 12px;
  padding-left: 30px;
  text-align: center;
}
</style>
