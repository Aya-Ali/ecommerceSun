
// Get ,post,delete ,put/patch
 export async function Hamada(req) {


    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
    const data =await res.json()

    return Response.json(data)
}



