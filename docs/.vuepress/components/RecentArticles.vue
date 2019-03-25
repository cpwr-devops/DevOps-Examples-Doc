<template>
<div>
	<ul>
		<li v-for="post in recentFiles">
			<a :href="post.path">{{post.title}}</a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	data() {
		return {};
	}, 
	computed:{
		recentFiles() {
			let files = this.$site.pages.filter(p => {
				return p.path.indexOf('/products/') >= 0;
			}).sort((a,b) => {
				let aDate = new Date(a.frontmatter.published).getTime();
				let bDate = new Date(b.frontmatter.published).getTime();
				let diff = aDate - bDate;
				if(diff < 0) return -1;
				if(diff > 0) return 1;
				return 0;
			}).slice(0,5);

			return files;
		}
	}
}
</script>