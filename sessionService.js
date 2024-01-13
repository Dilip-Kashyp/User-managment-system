import {
    deleteCookie,
    getSignedCookie,
    setSignedCookie,
} from "https://deno.land/x/hono@v3.7.4/helper.ts";

const passCode = "iamGoodOne";

const createSession = async (c, user) => {
    const cookieID = crypto.randomUUID();
    await setSignedCookie(c, "user", cookieID, passCode, {
        path: "/",
    });
    const kv = await Deno.openKv();
    await kv.set(["sessions", cookieID], user, {
        expireIn : WEEK_IN_MILLISECONDS,
    });
}

const WEEK_IN_MILLISECONDS = 604800000;
const getUser = async (c) => {
    const session = await getSignedCookie(c, passCode, "user")
    if (!session) {
        console.log("no session id")
        return null;
    }

    const kv = await Deno.openKv();
    const user = await kv.get(["sessions", session]);
    const foundUser = user?.value ?? null;
    if(!foundUser){
        return null;
    }
    await kv.set(["sessions", session], foundUser, {
        expireIn : WEEK_IN_MILLISECONDS,
    })
};

const deleteSession = async (c) => {
    const sessionID = await getSignedCookie(c, passCode, "user");
    if(!sessionID){
        return;
    }

    deleteCookie(c,"user", {
        path : "/",
    });

    const kv = await Deno.openKv();
    await kv.delete(["sessions", sessionID])

}

export { createSession, getUser, deleteSession }
