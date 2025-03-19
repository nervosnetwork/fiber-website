const cursor = document.getElementById("custom-cursor");
let isHovering = false;

document.querySelectorAll(".custom-cursor-target").forEach((target) => {
	target.addEventListener("mouseenter", () => {
		isHovering = true;
		cursor.classList.remove("hidden");
		document.body.style.cursor = "none";
	});

	target.addEventListener("mouseleave", () => {
		isHovering = false;
		cursor.classList.add("hidden");
		document.body.style.cursor = "auto";
	});

	target.addEventListener("mousemove", (e) => {
		if (isHovering) {
			cursor.style.left = `${e.clientX}px`;
			cursor.style.top = `${e.clientY}px`;
		}
	});
});
