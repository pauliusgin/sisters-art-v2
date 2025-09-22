export class AppIdentifiers {
  static readonly userRepository = Symbol.for("userRepository");
  static readonly passwordGateway = Symbol.for("passwordGateway");
  static readonly identityGateway = Symbol.for("identityGateway");
  static readonly artworkRepository = Symbol.for("artworkRepository");
  static readonly artworkReadModelRepository = Symbol.for(
    "artworkReadModelRepository"
  );
  static readonly storageGateway = Symbol.for("storageGateway");
  static readonly uploadsRepository = Symbol.for("uploadsRepository");
}
