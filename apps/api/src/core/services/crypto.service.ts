import { randomBytes, subtle } from "crypto";

export abstract class CryptoService {

  private static async getDerivedKey(privateKey: string, salt: string) {
    const key = await subtle.importKey(
      'raw',
      Buffer.from(privateKey),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    )

    const derivedKey = await subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: Buffer.from(salt),
        iterations: 10000,
        hash: 'SHA-256'
      },
      key,
      {
        name: 'AES-GCM',
        length: 256
      },
      false,
      [
        'encrypt',
        'decrypt'
      ]
    )

    return derivedKey
  }

  static async encrypt(text: string, privateKey: string) {

    const salt = randomBytes(16)
    const derivedKey = await this.getDerivedKey(privateKey, salt.toString('hex'))
    const iv = randomBytes(16)

    const encrypted = await subtle.encrypt(
      {
        name: 'AES-GCM',
        length: 256,
        iv: iv
      },
      derivedKey,
      Buffer.from(text)
    )
    return Buffer.concat([salt, iv, Buffer.from(encrypted)])
  }

  static async decrypt(encrypted: Buffer, privateKey: string) {
    // Destructure the encrypted data into its parts
    // salt (16 bytes), iv (16 bytes), data (the rest)
    const salt = encrypted.subarray(0, 16)
    const iv = encrypted.subarray(16, 32)
    const data = encrypted.subarray(32)
    const derivedKey = await this.getDerivedKey(privateKey, salt.toString('hex'))

    const decrypted = await subtle.decrypt(
      {
        name: 'AES-GCM',
        length: 256,
        iv,
      },
      derivedKey,
      data
    )
    return Buffer.from(decrypted)
  }

}
