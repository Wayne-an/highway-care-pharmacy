import { useState } from "react";


function AddMedicine({ addMedicine }) {


const [medicine, setMedicine] = useState({
    name:"",
    category:"",
    price:"",
    quantity:"",
    expiry:""
});


function handleChange(e){

setMedicine({
    ...medicine,
    [e.target.name]: e.target.value
});

}



function handleSubmit(e) {

  e.preventDefault();
  console.log("Form submitted!");
  
  addMedicine({
    ...medicine,
    id: Date.now(),
    price: Number(medicine.price),
    quantity: Number(medicine.quantity)
  });


setMedicine({
    name:"",
    category:"",
    price:"",
    quantity:"",
    expiry:""
});


}



return (

<div className="bg-white shadow rounded-xl p-6 mt-8">


<h2 className="text-2xl font-bold mb-6">
➕ Add New Medicine
</h2>


<form 
onSubmit={handleSubmit}
className="grid grid-cols-1 md:grid-cols-2 gap-4"
>


<input
name="name"
value={medicine.name}
onChange={handleChange}
placeholder="Medicine name"
className="border p-3 rounded"
/>


<input
name="category"
value={medicine.category}
onChange={handleChange}
placeholder="Category"
className="border p-3 rounded"
/>



<input
name="price"
value={medicine.price}
onChange={handleChange}
placeholder="Price"
type="number"
className="border p-3 rounded"
/>



<input
name="quantity"
value={medicine.quantity}
onChange={handleChange}
placeholder="Quantity"
type="number"
className="border p-3 rounded"
/>



<input
name="expiry"
value={medicine.expiry}
onChange={handleChange}
type="date"
className="border p-3 rounded"
/>



<button
type="submit"
className="bg-green-600 text-white rounded p-3 md:col-span-2 hover:bg-green-700"
>

Save Medicine

</button>



</form>


</div>

)

}


export default AddMedicine;