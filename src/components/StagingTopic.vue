<template>
    <dialog ref="dialog" class="modal">
        <div class="modal-box w-full h-max overflow-x-visible">
            <div class="flex justify-between">
                <p class="text-sm">#{{ topicstore.staged?.guid }}</p>
                <button class="btn btn-xs" @click="topicstore.unstage()">Close</button>
            </div>
            
            <div class="bg-primary my-3 rounded-box">
                <p class="py-10 text-primary-content text-center font-bold">{{ topicstore.staged?.name }}</p>
            </div>
            
            <p>Comments:</p>
            <CommentSection :comments="topicstore.staged?.comments" class=""/>

            
            <div class="p-5 flex justify-between">
                <input type="text" placeholder="Add comment..." class="input input-bordered w-full" v-model="commentInput"
                    @keydown.enter.prevent="addComment()"/>
                
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { useTopicStore } from '../stores/topicstore';
    import CommentSection from './CommentSection.vue';
    import { usePeopleStore } from '../stores/people';
    import type { Comment } from '../types';


    const topicstore = useTopicStore()
    const peoplestore = usePeopleStore()


    const dialog = ref<HTMLDialogElement|null>(null)

    const commentInput = ref('')
    function addComment(){
        const comment:Comment = {
            comment: commentInput.value,
            date: new Date(),
            by: peoplestore.me.guid
        }
        topicstore.addComment(topicstore.staged?.guid,comment)
        commentInput.value=''

    }

    watch(()=>topicstore.staged, ( value )=>{
        if(value)dialog.value?.showModal()
        else dialog.value?.close()
    })


</script>

<style scoped>

</style>