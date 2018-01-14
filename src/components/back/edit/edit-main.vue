<template>
    <div>
        <!-- 头部导航栏nav -->
        <editNav :current="current"></editNav>
        <!-- 编辑页面body -->
        <editBody></editBody>
    </div>
</template>

<script>
import editNav from '../../common/nav';
import editBody from './edit-body';
export default {
    data () {
        return {
            // 控制nav的当前显示的是哪一项，感觉方法很low
            current: {
                write: true
            }
        }
    },
    components: {
        editNav,
        editBody
    }
}
</script>

<style lang="scss">

</style>
