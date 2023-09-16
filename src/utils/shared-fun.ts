export function darkenColor(hex: string, factor: number) {
	// Remove the '#' symbol if it's present
	hex = hex.replace(/^#/, '');

	// Parse the hex color into RGB components
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	// Calculate the new darker RGB values
	const newR = Math.max(0, Math.floor(r * factor));
	const newG = Math.max(0, Math.floor(g * factor));
	const newB = Math.max(0, Math.floor(b * factor));

	// Convert the new RGB values back to hex
	const darkenedHex = `#${(newR.toString(16)).padStart(2, '0')}${(newG.toString(16)).padStart(2, '0')}${(newB.toString(16)).padStart(2, '0')}`;

	return darkenedHex;
}