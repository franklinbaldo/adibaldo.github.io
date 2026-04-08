<script lang="ts">
  import { onMount } from 'svelte';

  let progress = 0;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  onMount(() => {
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  });
</script>

<div class="progress-container">
  <div class="progress-bar" style:width="{progress}%"></div>
</div>

<style>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 100;
    background: transparent;
    pointer-events: none;
  }

  .progress-bar {
    height: 100%;
    background: #8b5a2b; /* equivalent to accent-primary directly per rules */
    transition: width 100ms linear;
  }

  /* No dark mode variable needed if accent is solid */

  @media print {
    .progress-container {
      display: none !important;
    }
  }
</style>
