export class Envs {
  public static readonly PORT = Number(process.env.PORT) || 3000;
  public static readonly SECRET_TOKEN = String(process.env.SECRET_TOKEN);
  public static readonly EXPIRATION_TOKEN = String(
    process.env.EXPIRATION_TOKEN,
  );
  public static readonly MYSQL_HOST = String(process.env.MYSQL_HOST);
  public static readonly MYSQL_PORT = Number(process.env.MYSQL_PORT);
  public static readonly MYSQL_USERNAME = String(process.env.MYSQL_USERNAME);
  public static readonly MYSQL_PASSWORD = String(process.env.MYSQL_PASSWORD);
  public static readonly MYSQL_DATABASE = String(process.env.MYSQL_DATABASE);
  public static readonly GOOGLE_AUTH_CLIENT_ID = String(
    process.env.GOOGLE_AUTH_CLIENT_ID,
  );
  public static readonly GOOGLE_AUTH_CLIENT_SECRET = String(
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
  );
  public static readonly GOOGLE_AUTH_REDIRECT = String(
    process.env.GOOGLE_AUTH_REDIRECT,
  );
}
