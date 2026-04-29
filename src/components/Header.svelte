<script>
	import { SITE_TITLE } from '../consts';

	let { currentPath = '/' } = $props();

	let isDark = $state(false);
	let isScrolled = $state(false);

	$effect(() => {
		const saved = localStorage.getItem('alfarrabios_mode');
		isDark = saved === 'dark';
		document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

		function onScroll() {
			isScrolled = window.scrollY > 8;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toggleTheme() {
		isDark = !isDark;
		const next = isDark ? 'dark' : 'light';
		localStorage.setItem('alfarrabios_mode', next);
		document.documentElement.dataset.theme = next;
	}

	function isActive(href) {
		if (href === currentPath) return true;
		if (href !== '/' && currentPath.startsWith(href)) return true;
		return false;
	}
</script>

<header class="site-header {isScrolled ? 'scrolled' : ''}" id="site-header" role="banner" aria-label="Cabeçalho principal">
	<div class="container">
		<nav class="nav" aria-label="Navegação principal">
			<div class="nav-left">
				<a class="nav-brand" href="/" aria-label="Início">
					<img src="/favicon-adi.png" alt="Logo Adi" width="32" height="32" class="logo-img" />
					<span class="brand-text">{SITE_TITLE}</span>
				</a>
				<div class="nav-links">
					<a href="/blog" class:active={isActive('/blog')}>Textos</a>
					<a href="/locais" class:active={isActive('/locais')}>Locais</a>
					<a href="/sobre" class:active={isActive('/sobre')}>Sobre</a>
				</div>
			</div>

			<div class="nav-right">
				<a class="icon-btn" href="/buscar" aria-label="Buscar" title="Buscar">
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="1.2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
						/>
					</svg>
					<span class="sr-only">Buscar</span>
				</a>

				<button class="icon-btn" type="button" aria-label="Modo leitura" title="Modo leitura" onclick={toggleTheme}>
					{#if !isDark}
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="1.2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16v2m0 16v2m10-10h-2M4 12H2m17.07 7.07-1.41-1.41M8.34 8.34 6.93 6.93m12.14 0-1.41 1.41M8.34 15.66l-1.41 1.41"
						/>
					</svg>
					{:else}
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="1.2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 12.2A8.5 8.5 0 1 1 11.8 3a6.5 6.5 0 0 0 9.2 9.2Z"
						/>
					</svg>
					{/if}
					<span class="sr-only">Modo leitura</span>
				</button>
			</div>
		</nav>
	</div>
</header>

<style>
	/* Some base global css classes referenced are expected to be available globally */
	/* We only put scoped header-specific stuff here */

	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: transparent;
		transition: background 0.2s ease, border-bottom 0.2s ease, backdrop-filter 0.2s ease;
		border-bottom: 1px solid transparent;
		padding: var(--space-md) 0;
	}

	.site-header.scrolled {
		background: rgba(250, 245, 239, 0.85); /* --bg-primary */
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border-light);
		padding: var(--space-sm) 0;
	}

	:global(:root[data-theme='dark']) .site-header.scrolled {
		background: rgba(26, 26, 26, 0.85);
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-left, .nav-right {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.nav-brand {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		text-decoration: none;
		color: var(--text-primary);
		font-family: var(--font-title);
		font-weight: 700;
		font-size: 1.2rem;
	}

	.nav-links {
		display: flex;
		gap: var(--space-md);
		margin-left: var(--space-md);
	}

	.nav-links a {
		text-decoration: none;
		color: var(--text-secondary);
		font-family: var(--font-ui);
		font-weight: 500;
		transition: color 0.2s ease;
		display: inline-block;
	}

	.nav-links a:hover, .nav-links a.active {
		color: var(--text-primary);
	}

	.nav-links a.active {
		font-weight: 600;
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 4px;
	}

	.logo-img {
		border-radius: 50%;
		background: var(--bg-primary);
		border: 1px solid var(--border-light);
	}

	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-button, 50%);
		border: 1px solid var(--border-light);
		background: rgba(255, 255, 255, 0.6);
		color: var(--text-primary);
		text-decoration: none;
		cursor: pointer;
		transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
		padding: 0;
	}

	.icon-btn:hover {
		border-color: var(--border-card);
		box-shadow: 0 4px 6px rgba(0,0,0,0.05); /* shadow-card approx */
	}

	:global(:root[data-theme='dark']) .icon-btn {
		background: rgba(34, 31, 26, 0.7);
	}

	.icon {
		width: 20px;
		height: 20px;
		display: inline-block;
	}

	.sr-only {
		border: 0;
		padding: 0;
		margin: 0;
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (max-width: 620px) {
		.brand-text {
			display: none;
		}
		.nav-brand {
			margin-right: var(--space-sm);
		}
		.nav-links {
			margin-left: 0;
			gap: var(--space-sm);
		}
	}
</style>
