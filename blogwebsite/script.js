let currentPage = 1;
const postsPerPage = 3;

let posts = [];
let filteredPosts = [];

// page load
window.onload = function(){

  posts = Array.from(document.querySelectorAll(".blog-card"));
  filteredPosts = posts;

  showPosts();
  loadTheme();
  autoTheme();

  // search
  const searchBox = document.querySelector(".search");

  searchBox.addEventListener("input", function(){

    const text = searchBox.value.toLowerCase();

    filteredPosts = posts.filter(function(post){
      return post.querySelector("h3").innerText.toLowerCase().includes(text);
    });

    currentPage = 1;
    showPosts();

  });

};


// show posts
function showPosts(){

  posts.forEach(function(post){
    post.style.display = "none";
  });

  let start = (currentPage - 1) * postsPerPage;
  let end = start + postsPerPage;

  filteredPosts.slice(start, end).forEach(function(post){
    post.style.display = "block";
  });

}


// next page
function nextPage(){

  if(currentPage * postsPerPage < filteredPosts.length){
    currentPage++;
    showPosts();
  }

}


// previous page
function prevPage(){

  if(currentPage > 1){
    currentPage--;
    showPosts();
  }

}


// add comment
function addComment(id){

  const name = document.getElementById("name-"+id).value;
  const comment = document.getElementById("comment-"+id).value;

  if(name === "" || comment === ""){
    alert("Please write name and comment");
    return;
  }

  const box = document.getElementById("comments-"+id);

  const p = document.createElement("p");
  p.innerHTML = "<b>" + name + "</b>: " + comment;

  box.appendChild(p);

  document.getElementById("name-"+id).value = "";
  document.getElementById("comment-"+id).value = "";

}


// theme toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function(){

  document.body.classList.toggle("dark-mode");

  if(document.body.classList.contains("dark-mode")){
    themeToggle.classList.replace("fa-moon","fa-sun");
    localStorage.setItem("theme","dark");
  }
  else{
    themeToggle.classList.replace("fa-sun","fa-moon");
    localStorage.setItem("theme","light");
  }

});


// load saved theme
function loadTheme(){

  const saved = localStorage.getItem("theme");

  if(saved === "dark"){
    document.body.classList.add("dark-mode");
    themeToggle.classList.replace("fa-moon","fa-sun");
  }

}


// auto theme
function autoTheme(){

  const hour = new Date().getHours();

  if(hour >= 5 && hour < 9){
    document.body.classList.add("sunrise-theme");
  }
  else if(hour >= 9 && hour < 16){
    document.body.classList.add("day-theme");
  }
  else if(hour >= 16 && hour < 19){
    document.body.classList.add("sunset-theme");
  }
  else{
    document.body.classList.add("night-theme");
  }

}