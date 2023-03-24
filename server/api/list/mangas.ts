import fs from "fs";
import path from "path";

export default defineEventHandler(evt => {
    const config = useRuntimeConfig();
    console.log(config);
    const dir = config.mangaPath; // DO NOT HARD CODE DIRECTORIESSSSSSSSSSSSS
    let files = fs.readdirSync(dir);
    const directories = files.filter((file) => fs.lstatSync(path.join(dir, file)).isDirectory());
    return directories;
})
