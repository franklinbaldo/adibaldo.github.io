<script>
	let { posts = [], initialCount = 8, batch = 8 } = $props();

	let visibleCount = $state(initialCount);

	let visiblePosts = $derived(posts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < posts.length);

	function loadMore() {
		visibleCount += batch;
	}

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('pt-BR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function toISODate(dateStr) {
		const date = new Date(dateStr);
		return date.toISOString();
	}
</script>

<ul class="post-text-list">
	{#each visiblePosts as post (post.id)}
		<li class="post-text-list-item">
			<p class="post-text-meta">
				<time datetime={toISODate(post.data.pubDate)}>{formatDate(post.data.pubDate)}</time> -
				<a href={'/blog/' + post.id + '/'} class="post-text-link">{post.data.title}</a>
			</p>
			<p class="post-text-desc">{post.data.description}</p>
		</li>
	{/each}
</ul>

{#if hasMore}
	<div class="load-more-wrap">
		<button class="btn-load-more" type="button" onclick={loadMore}>
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
		margin-bottom: var(--space-lg);
	}

	.post-text-meta {
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
		font-size: 0.9em;
	}

	.post-text-link {
		font-weight: 600;
		text-decoration: underline;
		color: var(--text-primary);
	}

	.post-text-link:hover {
		color: var(--accent-primary);
	}

	.post-text-desc {
		margin-bottom: 1.5rem;
		color: var(--text-secondary);
	}

	.load-more-wrap {
		display: flex;
		justify-content: center;
		margin-top: var(--space-xl);
	}

	.btn-load-more {
		background: var(--accent-primary);
		color: white;
		border: none;
		border-radius: var(--radius-button, 24px);
		padding: 12px 28px;
		font-family: var(--font-ui);
		font-weight: 500;
		font-size: 14px;
		letter-spacing: 0.02em;
		cursor: pointer;
		transition: background 0.2s ease, transform 0.15s ease;
	}

	.btn-load-more:hover {
		background: var(--accent-hover);
	}

	.btn-load-more:active {
		transform: scale(0.98);
	}

	.btn-load-more:focus-visible {
		outline: 3px solid var(--accent-primary);
		outline-offset: 3px;
	}
</style>
