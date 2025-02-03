import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { AppDependencies } from "./AppDependencies";
import { UserController } from "../modules/user/UserController";
import { ArtworkController } from "../modules/artwork/ArtworkController";
import morgan from "morgan";
import cors from "cors";

export async function configureExpress(app: Application) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.originalUrl === "/webhooks/stripe/callback") {
            express.raw({ type: "application/json" })(req, res, next);
        } else {
            express.json()(req, res, next);
        }
    });

    app.use(morgan("combined"));
    app.use(cors());

    const routes = [UserController, ArtworkController];

    const container = await new AppDependencies().init();

    useContainer(container);

    useExpressServer(app, {
        controllers: routes,
        middlewares: [],
    });

    return container;
}
