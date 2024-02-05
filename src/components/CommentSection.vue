<template>
    <ul class="max-h-[300px] overflow-y-auto">
       
        <li v-for="comment in comments">
            <div class="chat chat-start text-xs ">
                <div class="chat-image">
                    <div class="tooltip" :data-tip="peoplestore.getPersonById(comment.by)?.first">
                        <div class="w-10 h-10 text-lg rounded-full flex font-bold items-center justify-center bg-yellow-300">
                            <span >{{ peoplestore.getPersonById(comment.by)?.guid }}</span>
                        </div>
                    </div>
                </div>
                <div class="chat-bubble">{{ comment.comment }}</div>
                <p v-if="comment.date">{{ formatDate(comment.date) }}</p>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import type { Comment } from '../types.ts'
    import { usePeopleStore } from '../stores/people'
    import { formatDate } from '../utils/dates'

    defineProps<{
        comments?: Comment[]|null
    }>()

    const peoplestore = usePeopleStore()
</script>

<style scoped>

</style>