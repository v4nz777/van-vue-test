<template>
    <div class="rounded-box bg-white shadow w-full h-full max-w-[260px] min-h-[180px] p-5 flex flex-col justify-between relative">
        <button class="absolute top-0 right-0 p-2 hover:text-error hover:scale-110 text-gray-400"
            @click="topicstore.deleteTopic(topic.guid)">
            <svg class="w-3 h-3" version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="remove.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path18404" inkscape:connector-curvature="0" d="M0,264.84L335.16,600L0,935.16L264.84,1200L600,864.84L935.16,1200 L1200,935.16L864.84,600L1200,264.84L935.16,0L600,335.16L264.84,0L0,264.84z"></path> </g></svg>
        </button>
        <div class="w-full">
            <p class="text-sm text-primary">#{{ topic.guid }}</p>
            <p class="text-md font-bold break-words">"{{ topic.name }}"</p>

        </div>

        <div class="tooltip" data-tip="Comments">
            <button class="w-max h-max hover:scale-125 transit duration-1000 relative" @click="openTopic(topic.guid)">
                <span v-if="topic.comments?.length" class="absolute -top-2 -right-1 badge badge-xs bg-primary text-primary-content p-2 font-bold">
                    {{ topic.comments.length }}
                </span>
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10.5H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 14H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </button>
            
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTopicStore } from '../stores/topicstore';
    import type { Topic } from '../types';


    const topicstore = useTopicStore()

    defineProps<{
        topic: Topic
        index: number
    }>()

    function openTopic(id:string) {
        topicstore.stageTopic(id)
    }
</script>
