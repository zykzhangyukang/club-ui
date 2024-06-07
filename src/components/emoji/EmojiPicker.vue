<template>
    <transition name="fade">
        <div ref="box" class="emoticon-list-cover" v-if="show">
            <div class="emoticon-list">
                <div class="pic-item" v-for="(item, i) in emotionList" :key="i">
                    <img
                            :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + i + '.gif'"
                            @click="clickEmoticon(i)"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    export default {
        name: "EmotionPicker",
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                emotionList: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
                    '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
                    '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
                    '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
                    '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
                    '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
                    '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
                    '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
                    '激动', '街舞', '献吻', '左太极', '右太极'],
            };
        },
        methods: {
            clickEmoticon(emoticonNo) {
                this.$emit('select-emoticon', this.emotionList[emoticonNo]);
            },
        },
    }
</script>

<style scoped>
    .emoticon-list-cover {
        position: absolute;
        top: 36px;
        left: 0;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        user-select: none;
        -webkit-user-drag: none;
    }

    .emoticon-list {
        background: #ffffff;
        padding: 5px; /* 调整表情包间距 */
        border: 1px solid #eeeeee;
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(10, minmax(20px, 1fr)); /* 每行显示 10 个表情包 */
        gap: 5px; /* 调整表情包间距 */
        max-height: 150px; /* 增加最大高度 */
        overflow-y: auto;
    }

    .pic-item {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .pic-item img {
        width: 100%;
        height: 100%;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0;
    }

    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        cursor: pointer;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.15);
        transition: color 0.2s ease;
    }

</style>

