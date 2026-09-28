const nav = document.querySelector('.navbar');
document.querySelector('.menu').addEventListener('click', () => nav.classList.toggle('open'));

const cart = [];
const cartEl = document.getElementById('cart');
const backdrop = document.getElementById('cartBackdrop');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function renderCart(){
  cartItems.innerHTML = cart.length ? cart.map((item,i)=>`
    <div style="padding:15px 0;border-bottom:1px solid #eee;display:flex;justify-content:space-between;gap:12px">
      <div><strong>${item.name}</strong><div style="font-size:12px;color:#777">₹${item.price}</div></div>
      <button onclick="removeItem(${i})" style="border:0;background:none;cursor:pointer">Remove</button>
    </div>`).join('') : '<p style="color:#777;padding:25px 0">Your cart is empty.</p>';
  cartCount.textContent = cart.length;
  cartTotal.textContent = '₹' + cart.reduce((sum,x)=>sum+x.price,0).toLocaleString('en-IN');
}
window.removeItem = (i) => { cart.splice(i,1); renderCart(); };

document.querySelectorAll('[data-product]').forEach(btn => {
  btn.addEventListener('click', () => {
    cart.push({name:btn.dataset.product, price:Number(btn.dataset.price)});
    renderCart();
    cartEl.classList.add('open');
    backdrop.classList.add('show');
  });
});
document.getElementById('cartFab').onclick = () => { cartEl.classList.add('open'); backdrop.classList.add('show'); };
document.getElementById('closeCart').onclick = () => { cartEl.classList.remove('open'); backdrop.classList.remove('show'); };
backdrop.onclick = () => { cartEl.classList.remove('open'); backdrop.classList.remove('show'); };

document.getElementById('checkout').onclick = () => {
  if(!cart.length) return alert('Your cart is empty.');
  alert('Demo checkout: connect this button to your preferred payment/order system.');
};

document.getElementById('leadForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('formMessage').textContent = 'Thanks! Your enquiry has been captured in this demo.';
  e.target.reset();
});

renderCart();
