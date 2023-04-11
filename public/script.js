// eslint-disable-next-line import/no-unresolved
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const getItemsBtn = document.getElementById('read');
const createForm = document.getElementById('create');
const itemList = document.getElementById('itemList');

const updateItems = (items) => {
  let res = '';
  items.forEach((item) => {
    res += `<ul> ${item.name} - $${item.price}: Quanity:${item.stock} </ul>`;
  });
  itemList.innerHTML = res;
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
  });
};

getItemsBtn.addEventListener('click', getItems);
createForm.addEventListener('submit', createItem);

const socket = io();
socket.on('items', (res) => {
  console.log(`Got this from server ${JSON.stringify(res)}`);
  updateItems(res.data);
});
