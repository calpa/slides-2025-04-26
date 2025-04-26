<!-- global-bottom.vue -->
<template>
    <footer class="absolute w-full flex bottom-0 items-end justify-between z-[9999]">
        <div class="flex items-center flex-row">
            <div v-for="item in links" :key="item.text" class="text-center">
                <div class="p-2 text-slate-400 text-sm">{{ item.text }}</div>
                <img :src="item.qrcodeImage" class="w-18 h-18 p-2" alt="QR Code" />
            </div>
        </div>
        <div class="p-2 text-slate-400 text-sm">Calpa Liu</div>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
const { currentPage } = useNav()

const bgColor = computed(() => currentPage.value === 1 ? 'e2e8f0' : 'ffffff')

const qrcodeBase = computed(() => `https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=${bgColor.value}`)

const links = computed(() => {
    return [
    {
        text: '互動筆記',
        qrcodeImage: `${qrcodeBase.value}&data=https://pad.riseup.net/p/Wz657VgFwWQKEcIjhhT4`
    },
    {
        text: '簡報',
        qrcodeImage: `${qrcodeBase.value}&data=https://slides-bolt-new.calpa.me/`
    }
    ]
})
</script>