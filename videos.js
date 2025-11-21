// IIFE to encapsulate the video functionality
(function () {
	// Helpers
	const $ = (sel, parent = document) => (parent || document).querySelector(sel);
	const $$ = (sel, parent = document) => Array.from((parent || document).querySelectorAll(sel || ''));
	const safeText = (el, txt) => { if (el) el.textContent = (txt ?? ''); };
	const safeHTML = (el, html) => { if (el) el.innerHTML = (html ?? ''); };

	// Sample video data (merge with your real data if present)
	const videos = [
		{ id: 1, title: 'iPhone 12 — Full Review', description: 'Comprehensive review.', duration: '15:30', views: '24K', date: 'Jan 15, 2024', category: 'reviews', thumbnail: 'images/iphone12.jpg', embed: 'https://www.youtube.com/embed/VIDEO_ID_1', specs: [{k:'Battery',v:'2815 mAh'}] },
		{ id: 2, title: 'Galaxy S21 Unboxing', description: 'Unboxing and first impressions.', duration: '08:42', views: '12K', date: 'Feb 10, 2024', category: 'unboxing', thumbnail: 'images/galaxy-s21.jpg', embed: 'https://www.youtube.com/embed/VIDEO_ID_2', specs: [{k:'RAM',v:'8 GB'}] }
	];

	document.addEventListener('DOMContentLoaded', () => {
		// Guarded element lookups
		const videosGrid = $('#videosGrid');
		const featuredGrid = $('#featuredVideos');
		const videoModal = $('#videoModal');
		const videoPlayer = $('#videoPlayer');
		const videoModalTitle = $('#videoModalTitle');
		const videoModalDescription = $('#videoModalDescription');
		const videoModalDuration = $('#videoModalDuration');
		const videoModalDate = $('#videoModalDate');
		const videoModalViews = $('#videoModalViews');
		const videoSpecs = $('#videoSpecs');
		const searchBox = $('#videoSearch');
		const categoryBtns = $$('.category-btn-enhanced');
		const closeModalBtn = $('#closeVideoModal');

		// Create card safely
		function createVideoCard(v) {
			const div = document.createElement('div');
			div.className = 'video-card-enhanced';
			div.dataset.id = String(v.id);
			div.innerHTML = `
				<div class="video-thumbnail-enhanced">
					<img src="${v.thumbnail || 'images/placeholder.jpg'}" alt="${v.title}">
					<span class="video-badge">${v.category || ''}</span>
					<span class="video-duration-enhanced">${v.duration || ''}</span>
					<div class="play-button-enhanced"><i class="fas fa-play"></i></div>
				</div>
				<div class="video-info-enhanced">
					<h3 class="video-title-enhanced">${v.title}</h3>
					<p class="video-description-enhanced">${v.description}</p>
					<div class="video-meta-enhanced">
						<div class="video-stats"><span class="video-stat"><i class="far fa-eye"></i> ${v.views}</span></div>
						<span class="video-category-tag">${v.category}</span>
					</div>
				</div>
			`;
			return div;
		}

		function renderList(targetEl, list) {
			if (!targetEl) return;
			targetEl.innerHTML = '';
			if (!list || list.length === 0) {
				targetEl.innerHTML = '<div class="loading-spinner"><div>No videos found.</div></div>';
				return;
			}
			const frag = document.createDocumentFragment();
			list.forEach(v => frag.appendChild(createVideoCard(v)));
			targetEl.appendChild(frag);
		}

		// Safe open modal
		function openVideoModal(id) {
			const vid = videos.find(x => x.id === Number(id));
			if (!vid) return; // nothing to show
			if (!videoModal || !videoPlayer) return; // missing DOM nodes

			// Populate modal safely
			safeText(videoModalTitle, vid.title);
			safeText(videoModalDescription, vid.description);
			safeText(videoModalDuration, vid.duration ? `Duration: ${vid.duration}` : '');
			safeText(videoModalDate, vid.date ? `Uploaded: ${vid.date}` : '');
			safeText(videoModalViews, vid.views ? `Views: ${vid.views}` : '');

			// Specs
			if (videoSpecs) {
				if (Array.isArray(vid.specs) && vid.specs.length) {
					videoSpecs.innerHTML = vid.specs.map(s => `<div class="spec-item"><i class="fas fa-check"></i><strong>${s.k}:</strong> ${s.v}</div>`).join('');
				} else {
					videoSpecs.innerHTML = '<p style="color:var(--gray-text)">No specs available.</p>';
				}
			}

			// Embed iframe (guard src)
			const allowedSrc = vid.embed && typeof vid.embed === 'string' ? vid.embed : '';
			videoPlayer.innerHTML = allowedSrc ? `<iframe src="${allowedSrc}" title="${vid.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : '<div style="padding:20px;color:var(--gray-text)">Video not available.</div>';

			// Show modal
			videoModal.style.display = 'flex';
			document.body.style.overflow = 'hidden';
		}

		function closeVideoModalSafe() {
			if (!videoModal || !videoPlayer) return;
			videoModal.style.display = 'none';
			videoPlayer.innerHTML = ''; // stop playback
			document.body.style.overflow = '';
		}

		// Initial render
		renderList(videosGrid, videos);
		renderList(featuredGrid, videos.slice(0, 3));

		// Delegated click for opening modal (safe)
		document.body.addEventListener('click', (e) => {
			const card = e.target.closest && e.target.closest('.video-card-enhanced');
			if (!card) return;
			const id = card.dataset.id;
			if (!id) return;
			openVideoModal(id);
		});

		// Close handlers
		if (closeModalBtn) closeModalBtn.addEventListener('click', closeVideoModalSafe);
		if (videoModal) {
			videoModal.addEventListener('click', (ev) => {
				if (ev.target === videoModal) closeVideoModalSafe();
			});
		}
		document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeVideoModalSafe(); });

		// Search filter
		if (searchBox) {
			searchBox.addEventListener('input', (ev) => {
				const q = (ev.target.value || '').trim().toLowerCase();
				const filtered = q ? videos.filter(v => (v.title + ' ' + v.description + ' ' + (v.category||'')).toLowerCase().includes(q)) : videos;
				renderList(videosGrid, filtered);
			});
		}

		// Category buttons
		if (categoryBtns && categoryBtns.length) {
			categoryBtns.forEach(btn => {
				btn.addEventListener('click', () => {
					categoryBtns.forEach(b => b.classList.remove('active'));
					btn.classList.add('active');
					const cat = btn.getAttribute('data-category') || 'all';
					const filtered = (cat === 'all') ? videos : videos.filter(v => v.category === cat);
					renderList(videosGrid, filtered);
				});
			});
		}
	});
})();