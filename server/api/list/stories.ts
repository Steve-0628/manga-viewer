import fs from "fs";
import { getQuery } from "h3";
import path from "path";

export default defineEventHandler(evt => {
    const config = useRuntimeConfig();
    const { title } = getQuery(evt);
    const dir = path.join(config.mangaPath); // DO NOT HARD CODE DIRECTORIESSSSSSSSSSSSS
    let files = fs.readdirSync(dir);
    files = fs.readdirSync(path.join(dir, title));
    const directories = files.filter((file) => fs.lstatSync(path.join(dir, title!.toString(), file)).isDirectory());
    directories.sort((a, b) => {
        const anum: number = parseInt(a.match(/[0-9]+/g)![0]);
        const bnum: number = parseInt(b.match(/[0-9]+/g)![0]);
        return anum - bnum;
    });
    return directories;
})
