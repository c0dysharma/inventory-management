/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-unresolved
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

// Get usable components
const getItemsBtn = document.getElementById('read');
const createForm = document.getElementById('create');
const updateForm = document.getElementById('update');
const itemList = document.getElementById('itemList');

// what to render for an item
const itemLi = (item) => {
  const delBtn = `<button value='${item._id}' class='delbtn' >Delete</button>`;
  return `<li> 
  ${item.name} - $${item.price}: Quanity:${item.quantity} ${delBtn}
  <br>
  id- ${item._id}
  <br><br>
  </li>`;
};

// Read operation
const getItems = (e) => {
  e.preventDefault();
  fetch('http://localhost:3000/api/v1/item');
};

// create operation
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

// update operation
const updateItems = (e) => {
  e.preventDefault();
  const formProps = Object.fromEntries(new FormData(e.target));
  const { id } = formProps;

  // remove empty input from payload
  for (const key of Object.keys(formProps)) {
    if (formProps[key].trim() === '') delete formProps[key];
  }
  fetch(`http://localhost:3000/api/v1/item/${id}`, {
    method: 'put',
    body: JSON.stringify(formProps),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// delete operation
const deleteItem = (e) => {
  e.preventDefault();
  const id = e.target.value;
  fetch(`http://localhost:3000/api/v1/item/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// used to render items on canvas
const renderItems = (items) => {
  let res = '';
  items.forEach((item) => {
    res += itemLi(item);
  });
  itemList.innerHTML = res;

  // add delete btns to them
  const delBtns = document.getElementsByClassName('delbtn');
  for (const btn of delBtns) {
    btn.addEventListener('click', deleteItem);
  }
};

// event listeners for components
getItemsBtn.addEventListener('click', getItems);
createForm.addEventListener('submit', createItem);
updateForm.addEventListener('submit', updateItems);

// socket io connections
// and handling events
const socket = io();
socket.on('connect', () => {
  // get inital values
  fetch('http://localhost:3000/api/v1/item');
});
socket.on('items', (res) => {
  // render whenever something changes
  console.log(`Got this from server ${JSON.stringify(res)}`);
  renderItems(res.data);
});
