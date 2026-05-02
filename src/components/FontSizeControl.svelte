<script>
	let { size = $bindable('normal') } = $props();

	$effect(() => {
		const savedSize = localStorage.getItem('alfarrabios_fontsize') || 'normal';
		size = savedSize;
		document.documentElement.setAttribute('data-fontsize', size);
	});

	function setSize(newSize) {
		size = newSize;
		localStorage.setItem('alfarrabios_fontsize', newSize);
		document.documentElement.setAttribute('data-fontsize', newSize);
	}
</script>

<div class="font-size-control" aria-label="Tamanho da fonte">
	<span class="label">Fonte:</span>
	<button class="size-btn {size === 'normal' ? 'active' : ''}" onclick={() => setSize('normal')} aria-label="Fonte tamanho normal" title="Normal">A</button>
	<button class="size-btn {size === 'large' ? 'active' : ''}" onclick={() => setSize('large')} aria-label="Fonte tamanho grande" title="Grande" style="font-size: 1.1em;">A</button>
	<button class="size-btn {size === 'xlarge' ? 'active' : ''}" onclick={() => setSize('xlarge')} aria-label="Fonte tamanho extra grande" title="Extra Grande" style="font-size: 1.25em;">A</button>
</div>

<style>
	.font-size-control {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: var(--bg-card, #fff);
		padding: 4px 12px;
		border-radius: var(--radius-button, 20px);
		border: 1px solid var(--border-light, #eaeaea);
		font-family: var(--font-ui, sans-serif);
	}

	:global(:root[data-theme='dark']) .font-size-control {
		background: rgba(34, 31, 26, 0.7);
	}

	.label {
		font-size: 0.85rem;
		color: var(--text-secondary, #666);
		margin-right: 4px;
	}

	.size-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary, #666);
		cursor: pointer;
		padding: 4px 6px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		transition: color 0.2s ease, background 0.2s ease;
	}

	.size-btn:hover {
		color: var(--text-primary, #1a1a1a);
		background: rgba(0, 0, 0, 0.05);
	}

	:global(:root[data-theme='dark']) .size-btn:hover {
		color: var(--text-primary, #f5f5f5);
		background: rgba(255, 255, 255, 0.1);
	}

	.size-btn.active {
		color: var(--accent-primary, #b87942);
	}
</style>
