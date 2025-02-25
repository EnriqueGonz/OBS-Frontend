import axios from "axios";
import '../config';


var baseUrl = global.config.i18n.route.url;
/** 
 * npm i @stripe/stripe-js
 * npm i stripe
 * npm i @stripe/react-stripe-js
*/

var token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

class PaymentOptions {
    // Start -Pay with credit card
    payWithCreditCard(dataProductPay) {
        try {
            // Create and get Checkout Session ID - card
            axios.post(baseUrl+'/payment/api/create-payment-intent-card/', dataProductPay, { headers })
                .then((result) => { return result.data; })
                .then((data) => {
                    // Redirect to Stripe Checkout
                    if (data.sessionURL === undefined | data.sessionURL === null | data.sessionURL === ''){
                        return false;
                    }else{
                        console.log('Session URL',data.sessionURL);
                        window.location.href = data.sessionURL;
                    }
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    return false;
                });

        } catch (error) {
            return false;
        }
    };
    // End - Pay with credit card
}

const PayWithCreditCard = new PaymentOptions();
export default PayWithCreditCard