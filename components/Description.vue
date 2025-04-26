<template>
  <Transition>
    <div class="description" 
        :class="getDescriptionClass()"
    :style="getDescriptionStyle(position)" v-if="sharedState.clicks > (showAfterClick || 0)">
      <div
        v-for="(text, index) in texts"
        :key="index"
        class="text"
      >
        {{ text }}
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { sharedState } from "@slidev/client";
import { computed } from 'vue'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const props = defineProps<{ texts: string[]; position: Position, showAfterClick?: number, shortText?: boolean }>();

const currentClick = computed(() => sharedState.clicks || 0)

const getDescriptionStyle = (position: Position) => {
  const rhs = props.showAfterClick + 1

  if (currentClick.value > rhs) {
    const style: Record<string, string> = { transform: 'translate(0, 0)' }
    if (position.includes('top')) style.top = '2%'
    if (position.includes('bottom')) style.bottom = '2%'
    if (position.includes('left')) style.left = '2%'
    if (position.includes('right')) style.right = '2%'
    return style
  }

  const isTop = position.includes('top')
  const isLeft = position.includes('left')

  return {
    top: isTop ? '60%' : undefined,
    bottom: !isTop ? '50%' : undefined,
    left: isLeft ? '50%' : undefined,
    right: !isLeft ? '50%' : undefined,
    transform: `translate(${isLeft ? '-50%' : '50%'}, ${isTop ? '-50%' : '50%'})`
  }
}

const getDescriptionClass = () => {
    if (props.shortText) {
        return 'short'
    }
    return '';
//   if (currentClick.value > props.showAfterClick + 1) {
//     return 'description'
//   }
//   return 'description short'
}
</script>

<style scoped>
.description {
  @apply absolute w-70 text-sm text-gray-500 bg-gray-100 flex flex-col gap-1 rounded;
  @apply p-4 z-20 shadow-xl transition-all duration-500 ease-in;
}

.short {
  @apply w-48;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
