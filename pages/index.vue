<script setup lang="ts">
const mangas = await $fetch<string[]>("/api/list/mangas");
const details = ref(new Map<string, string[]>());
const mangaIndex = ref(-1);
const episodeIndex = ref(-1);
const pages = ref([] as string[]);

//todo listの配列番号とかそういうのだけを渡すようにして、titleがちゃんと取得できるようにする

async function getMangaDetail(title: string): Promise<any> {
    const det = await $fetch<string[]>("/api/list/stories", {params: {title: title}});
    mangaIndex.value = mangas.indexOf(title);
    details.value.set(title, det);
}

async function getEpisodeDetail(title: string, episode: string): Promise<any> {
    pages.value = await $fetch<string[]>("/api/pages", {params: {title: title, episode: episode}});
}
</script>

<template>
    <div class="main">
        <div class="header">
            <select v-model="mangaIndex" @change="()=>{getMangaDetail(mangas[mangaIndex])}">
                <option value="-1" selected disabled>Select</option>
                <option v-for="title of mangas" :value="mangas.indexOf(title)">
                    {{ title }}
                </option>
            </select>
            <select v-model="episodeIndex" v-if="mangaIndex != -1" @change="()=>{getEpisodeDetail(mangas[mangaIndex], details.get(mangas[mangaIndex])![episodeIndex])}">            
                <option value="-1" selected disabled>Select</option>
                <option v-for="episode of details.get(mangas[mangaIndex])" :value="details.get(mangas[mangaIndex])?.indexOf(episode)">
                    {{ episode }}
                </option>
            </select>
        </div>
        <div class="viewer">
            <img class="image"  v-for="page of pages" :src='"/api/page/" + mangas[mangaIndex] +"/"+ details.get(mangas[mangaIndex])![episodeIndex] + "/" + page' />
        </div>
    </div>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
}
.main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}
.header {
    display: flex;
    flex-direction: row;
}
.viewer {
    display: flex;
    flex-direction: row-reverse;
    overflow-y:scroll;
}
.wrapper {
}
.image {
    height: 100%;
}
</style>