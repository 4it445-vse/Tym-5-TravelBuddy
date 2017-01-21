//udelat action ktera nasype klikem na Item product data do
//a ukaze modal <ProductDetailContainer product=product show=true />
//tam odtud si to lze vytahnout pres props

//na homepage bude muset byt connect() a mapStateToProps abych mohl predat product a show
//action bude nastavena u Item.js
//reducer bude mit initialState product, showModal

//list of all action types

export const SEARCH_SECTION_SHOW_DETAIL_PRODUCT = 'SEARCH_SECTION_SHOW_DETAIL_PRODUCT';

//implement actions

//obsolote
export const showDetailProductModal = (product, show) => {
  console.log('--- action SEARCH_SECTION_SHOW_DETAIL_PRODUCT fired!', product);
  return {
    type: SEARCH_SECTION_SHOW_DETAIL_PRODUCT,
    product: product,
    showDetail: show
  }
}
