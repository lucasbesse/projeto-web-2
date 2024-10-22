
$.ajax({
  url: 'https://jsonplaceholder.typicode.com/posts',
  type: 'GET',
  success: function(data) {
    console.log(data);
    var container = $('#postsContainer');

    data.forEach(function(post) {
        var postElement = `
            <div class="post">
            </div>
        `;

        container.append(postElement);
    });
  }
});
