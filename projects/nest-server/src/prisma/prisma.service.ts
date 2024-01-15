import { INestApplication, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
// export class PrismaService {}
export class PrismaService extends PrismaClient{
  async enableShutdownHooks(app: INestApplication) {
    // this.$on('beforeExit', async () => {
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}
