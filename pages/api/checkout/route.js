import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'
const clientId = "Acql0AKGMYjoi82lBUqRDmafUgADi2FaPy6fdBgL13sZB-WYIwyPxMAwXSI9NEGwZvKvm7cmovgAS_Er"
const clientSecret = "EDszWnOFl6NwLvDQufXTkO3wIW3905yr85RKWPl_DAHND5Jg-swPk34Wzl7GfbZ6oqkEbsgzl8bf61s3"

const environment= new paypal.core.SandboxEnvironment(clientId,clientSecret)

const client = new paypal.core.PayPalHttpClient(environment)

export async function POST(){
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent:'CAPTURE',
        purchase_units:[
            {
                amount:{
                    currency_code:"USD",
                    value:"100.00",
                    breakdown:{
                        item_total:{
                            currency_code:"USD",
                            value:"100.00"
                        }
                    }
                },
                items:[
                    {
                        name:"Book",
                        description:"A bout book",
                        quantity:"1",
                        unit_amount:{
                            currency_code:"USD",
                            value:"50.00",
                        }
                    },
                    {
                        name:"Hayy POrter",
                        description:"A book ahha",
                        quantity:"1",
                        unit_amount:{
                            currency_code:"USD",
                            value:"50.00",
                        }
                    }
                ]
            }
        ]
    })
    
    const response = await client.execute(request);
    console.log(response)
    return NextResponse.json({
       id:response.result.id,
    })
}
