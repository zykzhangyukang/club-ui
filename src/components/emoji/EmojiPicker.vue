<template>
    <div>
        <transition name="fade">
            <div class="emoticon-list-cover" v-if="show">
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
    </div>
</template>

<script>
    import { emotionList } from './emojiParser.js';

    export default {
        name: "EmotionPicker",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                emotionList
            };
        },
        methods: {
            clickEmoticon(emoticonNo) {
                this.$emit('select-emoticon', this.emotionList[emoticonNo]);
            },
            clickOutSide(e) {
                if (!this.$el.contains(e.target)) {
                    this.$emit('show', false);
                }
            }
        },
        mounted() {
            document.addEventListener("click", this.clickOutSide);
        },
        beforeUnmount() {
            document.removeEventListener("click", this.clickOutSide);
        }
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
