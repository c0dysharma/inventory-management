// eslint-disable-next-line import/no-unresolved
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const getItemsBtn = document.getElementById('read');
const createForm = document.getElementById('create');
const itemList = document.getElementById('itemList');

const itemLi = (item) => {
  const delBtn = `<button value='${item._id}' class='delbtn' >Delete</button>`;
  return `<li> 
  ${item.name} - $${item.price}: Quanity:${item.stock}  ${delBtn}
  </li>`;
};

const getItems = (e) => {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/item');
};

const createItem = (e) => {
  e.preventDefault();
  const formProps = Object.fromEntries(new FormData(e.target));

  fetch('http://localhost:3000/api/v1/item', {
    method: 'post',
    body: JSON.stringify(formProps),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const deleteItem = (e) => {
  e.preventDefault();
  console.log(e);
};

const updateItems = (items) => {
  let res = '';
  items.forEach((item) => {
    res += itemLi(item);
  });
  itemList.innerHTML = res;

  // add delete btns to them
  const delBtns = document.getElementsByClassName('delbtn');
  // eslint-disable-next-line no-restricted-syntax
  for (const btn of delBtns) {
    btn.addEventListener('click', deleteItem);
  }
};

// event listeners
getItemsBtn.addEventListener('click', getItems);
createForm.addEventListener('submit', createItem);

const socket = io();
socket.on('connect', () => {
  // get inital values
  fetch('http://localhost:3000/api/v1/item');
});
socket.on('items', (res) => {
  console.log(`Got this from server ${JSON.stringify(res)}`);
  updateItems(res.data);
});
