import fs from "fs";
import { getQuery } from "h3";
import path from "path";



export default defineEventHandler(evt => {
    const config = useRuntimeConfig();
    const imgPath = evt.context.params!.path
    if(imgPath){
        const file = path.join(config.mangaPath, imgPath.toString()); // DO NOT HARD CODE DIRECTORIESSSSSSSSSSSSS
        let image = fs.readFileSync(file);
        return image
    }
    return null;
})