import axios from "axios";
import { useEffect, useState } from "react";

function MyProducts() {

const [products,setProducts] = useState([]);

useEffect(()=>{
axios.get("http://localhost:5000/api/products")
.then(res=>setProducts(res.data));
},[]);

return (
<div>
<h2>My Products</h2>

{products.map(p => (
<div key={p._id}>
<h3>{p.title}</h3>
<p>{p.price}</p>
<img src={`http://localhost:5000/${p.image}`} width="100"/>
</div>
))}

</div>
);
}

export default MyProducts;