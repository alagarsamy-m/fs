let currentUser = "";
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let followers = JSON.parse(localStorage.getItem("followers")) || {};

function login() {
  currentUser = document.getElementById("username").value;
  if (currentUser) {
    document.getElementById("username").disabled = true;
    document.querySelector("button").disabled = true;
    document.getElementById("content-section").style.display = "block";
    loadFeed();
  } else {
    alert("Please enter a username!");
  }
}

function postContent() {
  const content = document.getElementById("post-content").value;
  if (content) {
    const post = {
      user: currentUser,
      content: content,
      timestamp: new Date().toLocaleString(),
    };
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("post-content").value = "";
    loadFeed();
  } else {
    alert("Please enter some content to post!");
  }
}

function followUser() {
  const userToFollow = document.getElementById("follow-user").value;
  if (userToFollow && userToFollow !== currentUser) {
    if (!followers[currentUser]) {
      followers[currentUser] = [];
    }
    if (!followers[currentUser].includes(userToFollow)) {
      followers[currentUser].push(userToFollow);
      localStorage.setItem("followers", JSON.stringify(followers));
      alert(`You are now following ${userToFollow}`);
    } else {
      alert("You already follow this user.");
    }
    document.getElementById("follow-user").value = "";
  } else {
    alert("Please enter a valid username to follow!");
  }
}

function loadFeed() {
  const feedDiv = document.getElementById("feed");
  feedDiv.innerHTML = "";
  posts.forEach((post) => {
    if (
      (followers[currentUser] && followers[currentUser].includes(post.user)) ||
      post.user === currentUser
    ) {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `<strong>${post.user}</strong> <small>${post.timestamp}</small><p>${post.content}</p>`;
      feedDiv.appendChild(postDiv);
    }
  });
}
