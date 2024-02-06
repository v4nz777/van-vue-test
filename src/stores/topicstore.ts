import { defineStore } from 'pinia'
import type { Topic, Comment } from '../types'
import { useLocalStorage, useFetch } from '@vueuse/core'
import { ref } from 'vue'
import { nanoid } from 'nanoid'

export const useTopicStore =  defineStore('use-topic-store', ()=> {

    const topics = useLocalStorage<Topic[]>('topics',[])


    const fetching = ref(false)


    async function loadTopicsFromExternal(url:string) {
        fetching.value = true

        const {  data, isFetching } = await useFetch<string>(url)

        if(data.value){
          topics.value = JSON.parse(data.value).topics
        }

        fetching.value = isFetching.value
    }

 

    function addTopic(name:string){
        const topic:Topic = {
            guid:nanoid(8),
            name:name,
            comments: []
        }
        topics.value.unshift(topic)
    }

    function addComment(topicId:string|undefined,input:Comment){
        if(!topicId)return
        const topic = getTopicById(topicId)
        topic?.comments?.push(input)
    }


    function deleteTopic(id:string){
        const findIndex = topics.value.findIndex(topic=>topic.guid===id)
        if(findIndex < 0) return
        topics.value.splice(findIndex,1)
    }


    function getTopicById(id:string){
        const findIndex = topics.value.findIndex(topic=>topic.guid===id)
        if(findIndex < 0) return null
        return topics.value[findIndex]
    }

    function editTopic(topicId:string, changes:string){
        const findIndex = topics.value.findIndex(topic=>topic.guid===topicId)
        topics.value[findIndex].name = changes
    }


    const staged = ref<Topic|null>(null)

    function stageTopic(id:string){
        staged.value = getTopicById(id)
    }

    function unstage(){
        staged.value = null
    }





    return {
        topics,
        fetching,
        staged,
        loadTopicsFromExternal,
        getTopicById,
        stageTopic,
        unstage,
        deleteTopic,
        addTopic,
        addComment,
        editTopic

    }
 
})