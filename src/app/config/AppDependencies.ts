import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
import { Container } from "inversify";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AppIdentifiers } from "../../core/AppIdentifiers";
import { JwtIdentityGateway } from "../../adapters/gateways/jwt/JwtIdentityGateway";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { UserController } from "../modules/user/UserController";
import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { jwt } from "../config/config";
import { ArtworkController } from "../modules/artwork/ArtworkController";
import { FirebaseStorageGateway } from "../../adapters/gateways/firebase/FirebaseStorageGateway";
import { PostgresUserRepository } from "../../adapters/repositories/user/PostgresUserRepository";
import { UserEntity } from "../../adapters/repositories/user/UserEntity";
import { ArtworkEntity } from "../../adapters/repositories/artwork/write/ArtworkEntity";
import { DataSource } from "typeorm";
import { PostgresArtworkRepository } from "../../adapters/repositories/artwork/write/PostgresArtworkRepository";
import { PostgresArtworkReadModelRepository } from "../../adapters/repositories/artwork/read/PosgresArtworkReadModelRepository";
import { GetAllArtworks } from "../../core/read/queries/GetAllArtworks";
import {
  EventHandlerRegistry,
  inMemoryBuild,
  EventReceiver,
  MessageIdentifiers,
} from "ddd-messaging-bus";
import { ArtworkCreated, ArtworkUpdated, FileAttached } from "../../messages";
import { HandleFileAttached } from "../modules/handlers/HandleFileAttached";
import {
  AttachUploadedFile,
  CreateArtwork,
  DeleteArtwork,
  DeletePendingUploads,
  DeleteUnusedUploads,
  DeleteUploadedFile,
  GetUserById,
  LoginWithEmail,
  SignUp,
  UpdateArtwork,
  UploadFile,
} from "../../core";
import { PostgresUploadsRepository } from "../../adapters/repositories/storage/PostgresUploadsRepository";
import { UploadEntity } from "../../adapters/repositories/storage/UploadEntity";
import { UploadsController } from "../modules/storage/UploadsController";
import { ImagesService } from "../../core/write/domain/services/ImageService";
import { HandleArtworkCreated } from "../modules/handlers/HandleArtworkCreated";
import { LoginFormClosed } from "../pageUI/LoginFormClosed";
import { PageUIController } from "../modules/pageUI/PageUIController";
import { HandleArtworkUpdated } from "../modules/handlers/HandleArtworkUpdated";
import { LoginForm } from "../pageUI/LoginForm";
import { UserGuestControls } from "../pageUI/UserGuestControls";
import { UserLoggedInControls } from "../pageUI/UserLoggedInControls";
import { HamburgerMenuOpen } from "../pageUI/HamburgerMenuOpen";
import { HamburgerMenuClosed } from "../pageUI/HamburgerMenuClosed";
import { HamburgerButton } from "../pageUI/HamburgerButton";
import { HamburgerButtonX } from "../pageUI/HamburgerButtonX";
import { UploadForm } from "../pageUI/UploadForm";
import { UploadFormClosed } from "../pageUI/UploadFormClosed";
import { UploadPreview } from "../pageUI/UploadPreview";
import { UploadHiddenInput } from "../pageUI/UploadHiddenInput";
import { GalleryForGuest } from "../pageUI/GalleryForGuest";
import { GalleryForLoggedIn } from "../pageUI/GalleryForLoggedIn";

export class AppDependencies extends Container {
  async init() {
    const AppDataSource = new DataSource({
      type: "postgres",
      url: process.env.DB_URL,
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      entities: [UserEntity, ArtworkEntity, UploadEntity],
      subscribers: [],
      migrations: [],
    });
    const dataSource = await AppDataSource.initialize();
    const entityManager = dataSource.manager;

    const encodedCredentials = process.env.FIREBASE_CREDENTIALS;
    if (!encodedCredentials) {
      throw new Error('"FIREBASE_CREDENTIALS" are required');
    }
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64"
    ).toString("utf-8");
    const firebaseCredentials = JSON.parse(decodedCredentials);
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(firebaseCredentials),
    });

    const firebaseConfig = {
      firebaseStorage: getStorage(firebaseAdmin),
      defaultBucket: process.env.FIREBASE_STORAGE_DEFAULT_BUCKET,
      baseUrl: "https://firebasestorage.googleapis.com/v0",
    };

    this.bind(AppIdentifiers.storageGateway).toConstantValue(
      new FirebaseStorageGateway(firebaseConfig)
    );

    this.bind(AppIdentifiers.userRepository).toConstantValue(
      new PostgresUserRepository(entityManager)
    );
    this.bind(AppIdentifiers.artworkRepository).toConstantValue(
      new PostgresArtworkRepository(entityManager)
    );
    this.bind(AppIdentifiers.identityGateway).toConstantValue(
      new JwtIdentityGateway(jwt.secret, jwt.config)
    );
    this.bind(AppIdentifiers.passwordGateway).toConstantValue(
      new BcryptPasswordGateway()
    );
    this.bind(AppIdentifiers.artworkReadModelRepository).toConstantValue(
      new PostgresArtworkReadModelRepository(entityManager)
    );

    this.bind(AppIdentifiers.uploadsRepository).toConstantValue(
      new PostgresUploadsRepository(entityManager)
    );

    this.bind(AuthenticationMiddleware).toSelf();

    // UI
    this.bind(LoginForm).toSelf();
    this.bind(LoginFormClosed).toSelf();
    this.bind(UserGuestControls).toSelf();
    this.bind(UserLoggedInControls).toSelf();
    this.bind(HamburgerButton).toSelf();
    this.bind(HamburgerButtonX).toSelf();
    this.bind(HamburgerMenuOpen).toSelf();
    this.bind(HamburgerMenuClosed).toSelf();
    this.bind(UploadForm).toSelf();
    this.bind(UploadFormClosed).toSelf();
    this.bind(UploadPreview).toSelf();
    this.bind(UploadHiddenInput).toSelf();
    this.bind(GalleryForGuest).toSelf();
    this.bind(GalleryForLoggedIn).toSelf();

    // controllers
    this.bind(UserController).toSelf();
    this.bind(ArtworkController).toSelf();
    this.bind(UploadsController).toSelf();
    this.bind(PageUIController).toSelf();

    // user
    this.bind(GetUserById).toSelf();
    this.bind(LoginWithEmail).toSelf();
    this.bind(SignUp).toSelf();

    // artwork
    this.bind(CreateArtwork).toSelf();
    this.bind(DeleteArtwork).toSelf();
    this.bind(UpdateArtwork).toSelf();
    this.bind(GetAllArtworks).toSelf();

    // uploads
    this.bind(UploadFile).toSelf();
    this.bind(AttachUploadedFile).toSelf();
    this.bind(DeleteUploadedFile).toSelf();
    this.bind(DeleteUnusedUploads).toSelf();
    this.bind(DeletePendingUploads).toSelf();
    this.bind(ImagesService).toSelf();

    inMemoryBuild(this);

    EventHandlerRegistry.register(
      ArtworkCreated,
      new HandleArtworkCreated(this.get(AttachUploadedFile))
    );
    EventHandlerRegistry.register(
      ArtworkUpdated,
      new HandleArtworkUpdated(this.get(AttachUploadedFile))
    );
    EventHandlerRegistry.register(
      FileAttached,
      new HandleFileAttached(this.get(DeleteUnusedUploads))
    );

    const eventReceiver: EventReceiver = this.get(
      MessageIdentifiers.EventReceiver
    );
    await eventReceiver.init();

    return this;
  }
}
