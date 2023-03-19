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
  axios.post('https://crudcrud.com/api/42e0cd4e9f75460b89d124df4690b29e/bookappointment', myobj)
       .then(res => console.log(res))
       .catch(err => console.log(err))
}
window.addEventListener('DOMContentLoaded', ()=> {
  axios.get('https://crudcrud.com/api/42e0cd4e9f75460b89d124df4690b29e/bookappointment')
       .then((res) => {
        for(var i=0;i<res.data.length;i++){
          showUseronScreen(res.data[i])
          let obj=JSON.stringify(res.data[i])
          let myobj=JSON.parse(obj)
          localStorage.setItem(myobj.number,obj)
          console.log(myobj)
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
    let x=e.target.parentElement.textContent
        var num = `${x}`.match(/\d+/g);
        let obj = localStorage.getItem(`${num[0]}`)
        if(obj==undefined){
          obj=localStorage.getItem(`${num[1]}`)
        }
        obj=JSON.parse(obj)
        let id=obj._id;
        axios.delete(`https://crudcrud.com/api/42e0cd4e9f75460b89d124df4690b29e/bookappointment/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        localStorage.removeItem(num[0]);
        var li=e.target.parentElement;
        itemList.removeChild(li);
      }
  }
}

function editItem(e){
    if(e.target.classList.contains('edit')){
        let x=e.target.parentElement.textContent
        var num = `${x}`.match(/\d+/g);
        let obj = localStorage.getItem(`${num[0]}`)
        if(obj==undefined){
          obj=localStorage.getItem(`${num[1]}`)
        }
        obj=JSON.parse(obj)
        let id=obj._id;
        document.getElementById('name').value=obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('number').value =obj.number;
        axios.delete(`https://crudcrud.com/api/42e0cd4e9f75460b89d124df4690b29e/bookappointment/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        localStorage.removeItem(num[0]);
        var li=e.target.parentElement;
        itemList.removeChild(li);
    }
}

