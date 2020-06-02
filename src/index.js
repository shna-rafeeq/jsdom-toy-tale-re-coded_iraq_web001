let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});
//my code
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

//our code

function getToys(){
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(function(json)
 {
   for(const toy of json){
     createNodeElement(toy);
   }
 })
}
function addNewToy(){
  let toyData = {
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  }
  let newToy = {
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
     },
     body: JSON.stringify(toyData)
  }
  return fetch('http://localhost:3000/toys',newToy)
  .then(response => response.json())
  .then(function(json){
    createNodeElement(json);
  })
}
getToys();

function increaseLikes(id, count){
  let newLikes = {
    "likes": count
  }
  let Likes = {
    method: 'PATCH',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
     },
     body: JSON.stringify(newLikes)
  }
  return fetch('http://localhost:3000/toys/'+ id,Likes)
  .then(response => response.json())
  .then(() =>{
    let toyCollection = document.getElementById('toy-collection');
    toyCollection.innerHTML = "";
    getToys();
  })
}

let form = document.getElementsByClassName('add-toy-form')[0];
form.addEventListener('submit',function(e){
  e.preventDefault();
  addNewToy();
})

function createNodeElement(toy){
  let toyCollection = document.getElementById('toy-collection');
  //create toyDiv
  let toyDiv = document.createElement('div');
  toyDiv.classList.add('card');
  toyCollection.appendChild(toyDiv);
 //create toyh2
  let toyh2 = document.createElement('h2');
  toyh2.innerHTML = toy.name;
  toyDiv.appendChild(toyh2);
 //create toyimg
  let toyimg = document.createElement('img');
  toyimg.src = toy.image;
  toyimg.style.width = '150px';
  toyDiv.appendChild(toyimg);
 //create toyp
  let toyp = document.createElement('p');
  toyp.innerHTML = toy.likes + " "+"Likes";
  toyDiv.appendChild(toyp);
 //create toybtn
  let toybtn = document.createElement('button');
  toybtn.innerHTML = "Like ❤";
  toybtn.classList.add('like-btn');
  toybtn.addEventListener('click',function(){
    increaseLikes(toy.id,toy.likes+1);
  });
  toyDiv.appendChild(toybtn);
}
});
