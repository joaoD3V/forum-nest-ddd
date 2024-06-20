import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { Module } from '@nestjs/common';
import { JwtEncrypter } from './jwt-encrypter';
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer';
import { BcryptHasher } from './bcrypt-hasher';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    }, // Toda vez que houver uma classe na aplicação que implementa ou tem essa dependencia do provide, irá usar a useClass
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
