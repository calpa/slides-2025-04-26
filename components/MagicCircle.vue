<template>
  <svg class="magic-circle" viewBox="0 0 380 380">
    <defs>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>


    <!-- 多層 concentric circle -->
    <circle
      v-for="radius in [120, 140, 160]"
      :key="radius"
      :cx="cx"
      :cy="cy"
      :r="radius"
      class="magic-circle-ring"
      :style="getCircleStyle(radius, 120, 160)"
      filter="url(#glow)"
    />


    <path
      v-for="index in count"
      :key="'star-' + index"
      :d="getStarPath(index - 1, count, 2)"
      class="magic-circle-connection"
      :style="getPathStyle(index)"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ currentClick: number }>();

const count = 6;
const radius = 160;
const cx = 190;
const cy = 190;

const getStarPath = (index: number, count: number, step: number) => {
  const angle1 = (2 * Math.PI * index) / count - Math.PI / 2;
  const angle2 = (2 * Math.PI * ((index + step) % count)) / count - Math.PI / 2;

  const x1 = cx + radius * Math.cos(angle1);
  const y1 = cy + radius * Math.sin(angle1);
  const x2 = cx + radius * Math.cos(angle2);
  const y2 = cy + radius * Math.sin(angle2);

  return `M${x1},${y1} L${x2},${y2}`;
};

const getPathStyle = (index: number) => {
  if (props.currentClick > index) {
    return { strokeOpacity: 1, };
  }
  return { strokeOpacity: 0.4, strokeDasharray: '3 5' };
};

const getCircleStyle = (radius: number, minRadius = 120, maxRadius = 160) => {
  const ratio = props.currentClick || 2;
 
  return {
    strokeOpacity: ratio / 6,
    stroke: '#93c5fd',
    // strokeDasharray: `${ratio} 5`
  }
}

</script>

<style scoped>
.magic-circle {
  @apply absolute inset-0 w-full h-full;
  overflow: visible;
}

.magic-circle-ring {
  fill: none;
  stroke: #cbd5e1; /* slate-300 */
  /* stroke-width: 1; */
}

.magic-circle-line {
  stroke: #94a3b8; /* slate-400 */
  stroke-dasharray: 2 6;
  stroke-width: 1;
}

.magic-circle-connection {
  stroke: #93c5fd; /* blue-400 */
  stroke-width: 1;
}
</style>