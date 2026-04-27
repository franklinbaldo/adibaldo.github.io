<script>
	let scrollPercent = $state(0);

	$effect(() => {
		function onScroll() {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			scrollPercent = (scrollTop / docHeight) * 100;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll(); // initial state

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div id="progress-container">
	<div id="progress-bar" style="width: {scrollPercent}%"></div>
</div>

<style>
	#progress-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		z-index: 100;
		background: transparent;
		pointer-events: none;
	}

	#progress-bar {
		height: 100%;
		background: var(--accent-primary);
		width: 0%;
		transition: width 0.1s;
	}
</style>
