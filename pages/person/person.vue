<template>
	<view class="content">
		<div class="user">
			<p class="header">
				<image :src="usershop.logo"></image>
			</p>
			<div class="username">
				<p class="name">
					{{userinfo.name}}
				</p>
				<p class="tel">手机：{{userinfo.phone}}</p>
			</div>
			<!-- <p class="logout" @click="toLogout">切换账号</p> -->
		</div>
		<div class="function">
			<div class="owncar">
				<navigator url="/pages/owncar/owncar" hover-class="none" class="line">
					库存车辆 {{owncarcount}}
				</navigator>
				<navigator url="/pages/public/public" hover-stop-propagation="true" hover-class="none" class="public">快速发车</navigator>
			</div>
			<p class="wire"></p>
			<ul class="impt">
				<li>
					<navigator url="/pages/mycontract/mycontract" hover-class="none" class="link">
						<p class="icon icon1"></p>
						<p class="font">我的成交</p>
					</navigator>
				</li>
				<li @click="wait">
					<p class="icon icon2"></p>
					<p class="font">私人订制</p>
				</li>
				<li @click="wait">
					<p class="icon icon3"></p>
					<p class="font">客户管理</p>
				</li>
			</ul>
		</div>
		<page-nav :nav="3"></page-nav>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		methods: {
			toLogout() {
				wx.reLaunch({
					url: '/pages/login/login',
				})
			},
			wait() {
				wx.showToast({
					title: '敬请期待',
					icon: 'none'
				})
			}
		},
		computed: {
			...mapState(['usershop', 'owncarcount', 'userinfo'])
		}
	}
</script>
<style>
	page{
		display: flex;
		height: 100%;
	}
</style>
<style lang="less" scoped>
	.content{
		flex: 1;
		background-color: #f2f2f2;
		overflow: hidden;
		width: 100%;
		height: 100%;
		.user{
			display: flex;
			background-color: #fff;
			// background: linear-gradient(#f44446, transparent);
			padding: 12px 40px 52px 40px;
			margin-bottom: 24px;
			.header{ 
				flex-basis: 106px;
				width: 106px;
				height: 106px;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 30px;
				// border: 2px solid #fff;
				transform: rotate(0deg);
				background: center center no-repeat url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpENjhGMkU4M0QyMjkxMUU4OUVGN0YzNjQ0NUNDQjJENiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENjhGMkU4NEQyMjkxMUU4OUVGN0YzNjQ0NUNDQjJENiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2OEYyRTgxRDIyOTExRTg5RUY3RjM2NDQ1Q0NCMkQ2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ2OEYyRTgyRDIyOTExRTg5RUY3RjM2NDQ1Q0NCMkQ2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAEAsLCwwLEAwMEBcPDQ8XGxQQEBQbHxcXFxcXHx4XGhoaGhceHiMlJyUjHi8vMzMvL0BAQEBAQEBAQEBAQEBAQAERDw8RExEVEhIVFBEUERQaFBYWFBomGhocGhomMCMeHh4eIzArLicnJy4rNTUwMDU1QEA/QEBAQEBAQEBAQEBA/8AAEQgA1ADUAwEiAAIRAQMRAf/EAGEAAQADAQEAAAAAAAAAAAAAAAABAgMEBgEBAAAAAAAAAAAAAAAAAAAAABABAAIBBAEDBAMAAAAAAAAAAAECAxEhMUESUWETcYGRMqEiQhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvXHa2/ELYsev9rfaGoKRhr3ufFT0aAMrYY/zP5ZWrNZ0mHUi1YtGkg5Ra9ZrOk/ZUAAAAAAAAAAAAAAAAAABalfK0R+VWuCN5kGqQAAAABTLXyr7xu53U5pjSZgEAAAAAAAAAAAAAAAAAANcHMwyWx28bRPXYOkQkAAAAEOad5mW+S3jWfXpzgAAAAAAAAAAAAAAAAAAGkjopSK10nmeQVxZNY8Z56asL4pjevBXNMbW3gG4pGWk96J86esAsiZiI1nhS2ascbsptfJOn8AXtN7bcdQq6MeOK7zvLLLTxtrHEgoAAAAAAAAAAAAAAAAAC+KutteodCmKulI991wFLY629p9VwGM4J6lHw29YbgMowx3OrSKxXaI0SAK3r5VmPwsA5BbJGl5991QAAAAAAAAAAAAAACI1nQTT9q/WAdKQAAAAAAAABjnjiWTbP+sfViAAAAAAAAAAAAAAARtOoA6a2i0ax91nLW01nWG1ctbc7SDQQkAAAABCJtWvMsr5Znau0AZb+U6RxDMAAAAAAAAAAAAAAAAAAATFrV4leM1u9JZgNfnn0Pnn0ZANJzz1CJy3nvT6KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==);
				background-size: 106px auto;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.username{
				font-size: 30px;
				flex-grow: 1;
				display: flex;
				justify-content: center;
				flex-direction: column;
				.name{
					margin-bottom: 10px;
				}
				.tel{
					font-size: 22px;
					color: #666;
				}
				// color: #fff;
			}
			.logout{
				font-size: 22px;
				line-height: 106px;
				flex-grow: 0;
				color: #666;
				padding-left: 30px;
				background: left center no-repeat url(data:image/png;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNDY5NzVBRkNFOTYxMUU4QUI1MThCOTNCMUVBNDM4MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNDY5NzVCMENFOTYxMUU4QUI1MThCOTNCMUVBNDM4MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0Njk3NUFEQ0U5NjExRThBQjUxOEI5M0IxRUE0MzgxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0Njk3NUFFQ0U5NjExRThBQjUxOEI5M0IxRUE0MzgxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAEAsLCwwLEAwMEBcPDQ8XGxQQEBQbHxcXFxcXHx4XGhoaGhceHiMlJyUjHi8vMzMvL0BAQEBAQEBAQEBAQEBAQAERDw8RExEVEhIVFBEUERQaFBYWFBomGhocGhomMCMeHh4eIzArLicnJy4rNTUwMDU1QEA/QEBAQEBAQEBAQEBA/8AAEQgAKgAoAwEiAAIRAQMRAf/EAG4AAAMBAQEAAAAAAAAAAAAAAAAEBQEGAgEBAAAAAAAAAAAAAAAAAAAAABAAAQMCBAEJBwUAAAAAAAAAAQACAxEEITESBSJBUXGRweEyMxRhgbHR8RMjQoKigxURAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AO1uNxtYITLrD8S1rWkElw5Ek2Pddw45JPTQHwtFQSOjPrS+zWTZ5nTyCscR4QeV/cugQSv8GPP779XPgvDoN0sOOGX1MQzY6pNOg9isIQK2N9FeRlzOF7fGw5juQkdwi9Bdx38Aoxx0ytGRriev4oQVwAMhSuOC1T9vvZpZpra5oJoyS2gpUdyoIBCEIMIDhRwqOYoU7dtwfatZHCQJXmpwrRo+aEG7jYSSPbd2p03Mf8gO1ZbbzE78d2DBM3B1QdNexUlJ3rwjycv1eb+1BQ9ZaU1fejpz6h80pc7zAzgtvzynBoaDpr2+5c91Kzsn9OXJ5v0QEe0S3TXT3jy2eQggDHSPahWUIP/Z);
				background-size: 22px auto;
				// color: #fff;
			}
		}
		.function{
			display: flex;
			flex-direction: column;
			border-radius: 25px;
			background-color: #fff;
			margin: 0 24px;
			.owncar{	
				flex-basis: 95px;
				height: 95px;
				line-height: 95px;
				display: flex;
				.line{
					font-size: 28px;
					padding-left: 24px;
					// background: 24px center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExQzRGNkREQ0VCODExRThBQjQwQTFBNDc0QjVEQTIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExQzRGNkRFQ0VCODExRThBQjQwQTFBNDc0QjVEQTIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTFDNEY2REJDRUI4MTFFOEFCNDBBMUE0NzRCNURBMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTFDNEY2RENDRUI4MTFFOEFCNDBBMUE0NzRCNURBMjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz501lhTAAABlklEQVR42uyZvU7DMBSFbf7KxMLQbBlB3UjEAyB4BxZeM0+BFLZKZWDI0hQFBgYEC+FehJGl/kSiudeGnCMdRcmQ4y+1k8rHtm1rhqQdMzDtxTAIay0fDsin5P0eb/1KntEs/vi5wlM6tEkX5DkPR8BT8onLsqHXMP26R3R4IB8LxtwRZxbLGj4XhmWd0YMdx7KGD/2TLMt6uWnTNKaqKv/SKJqXlq8kSUxRFFvfJ01TfJYADGAAAxjAAAYwgAEMYAADGMAA/lZ0GwB1XZs8z/818Jt/UpalVM57LFP6lvwsnMG7losogGkgL3S4Jj8KRdyTb9yJjaFb8pqHCXm352k89ZuHmIC3mSV/6y2t+dCH+R3WnFIxTelf15UbBrxcV66XTr52XRm6LmVxXdkIhTmXG2BV81mXwmHO4zXAqvm8hlXryhUKW5dK15VdQl2KPx4ABjCAAQxgAAMYwAAGMIABDOD+tbQBIF1Xdkkjf1B7WizeNXwyYXct1fJd6BV5IRQ2I0869qXV8r/aQ826cpU08z8FGACuXa3tV6NxLQAAAABJRU5ErkJggg==);
					// background-size: 27px auto;
					flex-grow: 1;
					font-weight: bold;
				}
				.public{
					flex-grow: 0;
					font-size: 28px;
					color: #f44446;
					padding: 0 24px;
				}
			}
			.wire{
				margin-left: 24px;
				margin-right: 24px;
				height: 1px;
				background-color: #ebebeb;
			}
			.impt{
				display: flex;
				li{
					flex: 1;
						.icon{
							margin-top: 34px;
							height: 46px;
							&.icon1{
								background: center center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU4NDQzQUYzQ0Y1MDExRThBRDFGQThFRDM5Q0Y1Mzk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4NDQzQUY0Q0Y1MDExRThBRDFGQThFRDM5Q0Y1Mzk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTg0NDNBRjFDRjUwMTFFOEFEMUZBOEVEMzlDRjUzOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTg0NDNBRjJDRjUwMTFFOEFEMUZBOEVEMzlDRjUzOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68tbFQAAAM9UlEQVR42uxdC5xO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	);
								background-size: 46px auto;
							}
							&.icon2{
								background: center center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY5NDQxM0I4Q0Y1MDExRThBRDFGQThFRDM5Q0Y1Mzk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY5NDQxM0I5Q0Y1MDExRThBRDFGQThFRDM5Q0Y1Mzk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTg0NDNBRjVDRjUwMTFFOEFEMUZBOEVEMzlDRjUzOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTg0NDNBRjZDRjUwMTFFOEFEMUZBOEVEMzlDRjUzOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5RL69wAAAFj0lEQVR42uydC2wUVRSG/93io6I2EnxECYRQNSElPlorFOqjohBwwaCNIEXLw6K2WFKxLygqVWzB2gXEUgq0pdIU+gxFIyBgrFVIWgGNj6QJJqJRIxpCYmKh3fVMt8aGzt6Z3Z1t586cPzmZdubs3Dvf3j1z7p3HdXi9XrCGXk5GwOAZPIvBM3gWg7eERgT6AQeJFrPI7iUbL9nx/khWRnbO6B0raTmhSaA/XWQXyA7Qum+EH9Br/cBPKx+T2M6Q3RiGL7VRpSyXX5YBQF8tOfCB9prB0Fv9lFMZEnjSMgtBV6zKQOgtgnKO+GPq1BHTx9CiwmLnts8M2k8D2VzB9pNBx3hSqcVau1GNqF5HWfH+uDq0BsmoxX9Li4lq264bCU96CroT43B+9Cj0mr2Zj4qCJ3ocekLczd9JixB17DjGavhlENutoaSTE9RWjr0V+GIfnLfdjEj6N9Iu+ffCLICgaylTBF0veNWfRBPtlqDbSotzgNpWTbelBH2XET3XQSFkAv3IYmPsB72qSdNtpbcLu/TsL6ghg0l32gv6snxd0HMJ+qawjtX09NgH+vICYGe92OetLEpUurAl7INkHptcLXyJ+rfb68Q+JXlA/otQxq9G8+ikAcosBMpqxT7F2UDWkuD2z+BVlLUe2Lxb7FOQDmQ/H3wZDP4yZRdTV71S7EOhBetWhlbOCEY9IC3ZCGzcoR1eQmnp3OIvDx2lBHW7xhez3BjoDL5fr28G3nxf42T7HPD2KuPKtD34wq3AGxoZeMYiwL3G2HJtDV5p5WvdYp+cNGDLWuPLti34onJfXBemlZSjF70anvJtCX5DBZD3jtgnbb6vVxou2Q58yU4KHxvEPkuTgfLC8NbDVnm80jFaVaQdXoJt6Y7bMY0WqfTXJVru8Hq9nbYH/16NbyhApNR5wUOPfxIzaDGwJ/CCw+G4j+B32DbUKINdK9aJfZ5xAZXFwZdx+nvkqqxOsG2Mr9jrG94V6enZwJ53QyvH48FVKqt/siX48jrKTtZon0jr3AZkKU50q6y+ZDvwlY0UZAvEPgvn0BlwfVir4bQV+OomYEmu2GfudOCDkuGro+XA17RQdpIj9nElAS1lw1tPS4Hfsx94VqOLv+BxYH/58NfVMuD3fQSkvCL2mfUQUFtqjvpaAnzDx5QSZop9plNG/aGJ7nmWHnzzISB5hdjn4cnA4Wpz1Vtq8I0HgXnpYp/ZFF6O1piv7tKCP3AMeCpD7JM0hfxM+kiFlOAPtlFKmCb2mXw3cGS3eY9BOvCHPgdmaty9NeUe4Mt6cx+HVOAPtwMzFot9Hknoe2DC9JIG/KcngMdSxT5xk4BPquU4HinAt3VQSpgi9lHu2W/fK8+v1/Tg2zuBBxaIfSZGAycagCuvYPCG6OR3wLT5Yp/77wI6moHIq+VKEkx9zfVljSv9MXf4wktEhHwpsalb/Nc/+N82foy80E0PXrkWqqbocUBnC3D9tZBWpgbvXu3rDA1UYhxwqhW4IQpSy9Qx/ppIX2dIeeru7K/Ao1OBqbGwhKS4oUm5E8Bq4gcTGDyDZzF4Bs9i8AyexeAZPIvBM3gWg2fwDJ4RMHgGz2LwDJ5lAvAy3bE1hOoNO/jzF5jyIJBOjDQa/CCf46fo6+1l2P/p59+A7ou4xWjwg94k/E+39ntf7CTlJRV+5luJCAX8L2or3VXApmqGrrwDp/Wo380X/W3QM0dIMy2e8LddeRhgZqL8d3YFqt/P+Z6vPXNW6HYT8f1DPY5oz4qTDGvNijNU1ibi6tAzdTS1emXOuhgOLAEplth+FWo66WKOASlPBF1XqOmzrj7XeLI/OYRoWr6uafwCnN1SmY5hW3+mw5D/t7/I6FSLB/Wy1BXjWTxIxuBZDJ7Bsxg8g2ep618BBgCGB02C4XCnfwAAAABJRU5ErkJggg==);
								background-size: 46px auto;
							}
							&.icon3{
								background: center center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY5NDQxM0JDQ0Y1MDExRThBRDFGQThFRDM5Q0Y1Mzk2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY5NDQxM0JEQ0Y1MDExRThBRDFGQThFRDM5Q0Y1Mzk2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Rjk0NDEzQkFDRjUwMTFFOEFEMUZBOEVEMzlDRjUzOTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk0NDEzQkJDRjUwMTFFOEFEMUZBOEVEMzlDRjUzOTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Ad2ZmAAAKdUlEQVR42uyde5RX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);
								background-size: 46px auto;
							}
						}
						.font{
							font-size: 22px;
							line-height: 61px;
							text-align: center;
							margin-bottom: 17px;
						}
				}
			}
		}
	}
</style>
