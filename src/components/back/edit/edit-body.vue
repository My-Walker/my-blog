<template>
    <div>
        <!-- 文章标题编辑 -->
        <input type="text" v-model="title" class="article-title" placeholder="文章标题">
        <!-- 文章内容编辑器（百度的ueditor） -->
        <script id="editor" type="text/plain" style="height: 500px;width: 100%;"></script>
        <!-- 提交 -->
        <button @click="saveArticle">提交</button>
    </div>
</template>

<script>
import axios from 'axios';
import getAbstract from '@/api/abstract';
import format from '@/api/format.js'
export default {
    mounted () {
        const _this = this;
        // 编辑器实例化
        this.editor = this.editor.getEditor('editor');
        // pug模板传递的参数
        this.id = window.id;
        // 根据传递的参数获取对应文章，id==0代表写文章，否则为文章浏览
        if (this.id !== '0') {
            axios.get('./api/getArticleById', {
                params: {
                    id: this.id
                }
            })
            .then((res) => {
                console.log('res = ', res.data.data);
                let data = res.data.data;
                this.editor.addListener("ready", function () {
                    _this.editor.setContent(data.content); // 确保UE加载完成后，放入内容。
                    _this.title = data.title;
                    _this.article = data;
                });
            })
            .catch((err) => {
                console.log('err = ', err);
            })
        }
        
    },
    data () {
        return {
            // 编辑器实例
            editor: UE,
            id: '',
            title: '',
            article: ''
        }
    },
    methods: {
        // 保存文章的方法
        saveArticle () { 
            // 获取内容方法
            let content = this.editor.getContent();
            // 请求参数生成   
            let params = {
                id: this.id,
                title: this.title,
                content: content,
                intro: getAbstract(content),
                post_time: this.article || format(new Date(), "yyyy-MM-dd hh:mm:ss"),
                update_time: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
            };
            // 保存编辑后的文章
            axios.post('/api/saveArticle', params)
            .then((res) => {
                console.log('saveRes = ', res);
                if (res.data.success) {
                    alert('保存成功');
                    // 保存成功后跳转到首页，知道不合理，但。。。。你懂得，比较懒=。=
                    window.location = "http://localhost:3000/"
                }
            })
            .catch((err) => {
                console.log('saveErr = ', err);
            })
        }
    }
}
</script>

<style lang="scss">
.article-title {
    display: block;
    height: 30px;
    width: 100%;
    margin-top: 25px;
    padding-left: 1em;
    // outline: none;
    font-size: 20px;
    font-weight: bold;
}
#editor {
    // margin: 0 auto;
    margin-top: 25px;
}
</style>
