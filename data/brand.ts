interface BrandSchema {
    brandName: String
    products: ProductSchema[]
    cnpj: Number
    userId: String
}

interface ProductSchema {
    name:  String
    price: Number
    
    service: ServiceSchema[]
        
}
interface ServiceSchema {
    name:  String
        
}

const brand: BrandSchema[] = [
    {
        userId: "5ffd9ac3a1fbb5490b6090fe",
        brandName: "Ifood",
        cnpj: 123456789,
        products: [
            {name: "comida", price:23,
            service: [{name: "Entrega"},{name:"Devolve"}]
        
        }]},
        {
            userId: "5ffd9ac3a1fbb5490b6090fe",
            brandName: "Ifood2",
            cnpj: 223456789,
            products: [
                {name: "comida", price:23,
                service: [{name:"Devolve"}]
            
            }]}


]
      
      

export default brand;