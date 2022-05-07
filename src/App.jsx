import { useState } from "react";

const productsList = [
  {
    id: "111222",
    productname: "Keyboard",
    stock: 10,
    price: 2000,
  },
  {
    id: "111223",
    productname: "Mouse",
    stock: 5,
    price: 1500,
  },
  {
    id: "111224",
    productname: "Headphone",
    stock: 7,
    price: 2500,
  },
];

const TableRow = ({
  id,
  productname,
  stock,
  price,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{productname}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button disabled={quantity === stock} onClick={() => increment(id)}>
          +
        </button>
        <button disabled={quantity === 0} onClick={() => decrement(id)}>
          -
        </button>
      </td>
    </tr>
  );
};
function App() {
  const [products, setProducts] = useState(
    productsList.map((item) => {
      return {
        ...item,
        quantity: 0,
        total: 0,
      };
    })
  );

  const incrementQuantity = (id) => {
    const newProducts = products.map((product) => {
      if (id === product.id && product.stock > product.quantity) {
        product.quantity++;
        product.total = product.quantity * product.price;
      }
      return product;
    });
    setProducts(newProducts);
  };
  const decrementQuantity = (id) => {
    const newProducts = products.map((product) => {
      if (id === product.id && product.quantity > 0) {
        product.quantity--;
        product.total = product.quantity * product.price;
      }
      return product;
    });
    setProducts(newProducts);
  };

  const total = products.reduce((acc, cur) => acc + cur.total, 0);
  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              {...product}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            />
          ))}
        </tbody>
      </table>
      {total > 0 && <p>Total: {total} BDT</p>}
    </div>
  );
}

export default App;
