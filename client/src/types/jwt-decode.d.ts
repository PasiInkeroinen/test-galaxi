declare module "jwt-decode" {
  /**
   * Decodes a JSON Web Token (JWT).
   *
   * @param token The JWT as a string.
   * @returns The decoded token payload.
   */
  export default function jwt_decode<T = unknown>(token: string): T;
}
