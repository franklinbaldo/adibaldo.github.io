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

<div class="grid post-grid-home">
	{#each visiblePosts as post (post.id)}
		<a href={'/blog/' + post.id + '/'} class="card post-card-home">
			<div class="post-thumb-home">
				{#if post.data.heroImage}
					<img src={post.data.heroImage.src} alt={post.data.heroImageAlt || post.data.title} loading="lazy" />
				{:else}
					<div class="post-thumb-fallback-home"></div>
				{/if}
			</div>
			<div class="post-card-body-home">
				<p class="meta">
					<time datetime={toISODate(post.data.pubDate)}>{formatDate(post.data.pubDate)}</time>
				</p>
				<h3 class="card-title">{post.data.title}</h3>
				<p class="card-desc">{post.data.description}</p>
			</div>
		</a>
	{/each}
</div>

{#if hasMore}
	<div class="load-more-wrap">
		<button class="btn-load-more" type="button" onclick={loadMore}>
			Carregar mais
		</button>
	</div>
{/if}

<style>
	.post-grid-home {
		grid-template-columns: repeat(4, 1fr);
	}

	.post-card-home {
		padding: 0;
		overflow: hidden;
		min-height: 0;
		transition: transform 0.25s ease, box-shadow 0.25s ease;
	}

	.post-card-home:hover {
		transform: translateY(-3px);
	}

	.post-thumb-home {
		aspect-ratio: 3 / 2;
		overflow: hidden;
		background: var(--tag-bg);
		border-bottom: 1px solid var(--border-light);
	}

	.post-thumb-home img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0;
		transition: transform 0.35s ease;
	}

	.post-card-home:hover .post-thumb-home img {
		transform: scale(1.04);
	}

	.post-thumb-fallback-home {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
	}

	.post-card-body-home {
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	@media (max-width: 980px) {
		.post-grid-home {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 620px) {
		.post-grid-home {
			grid-template-columns: 1fr;
		}
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
