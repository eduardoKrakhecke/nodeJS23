import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string
}


class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {

    const productRepositoty = getCustomRepository(ProductsRepository)
    const product = await productRepositoty.findOne(id)

    if(!product) {
      throw new AppError('Produto não encontrado', 400)
    }

    await productRepositoty.remove(product)

  }
}

export default DeleteProductService
