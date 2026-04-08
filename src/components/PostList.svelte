<script>
  export let posts = [];
  export let initialCount = 8;

  let visibleCount = initialCount;

  $: visiblePosts = posts.slice(0, visibleCount);
  $: hasMore = visibleCount < posts.length;

  function loadMore() {
    visibleCount += 8;
  }
</script>

<ul class="post-text-list">
  {#each visiblePosts as post}
    <li class="post-text-list-item">
      <p class="post-text-meta">
        {new Date(post.pubDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })}
        -
        <a href={`/blog/${post.id}/`} class="post-text-link">{post.title}</a>
      </p>
      <p class="post-text-desc">{post.description}</p>
    </li>
  {/each}
</ul>

{#if hasMore}
  <div class="load-more-wrap">
    <button class="btn-load-more" type="button" on:click={loadMore}>
      Carregar mais
    </button>
  </div>
{/if}

<style>
  .post-text-list {
    list-style-type: none;
    padding-left: 0;
  }
  .post-text-list-item {
    margin-bottom: 24px;
  }
  .post-text-meta {
    margin-bottom: 0.5rem;
    color: #5a4b40;
    font-size: 0.9em;
  }
  .post-text-link {
    font-weight: 600;
    text-decoration: underline;
    color: #2c2420;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .post-text-link:hover {
    color: #8b5a2b;
  }
  .post-text-link:focus-visible {
    outline: 2px solid #8b5a2b;
    outline-offset: 2px;
    border-radius: 4px;
  }
  .post-text-link:active {
    color: #a06834;
  }
  .post-text-desc {
    margin-bottom: 1.5rem;
    color: #5a4b40;
  }
  .load-more-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .btn-load-more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #8b5a2b;
    color: #ffffff;
    border: 1px solid transparent;
    border-radius: 24px;
    padding: 8px 40px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-load-more:hover {
    background: #a06834;
  }
  .btn-load-more:focus-visible {
    outline: 2px solid #8b5a2b;
    outline-offset: 2px;
  }
  .btn-load-more:active {
    transform: scale(0.98);
  }

  /* Dark mode */
  :global(:root[data-theme='dark']) .post-text-meta,
  :global(:root[data-theme='dark']) .post-text-desc {
    color: #cbbcab;
  }
  :global(:root[data-theme='dark']) .post-text-link {
    color: #e8ddd0;
  }
  :global(:root[data-theme='dark']) .post-text-link:hover {
    color: #c4a265;
  }
  :global(:root[data-theme='dark']) .post-text-link:focus-visible {
    outline-color: #c4a265;
  }
  :global(:root[data-theme='dark']) .post-text-link:active {
    color: #c4a265;
  }

  /* btn-load-more stays the same color in dark mode (accent-primary is solid) */
  :global(:root[data-theme='dark']) .btn-load-more:focus-visible {
    outline-color: #c4a265;
  }
</style>
