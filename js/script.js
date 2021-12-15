/*global constants*/
const studentList = document.querySelector(".student-list");
const page_list = document.querySelector('.link-list');
const header = document.querySelector('header');

//small helper function
function setUp(elementName, property, value){
   const el = document.createElement(elementName);
   el[property] = value;
   return el;
}
function search(e){
   const regex = new RegExp(e.target.value, "ig");
   const filter_list = [];
   for(let i = 0; i < data.length; i++){
      if( regex.test(`${data[i].name.first} ${data[i].name.last}`) ){
         filter_list.push(data[i]);
      }
   }
   
   if(filter_list.length === 0){
      const msg = setUp("li", "textContent", "No results found");
      msg.className = "no-results"
      studentList.innerHTML = "";
      studentList.append(msg);
      page_list.innerHTML = "";
   }else{
      showPage(filter_list,1);
      addPagination(filter_list);
   }


}

//inserts the search bar into the header
function insertSearch(){

   const label = setUp("label", "className", "student-search");
   label.htmlFor = "search";

   const span = setUp("span", "textContent", "Search by name");

   const input = setUp("input", "id", "search");
   input.placeholder = "Search by Name...";

   const button = setUp("button", "type", "button");
   const img = setUp("img", "src", "img/icn-search.svg");
   img.alt = "Search icon";
   button.append(img);
   
   label.append(span);
   label.append(input);
   label.append(button);

   header.append(label);
}

//listener function
function nextPage(e){
   const active = document.querySelector('.active');
   active.className = "";

   const btn = e.target;
   btn.className = "active";
   showPage(data, btn.textContent);
}

//shows the currently active page
function showPage(list, page){

   const perPage = 9;
   const start = (page*perPage)-perPage;
   const end = page*perPage;
   studentList.innerHTML = "";
   for(i = 0; i < list.length; i++){
      if(i>=start && i<end){
         const obj = list[i];
         const name_obj = obj.name;

         const li = setUp("li", "className", "student-item cf");
         const div = setUp("div", "className", "student-details");

         const img = setUp("img", "className", "avatar");
         img.src = obj.picture.thumbnail;
         img.alt = "Profile Picture"

         const h3 = setUp("h3", "textContent", `${name_obj.first} ${name_obj.last}`);

         const span = setUp("span", "className", "email");
         span.textContent = obj.email;

         div.append(img)
         div.append(h3)
         div.append(span);

         const div2 = setUp("div", "className", "joined-details");

         const span2 = setUp("span", "className", "date");
         span2.textContent = `Joined ${obj.registered.date}`;
         
         div2.append(span2);

         li.append(div);
         li.append(div2);
         studentList.append(li);
      }
   }
}


//makes button displays for ciel(listlength/9)
function addPagination(list){
   function makeBtn(count){
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = "button";
      btn.textContent = count;
      if(count === 1){
         btn.className = "active";
      }
      li.append(btn);
      return li;
   }
   const numOfButtons = Math.ceil(list.length/9);
   page_list.innerHTML = "";

   for(let i = 0; i < numOfButtons; i++){
      const li = makeBtn(i+1);
      page_list.append(li);
   }
}


// Call functions
insertSearch();
showPage(data,1);
addPagination(data);
page_list.addEventListener("click", nextPage);
header.addEventListener("keyup", search);

