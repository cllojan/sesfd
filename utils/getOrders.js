

export default async function getOrders(ordersId){
    const productsIds = ordersId;
    const uniqueIds = [...new Set(productsIds)];
    console.log(productsIds)
    //const productsInfos = await Product.find({_id:uniqueIds});

    /*
    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: {name:productInfo.title},
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }
    return line_items*/
}