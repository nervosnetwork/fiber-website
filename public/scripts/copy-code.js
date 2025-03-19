document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".doc-content pre").forEach((pre) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("codeblock-wrapper");

		const button = document.createElement("button");
		button.className = "copy-button";

		button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5M11 9H20C21.1046 9 22 9.89543 22 11V20C22 21.1046 21.1046 22 20 22H11C9.89543 22 9 21.1046 9 20V11C9 9.89543 9.89543 9 11 9Z"
            stroke="#030303" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
      <span class="tooltip">Copied</span>
    `;

		button.addEventListener("click", () => {
			const code = pre.querySelector("code").innerText;
			navigator.clipboard.writeText(code);
			button.classList.add("copied");

			setTimeout(() => {
				button.classList.remove("copied");
			}, 1500);
		});

		const parent = pre.parentNode;
		parent.replaceChild(wrapper, pre);
		wrapper.appendChild(pre);
		wrapper.appendChild(button);
	});
});
