import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)


export default async function handler(req, res) {

    if(req.method == 'POST') {
        console.log(req.body)

        try {
            const params = {
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_address_collection: {
                    allowed_countries: ['IN'],
                },
                // discounts: [
                //     {
                //         coupon: 'CnOlbanB'
                //     }
                // ],
                shipping_options: [
                    {
                        shipping_rate: 'shr_1LugtESFnMEqcoMb2bCXr8iQ' //basic
                    },
                    {
                        shipping_rate: 'shr_1Lv2DdSFnMEqcoMbEdxFvZQP' //free
                    },
                    {
                        shipping_rate: 'shr_1Lv2FnSFnMEqcoMbNN0g3zE6' //fast
                    },
                ],
                phone_number_collection: {
                    enabled: true
                },
                line_items: req.body.map(item=>{
                    const image = item.image[0].asset._ref
                    const newImg = image.replace('image-', 'https://cdn.sanity.io/images/l06ua8k9/production/').replace('-webp', '.webp') 
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.name,
                                images: [newImg],
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                mode: 'payment',
                success_url: `${req.headers.origin}/payment_successfull`,   
                cancel_url: `${req.headers.origin}/payment_failed`
            }

            const session = await stripe.checkout.sessions.create(params)

            res.status(200).json(session)

        } catch (error) {
            res.status(error.statusCode || 500).json(error.message)
        }
    }else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}