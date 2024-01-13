const findUserByEmail = async (email) => {
    const kv = await Deno.openKv();
    const user = await kv.get(["users", email]);
    return user?.value;
}

const createUser = async (user) => {
    const kv = await Deno.openKv();
    await kv.set(["users", user.email], user);

}


export { findUserByEmail, createUser }