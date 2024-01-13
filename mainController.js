import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
import *as sessionContoller from "./sessionService.js"

const showMain = async (c) => {
    return c.html(eta.render("main.eta", {
        user : await sessionContoller.getUser(c),
    }))
}

export { showMain }