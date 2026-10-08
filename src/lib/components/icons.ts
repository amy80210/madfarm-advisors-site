// Line icons on a 32-unit grid. Each entry is the shapes inside the <svg>; LineIcon.svelte
// supplies the stroke. To add one, draw it at 32 × 32 with no fill and add an entry.
export const icons = {
	award: '<circle cx="16" cy="12" r="7" /><path d="M12 18l-2 9 6-3 6 3-2-9" />',
	'bar-chart': '<path d="M6 26V6M6 26h20M11 22v-6M17 22v-11M23 22v-9" />',
	'bar-chart-rising': '<path d="M6 26V6M6 26h20M11 26v-6M17 26v-11M23 26v-15" />',
	blocks:
		'<rect x="4.5" y="21" width="23" height="5.5" rx="1" /><rect x="7.5" y="13" width="7.5" height="8" rx="1" /><rect x="17" y="13" width="7.5" height="8" rx="1" /><path d="M11 13V8.5h10V13" />',
	book: '<path d="M6 6.5A1.5 1.5 0 0 1 7.5 5H16v22H7.5A1.5 1.5 0 0 1 6 25.5Z" /><path d="M16 5h8.5A1.5 1.5 0 0 1 26 6.5v19a1.5 1.5 0 0 1-1.5 1.5H16" /><path d="M9.5 10h3M9.5 14h3M19.5 10h3M19.5 14h3M19.5 18h3" />',
	'calendar-check':
		'<rect x="5" y="7" width="22" height="20" rx="2" /><path d="M5 13h22M11 4.5v5M21 4.5v5" /><path d="m12.5 19.5 2.8 2.8 5.2-5.2" />',
	card: '<rect x="4" y="8" width="24" height="16" rx="2" /><path d="M4 13h24M8 19h6" />',
	checklist:
		'<rect x="7" y="6" width="18" height="22" rx="2" /><path d="M12 6V4.5h8V6" /><path d="m11 13.5 1.8 1.8 3.2-3.3M11 21l1.8 1.8 3.2-3.3M19 14h3M19 21.5h3" />',
	compass: '<circle cx="16" cy="16" r="11" /><path d="M21 11l-3.2 7.8L10 22l3.2-7.8L21 11Z" />',
	'compass-fine':
		'<circle cx="16" cy="16" r="11" /><path d="m20.5 11.5-2.8 6.2-6.2 2.8 2.8-6.2z" />',
	'document-check':
		'<path d="M8 4h12l5 5v19H8z" /><path d="M20 4v5h5" /><path d="M12 18l2.2 2.2L19 15" />',
	'document-checklist':
		'<path d="M8 4h12l5 5v19H8z" /><path d="M20 4v5h5" /><path d="M12 15l1.6 1.6L17 13M12 21l1.6 1.6L17 19" />',
	'document-lines':
		'<path d="M9 4.5h10l6 6V27a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 8 27V6a1.5 1.5 0 0 1 1-1.5Z" /><path d="M19 4.5v6h6" /><path d="M12 17h8M12 21h8M12 25h5" />',
	'document-signature':
		'<path d="M9 4.5h10l6 6V27a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 8 27V6a1.5 1.5 0 0 1 1-1.5Z" /><path d="M19 4.5v6h6" /><path d="M11.5 21.5c1.4-2 2.4-2 3 0s1.8 1.8 3.2-.6M11.5 25h9.5" />',
	folder:
		'<path d="M4 9.5A2.5 2.5 0 0 1 6.5 7h5.2l2.6 3h11.2A2.5 2.5 0 0 1 28 12.5v10A2.5 2.5 0 0 1 25.5 25h-19A2.5 2.5 0 0 1 4 22.5z" /><path d="M4 15.5h24" />',
	hub: '<circle cx="16" cy="16" r="3.2" /><circle cx="6.5" cy="7.5" r="2.3" /><circle cx="25.5" cy="7.5" r="2.3" /><circle cx="6.5" cy="24.5" r="2.3" /><circle cx="25.5" cy="24.5" r="2.3" /><path d="m8.3 9.2 5.3 4.6M23.7 9.2l-5.3 4.6M8.3 22.8l5.3-4.6M23.7 22.8l-5.3-4.6" />',
	institution: '<path d="M4 13 16 6l12 7M6 13v11M12 13v11M20 13v11M26 13v11M4 27h24" />',
	layers:
		'<path d="M16 5 28 11 16 17 4 11 16 5Z" /><path d="M4 16.5 16 22.5 28 16.5M4 21.5 16 27.5 28 21.5" />',
	network:
		'<circle cx="7" cy="9" r="3" /><circle cx="25" cy="9" r="3" /><circle cx="16" cy="24" r="3" /><path d="M9.6 10.6 13.8 21.6M22.4 10.6 18.2 21.6M10 9h12" />',
	people:
		'<circle cx="12" cy="12" r="3.4" /><path d="M5.5 25c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3" /><circle cx="22.5" cy="13.5" r="2.7" /><path d="M20.5 19c3.2.1 5.8 2.6 5.8 6.1" />',
	person: '<circle cx="16" cy="11" r="5" /><path d="M6.5 27c0-5.2 4.3-9 9.5-9s9.5 3.8 9.5 9" />',
	principal: '<circle cx="16" cy="10" r="4.2" /><path d="M4 25h24M9 25v-1.5a7 7 0 0 1 14 0V25" />',
	search: '<circle cx="14" cy="14" r="8" /><path d="M20 20l6.5 6.5" />',
	'search-bars':
		'<circle cx="14" cy="14" r="8.5" /><path d="m20.2 20.2 6.3 6.3" /><path d="M10.5 16.5v-2M14 16.5v-5M17.5 16.5v-3.2" />',
	'search-chart':
		'<circle cx="14" cy="14" r="8.5" /><path d="M20.2 20.2 26.5 26.5" /><path d="M11 17v-3.5M14 17v-6.5M17 17v-4.5" />',
	shield: '<path d="M16 4l10 4v7c0 7-5 11-10 13-5-2-10-6-10-13V8l10-4Z" />',
	'shield-check':
		'<path d="M16 4l10 4v7c0 7-5 11-10 13-5-2-10-6-10-13V8l10-4Z" /><path d="M12 15l2.6 2.6L20 12" />',
	'shield-check-round':
		'<path d="M16 4l10 3.8v7.6c0 6.1-4.3 10-10 12.6-5.7-2.6-10-6.5-10-12.6V7.8z" /><path d="m11.6 16.2 3 3 6-6" />',
	stack:
		'<path d="M16 5 4 11l12 6 12-6-12-6Z" /><path d="m4 16 12 6 12-6" /><path d="m4 21 12 6 12-6" />',
	table: '<rect x="5" y="6" width="22" height="20" rx="1" /><path d="M5 12h22M12 12v14" />',
	target:
		'<circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="3.5" /><path d="M16 16l6.5-6.5" />',
	team: '<circle cx="11" cy="11" r="4" /><circle cx="23" cy="12.5" r="3.2" /><path d="M4 25v-1.5a7 7 0 0 1 14 0V25M20.5 25v-1a6 6 0 0 1 8.5-.5" />',
	timeline:
		'<path d="M4 16h24" /><circle cx="9" cy="16" r="2.6" /><circle cx="16" cy="16" r="2.6" /><circle cx="23" cy="16" r="2.6" /><path d="M9 10V7M16 25v-3M23 10V7" />',
	trend: '<path d="M5 9l8 8 5-5 9 9" /><path d="M27 15v6h-6" />',
	warning: '<path d="M16 5 3 27h26L16 5Z" /><path d="M16 13v6M16 23h.02" />'
} as const;

export type IconName = keyof typeof icons;
