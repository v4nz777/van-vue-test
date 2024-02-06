<template>
    <dialog ref="dialog" class="modal" @keydown.esc.prevent="console.log('press close button')">
        <div class="modal-box w-full h-max overflow-x-visible">
            <div class="flex justify-between">
                <p class="text-sm">#{{ topicstore.staged?.guid }}</p>
                <div class="flex gap-2">
                    <button v-if="!editMode" class="btn btn-xs" @click="useEditMode()">Edit</button>
                    <button v-if="topicstore.staged" class="btn btn-xs" @click="topicstore.unstage()">Close</button>
                </div>
            </div>
            
            
            <textarea v-if="editMode" class="textarea textarea-primary w-full my-3" type="text" v-model="editContent" autofocus
                @keydown.enter.prevent="save()">
            </textarea>
            <div class="bg-primary my-3 rounded-box" v-else>
                <p class="py-10 text-primary-content text-center font-bold break-words p-5">{{ topicstore.staged?.name }}</p>
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
    import { nowString } from '../utils/dates';


    const topicstore = useTopicStore()
    const peoplestore = usePeopleStore()


    const dialog = ref<HTMLDialogElement|null>(null)

    const editMode = ref(false)
    const editContent = ref('')
    const useEditMode = ()=> {
        editMode.value = true
        editContent.value = topicstore.staged?topicstore.staged.name:''
    }

    const save = ()=> {
        if(topicstore.staged) {
            topicstore.editTopic(topicstore.staged.guid,editContent.value)
            editMode.value = false
        }
    }


    const commentInput = ref('')
    function addComment(){
        const comment:Comment = {
            comment: commentInput.value,
            date: nowString(),
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