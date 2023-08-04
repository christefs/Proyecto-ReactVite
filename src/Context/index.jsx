import { createContext, useState } from 'react'

export const ShoppingCartContext = createContext() 

export const ShoppingCartProvider = ({children}) => {
    
    //Shopping Cart - Incrementar cantidad
    const [count, setCount] = useState(0)

    //Product Detail - Despliegue de detalle de producto
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
/*    
parámetro: Lectura
setParámetro: Modificación
*/
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Product Detail - Mostrar producto
    const [productToShow, setProductToShow] = useState({})

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}