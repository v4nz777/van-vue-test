<template>
    <ul class="max-h-[300px] overflow-y-auto" ref="scrollableDiv">
       
        <li v-for="comment in comments">
            <div class="chat  text-xs" :class="comment.by===peoplestore.me.guid?'chat-start':'chat-end'">
                <div class="chat-image">
                    <div class="tooltip" :data-tip="peoplestore.getPersonById(comment.by)?.first">
                        <div class="w-10 h-10 text-lg rounded-full flex font-bold items-center justify-center bg-yellow-300">
                            <span >{{ peoplestore.getPersonById(comment.by)?.guid }}</span>
                        </div>
                    </div>
                </div>
                <div class="chat-bubble">{{ comment.comment }}</div>
                <p class="chat-footer opacity-50 text-xs" v-if="comment.date">{{ formatDate(comment.date) }}</p>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import type { Comment } from '../types.ts'
    import { usePeopleStore } from '../stores/people'
    import { formatDate } from '../utils/dates'
    import { ref,onMounted,watch, nextTick } from 'vue'

    const props = defineProps<{
        comments?: Comment[]|null
    }>()

    const peoplestore = usePeopleStore()


    const scrollableDiv = ref<HTMLDivElement|null>(null)

    function scrollToLatestChat() {
        if (!scrollableDiv.value) return
        scrollableDiv.value.scrollTop = scrollableDiv.value?.scrollHeight;
    }

    onMounted(()=>{
        scrollToLatestChat()
    })

    watch(()=>props.comments,async()=>{
        await nextTick()
        scrollToLatestChat()
    },{deep:true})


    
</script>

<style scoped>

</style>