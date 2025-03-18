import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
import { Container } from "inversify";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AppIdentifiers } from "../../core/AppIdentifiers";
import { JwtIdentityGateway } from "../../adapters/gateways/jwt/JwtIdentityGateway";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { GetUserById } from "../../core/read/queries/GetUserById";
import { UserController } from "../modules/user/UserController";
import { LoginWithEmail } from "../../core/write/usecases/user/LoginWithEmail";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { jwt } from "../config/config";
import { SignUp } from "../../core/write/usecases/user/SignUp";
import { CreateArtwork } from "../../core/write/usecases/artwork/CreateArtwork";
import { ArtworkController } from "../modules/artwork/ArtworkController";
import { DeleteArtwork } from "../../core/write/usecases/artwork/DeleteArtwork";
import { UpdateArtwork } from "../../core/write/usecases/artwork/UpdateArtwork";
import { FirebaseStorageGateway } from "../../adapters/gateways/firebase/FirebaseStorageGateway";
import { PostgresUserRepository } from "../../adapters/repositories/user/PostgresUserRepository";
import { UserEntity } from "../../adapters/repositories/user/UserEntity";
import { ArtworkEntity } from "../../adapters/repositories/artwork/write/ArtworkEntity";
import { DataSource } from "typeorm";
import { PostgresArtworkRepository } from "../../adapters/repositories/artwork/write/PostgresArtworkRepository";
import { PostgresArtworkReadModelRepository } from "../../adapters/repositories/artwork/read/PosgresArtworkReadModelRepository";
import { GetAllArtworks } from "../../core/read/queries/GetAllArtworks";

export class AppDependencies extends Container {
    async init() {
        const AppDataSource = new DataSource({
            type: "postgres",
            url: process.env.DB_URL,
            synchronize: process.env.DB_SYNCHRONIZE === "true",
            logging: process.env.DB_LOGGING === "true",
            entities: [UserEntity, ArtworkEntity],
            subscribers: [],
            migrations: [],
        });
        const dataSource = await AppDataSource.initialize();
        const entityManager = dataSource.manager;

        const encodedFirebaseConfig = process.env.FIREBASE_CONFIG;
        if (!encodedFirebaseConfig) {
            throw new Error('"FIREBASE_CONFIG" is required');
        }
        const decodedFirebaseConfig = Buffer.from(
            encodedFirebaseConfig,
            "base64"
        ).toString("ascii");
        const firebaseConfig = JSON.parse(decodedFirebaseConfig);
        const firebaseApp = initializeApp({
            credential: cert(firebaseConfig),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
        const firebaseStorage = getStorage(firebaseApp);

        this.bind(AppIdentifiers.storageGateway).toConstantValue(
            new FirebaseStorageGateway(firebaseStorage)
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

        this.bind(AuthenticationMiddleware).toSelf();

        // user
        this.bind(GetUserById).toSelf();
        this.bind(LoginWithEmail).toSelf();
        this.bind(SignUp).toSelf();
        this.bind(UserController).toSelf();

        // Artwork
        this.bind(ArtworkController).toSelf();
        this.bind(CreateArtwork).toSelf();
        this.bind(DeleteArtwork).toSelf();
        this.bind(UpdateArtwork).toSelf();
        this.bind(GetAllArtworks).toSelf();

        return this;
    }
}
