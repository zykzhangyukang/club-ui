<template>
    <div class="grid_wrapper">
        <div @click="goCreatePost">
<!--            <img class="icon" :src="require('@/assets/img/ft.png')" alt="发帖"  />-->
            <img class="icon" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/ft.png" alt="发帖"  />
            <span>发帖</span>
        </div>
        <div>
<!--            <img class="icon" :src="require('@/assets/img/qa.png')" alt="提问" />-->
            <img class="icon" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/qa.png" alt="提问" />
            <span>提问</span>
        </div>
        <div>
<!--            <img class="icon" :src="require('@/assets/img/wz.png')" alt="文章" />-->
            <img class="icon" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/wz.png" alt="文章" />
            <span>文章</span>
        </div>
        <div>
<!--            <img class="icon" :src="require('@/assets/img/ht.png')" alt="话题" />-->
            <img class="icon" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/ht.png" alt="话题" />
            <span>话题</span>
        </div>
        <div>
<!--            <img class="icon" :src="require('@/assets/img/qt.png')" alt="其他" />-->
            <img class="icon" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/qt.png" alt="其他" />
            <span>其他</span>
        </div>
        <div>
<!--            <img class="icon" :src="require('@/assets/img/gd.png')" alt="更多" />-->
            <img class="icon" src="https://ioss-bucket.oss-cn-shenzhen.aliyuncs.com/club/cdn/imgs/gd.png" alt="更多" />
            <span>更多</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CreateNav.vue",
        methods:{
            goCreatePost() {
                this.$router.push('/post/publish');
            },
        }
    };
</script>

<style scoped>
    .grid_wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #e4e6eb;
        margin-bottom: 10px;
        font-size: 11px;
        padding: 5px; /* 添加内边距，增加整体的空白 */
    }

    .grid_wrapper > div {
        flex: 0 0 calc(33.33% - 20px);
        margin: 5px;
        text-align: center;
        padding: 2px;
        cursor: pointer;
        border-radius: 5px;
    }
    .grid_wrapper > div:hover{
        transition: all 200ms;
        background: #f7f8fa;
    }

    .icon {
        width: 20px;
        height: 20px;
        margin-bottom: 5px; /* 图标底部留出一些空白 */
    }

    span {
        display: block;
    }
</style>
