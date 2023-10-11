import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {

    const productRepositoty = getCustomRepository(ProductsRepository)
    const product = await productRepositoty.findOne(id)

    if(!product) {
      throw new AppError('Produto não encontrado', 400)
    }

    return product

  }
}

export default ShowProductService
