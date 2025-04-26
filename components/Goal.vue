<template>
  <h1 v-if="sharedState.clicks === 0 && sharedState.page === slide" class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" style="color: #93c5fd;">設計師的個人網站</h1>

  <div v-clicks class="flex flex-col items-center justify-center h-full">
    <SDLCFlow isClickable :slide="slide" />
  </div>
</template>
<script lang="ts" setup>
import { sharedState } from "@slidev/client";

defineProps<{ isClickable?: boolean, slide: number }>();
</script>
