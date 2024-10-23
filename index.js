
$.ajax({
  url: 'https://jsonplaceholder.typicode.com/posts',
  type: 'GET',
  success: function(data) {
    console.log(data);
    var container = $('#postsContainer');

    data.forEach(function(post) {
      var postElement = `
        <div class="post" id="postId-${post.id}">
          <div class="title">
            ${post.title}
          </div>
          <div class="resume">
            ${post.body.replace(/\n/g, '<br>')}
          </div>
          <div class="comments-container" id="commentsContainer-${post.id}"></div>
          <button class="show-comments" data-post-id="${post.id}">Ver comentáros</button>
          <button class="hide-comments" data-post-id="${post.id}">Esconder comentários</button>
        </div>
      `;

      container.append(postElement);
    });
  }
});

$('#postsContainer').on('click', '.show-comments', function() {
  const button = $(this);
  const postId = button.data('post-id');
  const commentsContainer = $(`#commentsContainer-${postId}`);
  const hideButton = $(`#postId-${postId} .hide-comments`);

  const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
  fetch(url)
    .then(response => response.json())
    .then(comments => {
      comments.forEach(function(comment) {
        var commentElement = `
          <div class="comment">
            <img src="https://www.svgrepo.com/show/327465/person-circle.svg" alt="User Icon">
            <div class="msg-container">
              <span class="title-msg">${comment.name}</span>
              <span class="msg">${comment.body.replace(/\n/g, '<br>')}</span>
              <span class="email">send by: ${comment.email}</span>
            </div>
          </div>
        `;
        commentsContainer.append(commentElement);
      });
      button.hide();
      hideButton.show();
    });
});

$('#postsContainer').on('click', '.hide-comments', function() {
  const button = $(this);
  const postId = button.data('post-id');
  const commentsContainer = $(`#commentsContainer-${postId}`);
  const showButton = $(`#postId-${postId} .show-comments`);

  commentsContainer.empty();
  button.hide();
  showButton.show();
});