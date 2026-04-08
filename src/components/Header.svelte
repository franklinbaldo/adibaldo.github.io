<script lang="ts">
  import { onMount } from 'svelte';

  export let siteTitle: string;
  export let currentPath: string;

  let isDark = false;
  let isScrolled = false;

  onMount(() => {
    // Inicializa o modo escuro a partir do localStorage
    const saved = localStorage.getItem('alfarrabios_mode');
    isDark = saved === 'dark';
    applyMode(isDark ? 'dark' : 'light');

    // Inicializa o scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function applyMode(mode: 'dark' | 'light') {
    document.documentElement.dataset.theme = mode;
  }

  function toggleMode() {
    isDark = !isDark;
    const nextMode = isDark ? 'dark' : 'light';
    localStorage.setItem('alfarrabios_mode', nextMode);
    applyMode(nextMode);
  }

  function handleScroll() {
    isScrolled = window.scrollY > 8;
  }

  function isActive(href: string) {
    if (!currentPath) return false;
    const pathname = currentPath.replace(import.meta.env.BASE_URL, '');
    const subpath = pathname.match(/[^\/]+/g);
    return href === pathname || href === '/' + (subpath?.[0] || '');
  }
</script>

<header class="site-header" class:scrolled={isScrolled}>
  <div class="container">
    <nav class="nav" aria-label="Navegação principal">
      <div class="nav-left">
        <a class="nav-brand" href="/" aria-label="Início">
          <img src="/favicon-adi.png" alt="Logo Adi" width="32" height="32" class="logo-img" />
          <span class="brand-text">{siteTitle}</span>
        </a>
        <div class="nav-links">
          <a href="/blog" class:active={isActive('/blog')} aria-current={isActive('/blog') ? "page" : undefined}>Textos</a>
          <a href="/locais" class:active={isActive('/locais')} aria-current={isActive('/locais') ? "page" : undefined}>Locais</a>
          <a href="/sobre" class:active={isActive('/sobre')} aria-current={isActive('/sobre') ? "page" : undefined}>Sobre</a>
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
        </a>

        <button class="icon-btn" type="button" aria-label="Modo leitura" title="Modo leitura" on:click={toggleMode}>
          {#if isDark}
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
          {:else}
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
          {/if}
        </button>
      </div>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 8px 0;
    backdrop-filter: blur(10px);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    background-color: transparent;
  }

  .site-header.scrolled {
    background-color: rgba(250, 245, 239, 0.92);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  }

  :global(:root[data-theme='dark']) .site-header.scrolled {
    background-color: rgba(26, 26, 26, 0.78);
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    font-family: 'Source Sans 3', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #5a4b40;
    text-decoration: none;
    white-space: nowrap;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-brand:hover {
    color: #8b5a2b;
  }
  .nav-brand:focus-visible {
    outline: 2px solid #8b5a2b;
    outline-offset: 2px;
  }
  .nav-brand:active {
    transform: scale(0.98);
  }

  :global(:root[data-theme='dark']) .nav-brand {
    color: #cbbcab;
  }
  :global(:root[data-theme='dark']) .nav-brand:hover {
    color: #c4a265;
  }

  .logo-img {
    border-radius: 50%;
    background: #faf5ef;
    border: 1px solid #e8ddd0;
  }

  :global(:root[data-theme='dark']) .logo-img {
    background: #1a1a1a;
    border-color: rgba(232, 221, 208, 0.15);
  }

  .nav-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .nav-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #2c2420;
    text-decoration: none;
    padding: 10px 8px;
    border-radius: 10px;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1), background 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-links a:hover {
    color: #8b5a2b;
    background: #f3ece3;
  }
  .nav-links a:focus-visible {
    outline: 2px solid #8b5a2b;
    outline-offset: 2px;
  }
  .nav-links a:active {
    transform: scale(0.98);
  }

  .nav-links a.active {
    font-weight: 600;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
    text-decoration-color: #8b5a2b;
  }

  :global(:root[data-theme='dark']) .nav-links a {
    color: #e8ddd0;
  }
  :global(:root[data-theme='dark']) .nav-links a:hover {
    color: #c4a265;
    background: #221f1a;
  }
  :global(:root[data-theme='dark']) .nav-links a.active {
    text-decoration-color: #c4a265;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Source Sans 3', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    font-size: 14px;
    padding: 10px 12px;
    border-radius: 24px;
    border: 1px solid #e8ddd0;
    background: rgba(255, 255, 255, 0.6);
    color: #2c2420;
    text-decoration: none;
    cursor: pointer;
    transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), background 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .icon-btn:hover {
    border-color: #d4c4b0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.03);
  }

  .icon-btn:focus-visible {
    outline: 2px solid #8b5a2b;
    outline-offset: 2px;
  }
  .icon-btn:active {
    transform: scale(0.98);
  }

  :global(:root[data-theme='dark']) .icon-btn {
    background: rgba(34, 31, 26, 0.7);
    border-color: rgba(232, 221, 208, 0.15);
    color: #e8ddd0;
  }

  :global(:root[data-theme='dark']) .icon-btn:hover {
    border-color: rgba(232, 221, 208, 0.25);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  }
  :global(:root[data-theme='dark']) .icon-btn:focus-visible {
    outline: 2px solid #c4a265;
  }

  .icon {
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  @media (max-width: 620px) {
    .nav {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0;
    }
    .brand-text {
      display: none;
    }
    .nav-brand {
      margin-right: 8px;
    }
    .nav-left {
      gap: 4px;
    }
    .nav-links {
      gap: 8px;
      font-size: 13px;
    }
    .nav-links a {
      padding: 12px 10px;
      min-height: 44px;
      min-width: 44px;
    }
    .nav-right {
      width: auto;
      gap: 4px;
    }
    .icon-btn {
      padding: 12px;
      min-height: 44px;
      min-width: 44px;
    }
  }
</style>
