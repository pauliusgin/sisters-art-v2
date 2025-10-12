import "reflect-metadata";
import { Application } from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { AppDependencies } from "./AppDependencies";
import { UserController } from "../modules/user/UserController";
import { ArtworkController } from "../modules/artwork/ArtworkController";
import morgan from "morgan";
import { UploadsController } from "../modules/storage/UploadsController";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { pendingUploadsCleanupCron } from "../cron/PendingUploadsCleanupCron";
import { PageViewController } from "../modules/views/PageViewController";

export async function configureExpress(app: Application) {
  app.use(morgan("combined"));

  const container = await new AppDependencies().init();

  useContainer(container);

  pendingUploadsCleanupCron(container);

  useExpressServer(app, {
    controllers: [
      UserController,
      ArtworkController,
      UploadsController,
      PageViewController,
    ],
    middlewares: [AuthenticationMiddleware],
  });

  return container;
}
