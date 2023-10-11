import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import Product from "@modules/products/typeorm/entities/Product";

class ListProductService {
  public async execute(): Promise<Product[]> {

    const productRepositoty = getCustomRepository(ProductsRepository)

    return productRepositoty.find()

  }
}

export default ListProductService
