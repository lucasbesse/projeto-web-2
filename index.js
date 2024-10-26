
const loadPosts = () => {
  const loading = $('.load-section');
  const content = $('.main-section');
  loading.show();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'GET',
    success: (data) => {
      loading.hide();
      content.show();
      content.css('display', 'flex');

      var container = $('#postsContainer');
  
      data.forEach((post) => {
        var postElement = `
          <div class="post" id="postId-${post.id}" data-post-id="${post.id}">
            <div class="title">
              ${post.title}
            </div>
            <div class="resume">
              ${post.body.replace(/\n/g, '<br>')}
            </div>
            <div class="comments-container" id="commentsContainer-${post.id}"></div>
            <button class="show-comments" data-post-id="${post.id}">Ver comentáros</button>
            <button class="hide-comments" data-post-id="${post.id}">Esconder comentários</button>
            <button class="loading-comments" data-post-id="${post.id}">
              <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="">
              Carregando
            </button>
          </div>
        `;
  
        container.append(postElement);
      });
    }
  });
}

const loadComments = (postId) => {
  const commentsContainer = $(`#commentsContainer-${postId}`);
  const showButton = $(`#postId-${postId} .show-comments`);
  const hideButton = $(`#postId-${postId} .hide-comments`);
  const loadingButton = $(`#postId-${postId} .loading-comments`);

  showButton.hide();
  loadingButton.show();

  const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
  fetch(url)
    .then(response => response.json())
    .then(comments => {
      commentsContainer.empty();
      comments.forEach((comment) => {
        const commentElement = `
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

      loadingButton.hide();
      hideButton.show();
    });
}

const hideComments = (postId) => {
  const commentsContainer = $(`#commentsContainer-${postId}`);
  const showButton = $(`#postId-${postId} .show-comments`);
  const hideButton = $(`#postId-${postId} .hide-comments`);

  commentsContainer.empty();
  hideButton.hide();
  showButton.show();
}

$('#postsContainer').on('click', '.show-comments', function() {
  const button = $(this);
  const postId = button.data('post-id');
  loadComments(postId);
});

$('#mainSection').on('click', '.see-all-comments', function() {
  const button = $(this);
  const loadingButton = $(`.loading-all-comments`);
  const hideButton = $(`.hide-all-comments`);

  button.hide();
  loadingButton.show();

  $('#postsContainer .post').each(function() {
    const postId = $(this).data('post-id');
    loadComments(postId);
  });

  loadingButton.hide();
  hideButton.show();
});

$('#mainSection').on('click', '.hide-all-comments', function() {
  const button = $(this);
  const showButon = $(`.see-all-comments`);

  $('#postsContainer .post').each(function() {
    const postId = $(this).data('post-id');
    hideComments(postId);
  });
  
  button.hide();
  showButon.show();
});

$('#postsContainer').on('click', '.hide-comments', function() {
  const button = $(this);
  const postId = button.data('post-id');
  hideComments(postId);
});

loadPosts();
