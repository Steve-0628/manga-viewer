import fs from "fs";
import { getQuery } from "h3";
import path from "path";


export default defineEventHandler(evt => {
    const config = useRuntimeConfig();
    const { title, episode } = getQuery(evt);
    if(!title || !episode){
        return [];
    }

    const dir = path.join(config.mangaPath, title.toString(), episode.toString()); // DO NOT HARD CODE DIRECTORIESSSSSSSSSSSSS
    console.log(dir);
    const files = fs.readdirSync(dir);
    const pages = []
    for (const file of files) {
        if (file.match(/\.(png|jpg|jpeg)/g)) {
            pages.push(file);
        }
    }
    pages.sort((a, b) => {
        const anum: number = parseInt(a.match(/[0-9]+/g)![0]);
        const bnum: number = parseInt(b.match(/[0-9]+/g)![0]);
        return anum - bnum;
    });
    return pages;
})