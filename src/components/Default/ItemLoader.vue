<template>
	<div 
		style="z-index: 1000;"
		class="star-0 top-0 bg-white d-flex w-100 h-100 position-fixed align-items-center justify-content-center"
	>
		<div class="spinner-border me-2" role="status">
			<span class="visually-hidden"></span>
		</div>
		Processando dados, aguarde...
	</div>
</template>

<script>
export default {
  name: 'ItemLoader'
}
</script>