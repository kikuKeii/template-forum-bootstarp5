let postMain = document.querySelector("#postList");
let threadsSideRight = document.querySelector("#threadsList");
const url = new URL(window.location);
const param = url.searchParams;
let post = param.get("post");
if (window.location.origin == "https://kikukeii.github.io") {
  var base_url = "https://kikukeii.github.io/template-forum-bootstarp5";
} else {
  var base_url = "";
}
fetch(base_url + "/assets/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.thread.forEach((e) => {
      threadsSideRight.innerHTML += `<a href="${base_url}/threads/${e.slug}" class="btn btn-primary">
      ${e.name} <span class="badge text-bg-secondary">4</span>
    </a>`;
    });

    // home page
    if (!post) {
      data.post.forEach((e) => {
        let thread = [];
        data.post_thread.forEach((pt) => {
          if (pt.post_id == e.id) {
            thread[pt.thread_id] = data.thread.find(
              (thread) => thread.id == pt.thread_id
            ).name;
          }
        });
        const threads = split(thread).join(", ");
        postMain.innerHTML += `
      <div class="col py-2">
              <div class="card">
                <div class="card-header">${threads}</div>
                <div class="card-body">
                  <h5 class="card-title">${e.title}</h5>
                  <p class="card-text">
                    ${e.content.substring(0, 80)}...
                    </p>
                    <a href="${base_url}/post/?post=${
          e.slug
        }" class="btn btn-primary"
                    >Go somewhere</a
                  >
                </div>
              </div>
            </div>
      `;
      });
    }

    // post Page
    if (post) {
      let thread = [];
      post = data.post.find((e) => e.slug == post);
      data.post_thread.forEach((pt) => {
        if (pt.post_id == post.id) {
          thread[pt.thread_id] = data.thread.find(
            (thread) => thread.id == pt.thread_id
          ).name;
        }
      });
      const threads = split(thread).join(", ");
      document.getElementById("postTitle").innerHTML = post.title;
      document.getElementById("postThread").innerHTML = threads;
      document.getElementById("contentBody").innerHTML = `
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.content}</p>
      `;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const split = (data) => {
  return data.filter((item) => item !== "empty");
};
