export const createProductAdaptedFromFirestore = (doc) => {
    const data = doc.data()
    
    return {
        id: doc.id,
        name: data.name,
        category: data.category,
        imageUrl: data.imageUrl, 
        price: data.price,
        stock: data.stock,
        description: data.description
    }
}