<script setup lang="ts">
  
  import { onMounted,ref } from 'vue'

  import TopicItem from './components/TopicItem.vue';
  import { useTopicStore } from './stores/topicstore';
  import StagingTopic from './components/StagingTopic.vue';
  import { usePeopleStore } from './stores/people';
  

  
  const topicstore = useTopicStore()
  const peoplestore = usePeopleStore()
  const newTopic = ref('')

  function addNewTopic(){
    topicstore.addTopic(newTopic.value)
    newTopic.value = ''
  }


  const url = 'https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json'

  

  onMounted(async () => {
    await topicstore.loadTopicsFromExternal(url)
    await peoplestore.loadPeopleFromExternal(url)
  })
  
  const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
</script>

<template>
  <div class="p-10 bg-base-200">
      <TransitionGroup name="list" tag="ul" class="grid grid-cols-4 gap-5 lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 " >
        <div key="abc123s" class="rounded-box bg-white shadow w-full h-full max-w-[260px] min-h-[180px] max-h-[180px] p-5 flex flex-col justify-between">
          <textarea v-model="newTopic"  class="textarea textarea-primary h-full w-full" placeholder="Start a topic..."
            @keydown.enter.prevent="addNewTopic()">

          </textarea>
        </div>
      
        <div class="flex flex-col gap-4 w-52" v-if="topicstore.fetching" v-for="item in items" :key="item">
          <div class="skeleton h-32 w-full"></div>
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>

        <li v-else v-for="topic,index in topicstore.topics" :key="topic.name">
          <TopicItem :topic="topic" :index="index" />
        </li>
      </TransitionGroup>
      <StagingTopic />
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

</style>
