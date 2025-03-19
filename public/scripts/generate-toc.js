document.addEventListener("DOMContentLoaded", () => {
	const tocContainer = document.getElementById("toc");
	if (!tocContainer) return;

	const headings = document.querySelectorAll(
		".doc-content h2, .doc-content h3",
	);
	let isClickScrolling = false;

	headings.forEach((heading) => {
		const id =
			heading.id ||
			heading.textContent.trim().toLowerCase().replace(/\s+/g, "-");
		heading.id = id;
		heading.style.scrollMarginTop = "40px"; // Offset for scroll

		const link = document.createElement("a");
		link.href = `#${id}`;
		link.textContent = heading.textContent;
		link.className = heading.tagName === "H2" ? "block" : "ml-4 block";
		tocContainer.appendChild(link);

		// Highlight on click
		link.addEventListener("click", () => {
			isClickScrolling = true;
			tocContainer
				.querySelectorAll("a")
				.forEach((a) => a.classList.remove("text-highlight"));
			link.classList.add("text-highlight");

			setTimeout(() => {
				isClickScrolling = false;
			}, 1000);
		});
	});

	// Scroll-based highlighting
	const observer = new IntersectionObserver(
		(entries) => {
			if (isClickScrolling) return;

			entries.forEach((entry) => {
				const id = entry.target.id;
				const tocLink = tocContainer.querySelector(`a[href="#${id}"]`);
				if (entry.isIntersecting) {
					tocContainer
						.querySelectorAll("a")
						.forEach((a) => a.classList.remove("text-highlight"));
					if (tocLink) tocLink.classList.add("text-highlight");
				}
			});
		},
		{
			rootMargin: "-40px 0px 0px 0px",
			threshold: 0.5,
		},
	);

	headings.forEach((heading) => observer.observe(heading));
});
