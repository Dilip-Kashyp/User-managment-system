import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import *as mainController from "./mainController.js"
import *as authController from "./authController.js"


const app = new Hono();

app.get("/", mainController.showMain)
app.get("/auth/registration", authController.showRegistrationform);
app.get("/auth/login", authController.showLoginForm);
app.post("/auth/registration", authController.registerForm);
app.post("/auth/login", authController.userLogin)
app.post("/auth/logout", authController.logOut)


export default app;
