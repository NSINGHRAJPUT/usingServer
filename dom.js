var form = document.getElementById('addForm');
var eitemList = document.getElementById('eitems');
var fitemList = document.getElementById('fitems');
var sitemList = document.getElementById('sitems');
// Form submit event
form.addEventListener('submit', addItem);
// Delete event
eitemList.addEventListener('click', removeItem);
fitemList.addEventListener('click', removeItem);
sitemList.addEventListener('click', removeItem);
var myobj={};
var myobj1;
// Add item
function addItem(e){
  e.preventDefault();
  var newItem = document.getElementById('price').value;
  var newItem1 = document.getElementById('category').value;
  var newItem2 = document.getElementById('pname').value;
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem1));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem2));
  li.appendChild(document.createTextNode(" "));
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('Delete'));
  li.appendChild(deleteBtn);
  let val=document.getElementById('category').value
  if(val == 'Electronic Items'){
    eitemList.appendChild(li);  
  }else if(val == 'Food Items'){
    fitemList.appendChild(li);
  }else{
    sitemList.appendChild(li);
  }
  myobj={
    price:`${newItem}`,
    category:`${newItem1}`,
    pname:`${newItem2}`
  }
  console.log(myobj)
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
          localStorage.setItem(myobj.price,obj)
          console.log(myobj)
        }
       })
})
function showUseronScreen(obj){
  let newItem= obj.price;
  let newItem1=obj.category;
  let newItem2=obj.pname;
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem1));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(newItem2));
  li.appendChild(document.createTextNode(" "));
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('Delete Product'));
  li.appendChild(deleteBtn);
  let val=obj.category
  if(val == 'Electronic Items'){
    eitemList.appendChild(li);  
  }else if(val == 'Food Items'){
    fitemList.appendChild(li);
  }else{
    sitemList.appendChild(li);
  }
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
        let val=obj.category;
        if(val == 'Electronic Items'){
          eitemList.removeChild(li);  
        }else if(val == 'Food Items'){
          fitemList.removeChild(li);
        }else{
          sitemList.removeChild(li);
        }
      }
  }
}

