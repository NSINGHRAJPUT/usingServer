var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);
var myobj={};
var myobj1;
// Add item
function addItem(e){
  e.preventDefault();
  var newItem = document.getElementById('name').value;
  var newItem1 = document.getElementById('email').value;
  var newItem2 = document.getElementById('number').value;
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem1));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem2));
  li.appendChild(document.createTextNode(" "));
  var deleteBtn = document.createElement('button');
  var editBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  editBtn.className = 'btn btn-warning btn-sm edit';
  deleteBtn.appendChild(document.createTextNode('Delete'));
  editBtn.appendChild(document.createTextNode('Edit'))
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  itemList.appendChild(li);
  myobj={
    name:`${newItem}`,
    email:`${newItem1}`,
    number:`${newItem2}`
  }
  axios.post('https://crudcrud.com/api/11db9ab287d847c9ab86a017db3eebcb/bookappointment', myobj)
       .then(res => console.log(res))
       .catch(err => console.log(err))
}
window.addEventListener('DOMContentLoaded', ()=> {
  axios.get('https://crudcrud.com/api/11db9ab287d847c9ab86a017db3eebcb/bookappointment')
       .then((res) => {
        for(var i=0;i<res.data.length;i++){
          showUseronScreen(res.data[i])
        }
       })
})
function showUseronScreen(obj){
  let newItem= obj.name;
  let newItem1=obj.email;
  let newItem2=obj.number;
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem1));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem2));
  li.appendChild(document.createTextNode(" "));
  var deleteBtn = document.createElement('button');
  var editBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  editBtn.className = 'btn btn-warning btn-sm edit';
  deleteBtn.appendChild(document.createTextNode('Delete'));
  editBtn.appendChild(document.createTextNode('Edit'))
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  itemList.appendChild(li);
}


// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}
function editItem(e){
    if(e.target.classList.contains('edit')){
        let x=e.target.parentElement.textContent
        console.log(x)
        var num = `${x}`.match(/\d+/g);
        let obj = JSON.parse(localStorage.getItem(`${num[1]}`))
        console.log(obj.name)
        document.getElementById('name').value=obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('number').value =obj.number;
        localStorage.removeItem(num[1]);
        var li=e.target.parentElement;
        itemList.removeChild(li);
    }
}

