<template>
  <Description :texts="productRequirementText" position="top-left" :showAfterClick="0"/>
  <Description :texts="systemRequirementText" position="top-right" :showAfterClick="1"/>
  <Description :texts="developmentText" position="bottom-right" :showAfterClick="2"
    :shortText="true"
  />
  <Description :texts="deploymentText" position="bottom-left" :showAfterClick="4"
    :shortText="true"
  />

<div class="sdlc-flow">
    <!-- SDLC Stages -->
    <div
      v-for="(stage, index) in stages"
      :key="stage.label"
      class="stage slidev-vclick-target"
      :style="getPosition(index, slide)"
      v-click
    >
      <span class="icon">{{ getStageIcon(index, slide) }}</span>
      <span class="label">{{ getStageLabel(index, slide) }}</span>
    </div>

    <MagicCircle :currentClick="currentClick" :slide="slide"/>
  </div>
</template>

<script setup lang="ts">
import { sharedState } from '@slidev/client'
import { computed } from 'vue'

defineProps<{ isClickable?: boolean, slide: number }>();

const currentClick = computed(() => sharedState.clicks || 0)

const r = 140;
const cx = 190;
const cy = 190;

const stages = [
  { icon: '🔍', label: '需求分析' },
  { icon: '📐', label: '系統設計' },
  { icon: '🧑‍💻', label: '程式開發' },
  { icon: '🧪', label: '測試驗證' },
  { icon: '🚀', label: '部署上線' },
  { icon: '🔁', label: '維運改善' },
];

const productRequirementText = [
  // "讓訪客能快速理解設計師的專長、過往作品以及聯絡方式",
  "整體風格需偏向現代、極簡、留白感，主色調為深藍與淺灰",
  // "文字需清晰可讀、適合行動裝置觀看",
  "首頁 Hero 區塊，包含一句標語，設計師頭像、簡介文字與 CTA 按鈕",
  "作品集頁面：需支援多張圖片展示，提供 hover 展開說明的互動設計",
  "關於我頁面：簡介、設計理念、自我介紹段落，搭配一張設計師工作情境照",
  "聯絡表單頁：包含姓名、Email、需求簡述與提交按鈕，自架 Form 送信",
];

const systemRequirementText = [
  '🖥️ 前端：Astro + Tailwind + React.js',
  '🛠️ 後端：Supabase 提供資料儲存',
  '🚀 部署：Netlify'
];

const developmentText = [
  "VS Code",
  "Bolt.new"
]

const deploymentText = [
  "Netlify",
  "Cloudflare",
  "Github Pages"
]

const MAX_CLICKS = 7;

const getStageIcon = (index: number, slide: number) => {
  if (currentClick.value > MAX_CLICKS || sharedState.page !== slide) {
    return '🤖';
  }

  return stages[index].icon;
};

const getStageLabel = (index: number, slide: number) => {
  if (currentClick.value > MAX_CLICKS || sharedState.page !== slide) {
    return 'Bolt.new';
  }

  return stages[index].label;
};

const getPosition = (index: number, slide: number) => {
  if (currentClick.value > MAX_CLICKS || sharedState.page !== slide) {
    const x = cx - 48;
    const y = cy - 48;

    return { left: `${x}px`, top: `${y}px` };
  }

  const angle = (2 * Math.PI * index) / stages.length - Math.PI / 2;
  const x = cx + r * Math.cos(angle) - 48;
  const y = cy + r * Math.sin(angle) - 48;
  return { left: `${x}px`, top: `${y}px` };
};
</script>

<style>
.sdlc-flow {
  @apply relative w-[380px] h-[380px] mx-auto;
}

.stage {
  @apply absolute flex flex-col items-center justify-center w-[96px] h-[96px] rounded-full text-gray-800 text-sm text-center p-1 shadow-sm transition-all duration-300 ease-in-out z-10;
}

.stage.slidev-vclick-prior {
  @apply bg-[#93c5fd];
}

.stage .icon {
  @apply text-2xl;
}

.stage .label {
  @apply text-sm text-slate-800;
}

.stage.slidev-vclick-current {
  @apply bg-green-400 text-white font-bold scale-110;
}

.arrows {
  @apply absolute inset-0 w-full h-full;
  overflow: visible;
}

.arrows circle {
  @apply stroke-slate-300 stroke-dashed;
  transition: fill 0.5s ease;
}

.arrows path {
  @apply stroke-blue-500 stroke-2 opacity-0 transition-opacity duration-300 ease-in-out;
}

.arrows path.slidev-vclick-prior {
  @apply opacity-100;
}
</style>