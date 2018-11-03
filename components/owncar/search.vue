<template>
	<div class="searchline">
		<div class="search" @click.stop="toShowHide('filtershow')">
			<span>{{keyword? keyword : '品牌、型号'}}</span>
		</div>
		<div class="searchbox" v-show="searchshow">
			<car-search @cancelSearch="cancelSearch" @toSearch="toSearch"></car-search>
		</div>
		<div class="publiccar">
			<navigator class="public" url="/pages/public/public">
				快速发车
			</navigator>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchshow: false,
				keyword: ''
			} 
		}, 
		methods: {
			toSearch(k) {
				this.keyword = k;
				this.$emit('keywordSearch', k);
			},
			toShowHide(k) {
				// this.shadow = false;
				this.searchshow = true;
			},
			cancelSearch() {
				this.searchshow = false;
			},
			resetSearch() {
				this.searchshow = false;
				this.keyword = '';
			}
		}
	}
</script>

<style lang="less" scoped>
	.searchline {
		display: flex;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 0 24px 0px 24px;
		.search {
			flex-grow: 1;
			height: 62px;
			border-radius: 31px;
			background-color: #f2f2f2;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 9px;
			margin-bottom: 14px;
			span {
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1OUZBMjczQ0EzNDExRThBRDdFQkQxMEE4MDI0NDk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ1OUZBMjc0Q0EzNDExRThBRDdFQkQxMEE4MDI0NDk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDU5RkEyNzFDQTM0MTFFOEFEN0VCRDEwQTgwMjQ0OTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDU5RkEyNzJDQTM0MTFFOEFEN0VCRDEwQTgwMjQ0OTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4mjvB/AAAHhUlEQVR42syZe2iW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) no-repeat;
				background-position: left center;
				background-size: 22px auto;
				color: #c4c4c4;
				font-size: 24px;
				padding-left: 35px;
			}
		}
		.publiccar{
			flex-basis: 155px;
			position: relative;
			flex-grow: 0;
			width: 155px;
			margin-top: 9px;
			height: 62px;
			.public{
				width: 176px;
				height: 62px;
				color: #fff;
				background-color: #f44446;
				font-size: 28px;
				border-radius: 31px;
				position: absolute;
				right: 0;
				top: 0;
				line-height: 62px;
				text-align: center;
			}
		}
		
	}
</style>
