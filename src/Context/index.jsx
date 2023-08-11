import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext() 

export const ShoppingCartProvider = ({children}) => {
    
    //Shopping Cart - Incrementar cantidad
    const [count, setCount] = useState(0) //Inicializa el estado en cero para que la cantidad de elementos adquiridos empiece en cero

    //Product Detail - Despliegue y cierre de detalle de producto
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false) //Inicializa el estado en false para que el detalle del producto esté inicialmente cerrado 
/*    
parámetro: Lectura
setParámetro: Modificación
*/
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Checkout Side Menu - Despliegue y cierre de detalle Mi orden
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false) //Inicializa el estado en false para que el detalle del producto esté inicialmente cerrado 

    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    //Product Detail - Mostrar producto
    const [productToShow, setProductToShow] = useState({}) //Inicializa el estado con un objeto vació para contener todas las especificaciones del producto

    //Shopping cart - Adicionar productos al carrito
    const [cartProducts, setCartProducts] = useState([]) //Inicializa el estado con un array vacío para contener las diferentes cantidades de la compra

    //Shopping Cart . Order
    const [order, setOrder] = useState([])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}