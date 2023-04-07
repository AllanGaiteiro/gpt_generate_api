import App from "./src/app";
import appController from "./src/controllers/app.controller";

function iniciar() {
    const app = new App([appController], 4000)
    app.listen();
}
iniciar();
