import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";
import { enableProdMode } from "@angular/core";

enableProdMode(); // TODO: should be only called for production
platformBrowserDynamic().bootstrapModule(AppModule);
