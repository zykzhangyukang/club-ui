<template>
  <div class="emoji-input-wrapper">
    <Input ref="refInput" v-bind="$attrs" v-model="internalValue" style="width: 100%">
      <template v-for="(_, name) in $slots" :key="name" #[name]="scopeData">
        <slot :name="name" v-bind="scopeData"></slot>
      </template>
      <template #prefix>
        <Icon type="md-happy" @click.stop="showEmojiPicker = !showEmojiPicker" class="toggle-emoji-picker" />
      </template>
    </Input>
    <EmotionPicker :show="showEmojiPicker" @select-emoticon="addEmoji" @show="show"  />
  </div>
</template>


<script>
  import EmotionPicker from './EmojiPicker.vue';

  export default {
    name: 'EmojiInput',
    props: {
      modelValue: String
    },
    components: {
      EmotionPicker,
    },
    data() {
      return {
        internalValue: this.modelValue || "",
        showEmojiPicker: false,
      };
    },
    watch: {
      modelValue(val) {
        this.internalValue = val;
      },
      internalValue(val) {
        this.$emit('update:modelValue', val);
      },
    },
    methods: {
      show(v) {
        this.showEmojiPicker = v;
      },
      addEmoji(emoji) {
        this.internalValue += `[${emoji}]`;
      },
      focusInput(){
        this.$refs.refInput.focus();
      },
    },
  };
</script>

<style scoped>
  .emoji-input-wrapper {
    position: relative;
  }

  .toggle-emoji-picker {
    cursor: pointer;
  }
</style>
