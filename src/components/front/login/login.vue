<template>
    <div class="wrapper">
        <h2 class="login-title">bsbw Login</h2>
        <div class="login">
            <div>
                <input type="text" placeholder="请输入你的账号" v-model="username">
            </div>
            <div>
                <input type="password" placeholder="请输入你的密码" v-model="password" @keydown.enter="confirm">
            </div>
        </div>
        <!--<div class="remember">
            <input type="checkbox" v-model="remember">
            <span>remember me</span>
            
        </div>-->
        <span class="login-btn" @click="confirm"><a href="javascript:void(0)">Sign in</a></span>
        <p class="info">{{ info }}</p>
    </div>
</template>


<script>
import axios from 'axios';
import md5 from '@/api/md5';
export default {
    data () {
        return {
            username: '',
            password: '',
            info: ''
            // 密码和用户名不一致
        }
    },
    methods: {
        confirm () {
            const _this = this;
            let username = this.username,
                password = this.password,
                remember = this.remember;
                console.log(this.password);
                //  console.log(md5(this.password));
                console.log(username);
            console.log(!username);
            console.log(password);
            console.log(!password);
            if (!username || !password) {
                this.info = '请输入用户名或者密码~';
            } else {
                let formData = {
                    username,
                    password: md5(this.password),
                    remember,
                }
                axios.post('/user/signin', formData)
                    .then((res) => {
                        _this.info = res.data.message;
                        console.log('res = ', res);
                        // window.location = "/";
                        if (res.data.success) {
                            window.location = "/";
                        }
                    })
                    .catch((err) => {
                        console.log('err = ', err);
                    })
            }

            
            
        }
    },
    watch: {
        name() {
            this.info = ''
        },
        password () {
            this.info = ''
        }
    }
}
</script>
<style lang="scss">
a {
    text-decoration: none;
}
body {
    // background-color: #eee;
}
.wrapper {
    position: relative;
    width: 258px;
    margin: 200px auto;
    padding: 50px;
    padding-bottom: 30px; 
    // border: 3px solid #555;
    background-color: #eee;
    .login-title {
        text-align: center;
    }
    .login {
        width: 258px;
        // background-color: #eee;
        // margin: 112px auto 0;
        text-align: center;
        div {
            width: 100%;
            margin: 0 auto;
        }
        input {
            display: block;
            width: 238px;
            height: 30px;
            margin-top: 30px;
            margin-bottom: 20px;
            margin-left: 10px;
            border: none;
            border-bottom: 3px solid #999;
            padding-left: 10px;
            outline: none;
            border-radius: 10%;
            background-color: transparent;
            font-size: 16px;
        }
    }
    .remember {
        padding-left: 20px;
        height: 30px;
        input {
            vertical-align: middle;
        }
    }
    .login-btn {
        display: block;
        height: 30px;
        text-align: right;
        a {
            font-size: 18px;
            color: #333;
            font-weight: bold;
            
        } 
    }
    .info {
        margin: 0;
        padding-left: 20px;
        color: #f40;
        font-size: 14px;

    }
}
@media screen and (max-width: 440px) {
    .login {
        margin-top: 2rem !important;
    }
}
</style>


