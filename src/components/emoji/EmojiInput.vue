<template>
  <div class="emoji-input-wrapper">
    <Input ref="refInput" v-bind="$attrs" v-model="internalValue" style="width: 100%">
      <template v-for="(_, name) in $slots" :key="name" #[name]="scopeData">
        <slot :name="name" v-bind="scopeData"></slot>
      </template>
      <template #prefix>
        <Icon type="md-happy" @click.stop="toggleEmojiPicker" class="toggle-emoji-picker" />
      </template>
    </Input>
    <EmotionPicker :show="showEmojiPicker" @select-emoticon="addEmoji" @show="show" />
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
        if (v) {
          this.$nextTick(() => {
            this.focusInput();
          });
        }
      },
      toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (this.showEmojiPicker) {
          this.$nextTick(() => {
            this.focusInput();
          });
        }
      },
      addEmoji(emoji) {
        const input = this.$refs.refInput.$el.querySelector('input');
        const start = input.selectionStart;
        const end = input.selectionEnd;

        this.internalValue =
                this.internalValue.substring(0, start) +
                `[${emoji}]` +
                this.internalValue.substring(end);

        this.$nextTick(() => {
          input.selectionStart = input.selectionEnd = start + `[${emoji}]`.length;
          this.focusInput();
        });
      },
      focusInput() {
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
