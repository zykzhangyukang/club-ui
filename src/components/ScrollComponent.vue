<template>
    <div class="scroll-component">
        <button @click="scrollToTop" class="scroll-button">
            <Icon type="ios-arrow-up" />
        </button>
        <button @click="scrollToBottom" class="scroll-button">
            <Icon type="ios-arrow-down" />
        </button>
    </div>
</template>

<script>
    export default {
        name: 'ScrollComponent',
        methods: {
            scrollToTop() {
                this.scrollTop(0);
            },
            scrollToBottom() {
                const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                this.scrollTop(scrollHeight);
            },
            scrollTop(offset) {
                document.body.scrollTop = offset;
                document.documentElement.scrollTop = offset;
            }
        }
    }
</script>

<style scoped>
    .scroll-component {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .scroll-button {
        padding: 10px;
        font-size: 24px;
        background-color: #000;
        opacity: 0.5;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff; /* 自定义图标颜色 */
    }

    .scroll-button:hover {
        transform: scale(1.1);
    }

    .scroll-button:active {
        transform: scale(0.95);
    }
</style>
