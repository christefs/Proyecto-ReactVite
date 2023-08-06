import { useContext } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'
import './styles.css'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)
    console.log('CART: ', context.cartProducts)

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>My Order</h2>
                <div>
                <XCircleIcon className="h-6 w-6 text-black cursor-pointer"
                onClick={() => context.closeCheckoutSideMenu()}></XCircleIcon>

                </div>
            </div>
            <div className='px-6 overflow-y-scroll'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                        key={product.id} 
                        title={product.title}
                        imageUrl={product.images}
                        price={product.price}
                        />
                    ))
                }
            </div>            
        </aside>
    )
}

export default CheckoutSideMenu