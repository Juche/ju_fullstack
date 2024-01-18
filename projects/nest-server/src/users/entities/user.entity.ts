import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
    id: number

  @ApiProperty()
    createdAt: Date

  @ApiProperty()
    updatedAt: Date

  @ApiProperty()
    name: string

  @ApiProperty()
    email: string

  // @ApiProperty()  // 省略 @ApiProperty 装饰器将只会在 Swagger 文档中隐藏 password 属性。该属性依然会被展示在响应体中
  password: string

}
