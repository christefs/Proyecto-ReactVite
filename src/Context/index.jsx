import { createContext, useState, useEffect } from 'react'

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

    //Get products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    //Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)
    

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setItems(data))
      }, [])
    
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType) {
            return items
        }
    }
/*
    useEffect(() => {
        if (searchByTitle) setFilteredItems(filteredItemsByTitle(items, searchByTitle))
      }, [items, searchByTitle])
*/
    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory])

    console.log('Por título: ', searchByTitle)
    console.log('Por categoría: ', searchByCategory)
    console.log('Filtrados: ', filteredItems)

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
            setOrder,
            items,
            setItems,
            searchByTitle, 
            setSearchByTitle,
            filteredItems,
            searchByCategory, 
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}