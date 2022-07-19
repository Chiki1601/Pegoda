window.addEventListener("DOMContentLoaded",app);

function app() {
	let main = document.querySelector("main"),
		createLayer = (pristine = false, forceTop = false) => {
			let layer = document.createElement("div"),
				layerRoof = document.createElement("div"),
				layerMiddle = document.createElement("div"),
				layerBase = document.createElement("div");

			layer.classList.add("layer","layer--show");

			if (pristine)
				layer.classList.add("layer--pristine");
			if (forceTop)
				layer.classList.add("layer--top");

			layer.style.bottom = `${(100 * main.children.length)}%`;

			layerRoof.classList.add("layer__roof");
			layerMiddle.classList.add("layer__middle");
			layerBase.classList.add("layer__base");

			main.appendChild(layer);
			layer.appendChild(layerRoof);
			layer.appendChild(layerMiddle);
			layer.appendChild(layerBase);
		},
		refreshHeight = () => {
			let layers = main.querySelectorAll(".layer"),
				totalHeight = main.offsetHeight * (main.children.length + 1),
				pristine = "layer--pristine",
				hide = "layer--hide",
				show = "layer--show",
				top = "layer--top";

			if (window.innerHeight > totalHeight)
				createLayer();

			layers.forEach((layer,i) => {
				let mainCompStyles = window.getComputedStyle(main),
					upperBound = -window.innerHeight + layer.offsetHeight;

				// over top
				if (layer.offsetTop < upperBound) {
					layer.classList.remove(pristine);
					layer.classList.remove(show);
					void layer.offsetHeight;
					layer.classList.add(hide);

				// inside
				} else if (layer.classList.contains(hide)) {
					layer.classList.remove(pristine);
					layer.classList.remove(hide);
					void layer.offsetHeight;
					layer.classList.add(show);
				}

				layer.classList.remove(top);
			});

			let shownLayers = main.querySelectorAll(`.${show}`);
			if (shownLayers.length > 0) {
				let lastShown = shownLayers[shownLayers.length - 1];
				lastShown.classList.add(top);
			}
		},
		initialLayers = Math.floor(window.innerHeight / main.offsetHeight) - 1;

	// layers on load
	while (initialLayers--) {
		createLayer(true,initialLayers == 0);
	}

	window.addEventListener("resize",refreshHeight);
}