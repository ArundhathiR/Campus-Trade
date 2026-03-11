import axios from "axios";
import { useState } from "react";

function CreateProduct() {

const [title,setTitle] = useState("");
const [price,setPrice] = useState("");
const [image,setImage] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();

const formData = new FormData();
formData.append("title", title);
formData.append("price", price);
formData.append("image", image);

await axios.post("http://localhost:5000/api/products", formData);

alert("Product created");
};

return (
<form onSubmit={handleSubmit}>
<input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
<input placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
<input type="file" onChange={(e)=>setImage(e.target.files[0])} />

<button type="submit">Create Product</button>
</form>
);
}

export default CreateProduct;