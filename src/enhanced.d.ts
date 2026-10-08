// Enhanced image imports with extra directives put `enhanced` last:
//   import hero from '#lib/assets/treated/hero.jpg?w=1600;900;360&enhanced';
// (`*?enhanced` alone is declared by @sveltejs/enhanced-img.)
// This file has no top-level import or export, so the declaration is ambient.
declare module '*&enhanced' {
	import type { Picture } from '@sveltejs/enhanced-img';

	const value: Picture;
	export default value;
}
