import { defineStore } from 'pinia'
import type { Person } from '../types'
import { useLocalStorage, useFetch } from '@vueuse/core'
import { ref, computed } from 'vue'

export const usePeopleStore =  defineStore('use-people-store', ()=> {

    const people = useLocalStorage<Person[]>('people',[])

    const me = computed(()=>  people.value[0])

    const fetching = ref(false)


    async function loadPeopleFromExternal(url:string) {
        fetching.value = true

        const {  data, isFetching } = await useFetch<string>(url)

        if(data.value){
            people.value = JSON.parse(data.value).persons
        }

        fetching.value = isFetching.value
    }


    function getPersonById(id:string){
        const findIndex = people.value.findIndex(people=>people.guid===id)
        if(findIndex < 0) return null
        return people.value[findIndex]
    }


    return {
        people,
        fetching,
        me,
        loadPeopleFromExternal,
        getPersonById

    }
 
})