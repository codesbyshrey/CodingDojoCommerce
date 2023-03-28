// Cart Page

const Cart = () => {

    return (
        <div className="cartContainer">
            <h1> Welcome to Your Cart </h1>
            <h3> Your Cart </h3>
            <div className="cartProducts">
                <h4> Your Items </h4>
            </div>
            <div className="orderSummary"> 
                <h4> Summary (x items) </h4>
            </div>
            <form>
                <h4> Promo Code? :  </h4>
                <button type="submit"> Checkout </button>
            </form>
        </div>
    )
}

export default Cart;