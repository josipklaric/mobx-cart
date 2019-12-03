var courses       = document.querySelector('#courses-list');
var cartContent   = document.querySelector('#cart-content tbody');
var clearCartBtn  = document.querySelector("#clear-cart");
var coursesList   = [];

setEvents();

function setEvents() {
  courses.addEventListener('click', buyCourse);
  cartContent.addEventListener('click', removeCourse);
  clearCartBtn.addEventListener('click', clearCart);
}

function buyCourse(e){
  e.preventDefault();

   if (e.target.classList.contains("add-to-cart")) {
       const course = e.target.parentElement.parentElement;
       getCourseInfo(course);
   }
}

function getCourseInfo(course){
  const courseInfo = {
    id    : course.querySelector('a').getAttribute('data-id'),
    title : course.querySelector('h4').textContent,
    price : course.querySelector('.price').textContent
  }

   addToCart(courseInfo);
   coursesList.push(courseInfo);
}

function addToCart(courseInfo){

  const row = document.createElement('tr');
  row.appendChild(addToCell(courseInfo.title, 0));
  row.appendChild(addToCell(courseInfo.price, 0));
 
  const anchor = document.createElement('a');
  anchor.href = '#';
  anchor.setAttribute('data-id', courseInfo.id);
  anchor.textContent = 'X';
  anchor.classList = 'remove';

  row.appendChild(addToCell(anchor,1));

  cartContent.appendChild(row);
}

function addToCell(info, i) {
  const  td = document.createElement('td');
  if (i == 0) {
    td.textContent = info
  }
  else {
    td.appendChild(info);
  }
  return td
}

function updateCart() {
  coursesList.forEach(function(course){
     addToCart(course);
  })
}

function removeCourse(e) {
  if (e.target.classList.contains('remove')){
      let id = e.target.getAttribute('data-id');
      deleteFromLocalStorage(id);
      e.target.parentElement.parentElement.remove();
  }
}

function clearCart(e){
  e.preventDefault();
  while(cartContent.firstChild){
    cartContent.removeChild(cartContent.firstChild);
  }
  coursesList = [];
}

function deleteFromLocalStorage(id){
  coursesList.forEach(function(course,i){
      if (course.id === id){
        coursesList.splice(i,1)
      }
  })
}

function buildCourses() {
  coursesCollection.forEach(function(course){
    
    const rowDiv = document.createElement('div');
    rowDiv.classList = 'row';
    
    const infoDiv = document.createElement('div');
    infoDiv.classList = "nine columns";

    const cardDiv = document.createElement('div');
    cardDiv.classList = "card";

    const titleElement = document.createElement('h4');
    titleElement.textContent = course.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = course.author;
    
    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(authorElement);

    infoDiv.appendChild(cardDiv);

    const priceDiv = document.createElement('div');
    priceDiv.classList = "one columns";

    const priceElement = document.createElement('p');
    priceElement.classList = "price";
    priceElement.textContent = "$" + course.price;
    priceDiv.appendChild(priceElement);

    const buyDiv = document.createElement('div');
    buyDiv.classList = "two columns";

    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.textContent = 'Buy';
    anchor.classList = 'button-primary button input add-to-cart';
    anchor.setAttribute('data-id', course.id);
    
    buyDiv.appendChild(anchor);

    rowDiv.appendChild(infoDiv);
    rowDiv.appendChild(priceDiv);
    rowDiv.appendChild(buyDiv);

    courses.appendChild(rowDiv);
 })
}

var coursesCollection = [
  {"id":"1","title":"HTML5, CSS3 and JavaScript for beginners","author": "Ervin Howell","price":"30"},
  {"id":"2","title":"Start Cooking today","author": "Leanne Graham","price":"35"},
  {"id":"3","title":"Guitar for beginners","author": "Tobias Funke","price":"50"},
  {"id":"4","title":"Lear how to save home energy","author": "George Edwards","price":"20"},
  {"id":"5","title":"Christmas decorations with recycled products","author": "Rachel Howell","price":"40"},
  {"id":"6","title":"Web Design for beginners","author": "Michael Lawson","price":"80"},
  {"id":"7","title":"Electric guitar for beginners","author": "Byron Fields","price":"50"},
  {"id":"8","title":"Build your own Music Studio","author": "Nicholas Runoltir","price":"45"},
  {"id":"9","title":"Delicious home made cookies","author": "Glenna Reichert","price":"25"},
  {"id":"10","title":"Modern JavaScript","author": "Kurtis Weissnat","price":"35"},
  {"id":"11","title":"Harvest your own fruits and vegetables","author": "Chelsey Dietrich","price":"30"},
  {"id":"12","title":"Learn to cook mexican food","author": "Clementine Bauch","price":"25"}
];

buildCourses();