<template>
	<div class="mt-5 mx-5">
		<b-toast
			v-for="err in error"
			:key="err.name"
			:id="`example-toast-${err.name}`"
			:title="err.title"
			no-auto-hide
			no-close-button
		>{{err.message}}</b-toast>
		<app-header></app-header>
		<keep-alive>
			<transition name="slide" mode="out-in">
				<router-view />
			</transition>
		</keep-alive>
	</div>
</template>

<script>
	import Header from "./components/Header/Header";
	import { mapState } from "vuex";
	export default {
		components: {
			"app-header": Header
		},
		data() {
			return {
				fundsError: false,
				loadError: false,
				saveError: false
			};
		},
		computed: {
			...mapState(["error"])
		},
		watch: {
			[error.fundsError.error]: function(val) {
				if (val) {
					this.$bvToast.show(`example-toast-${error.fundsError.name}`);
				} else {
					this.$bvToast.hide(`example-toast-${error.fundsError.name}`);
				}
			},
			[error.loadError.error]: function(val) {
				if (val) {
					this.$bvToast.show(`example-toast-${error.loadError.name}`);
				} else {
					this.$bvToast.hide(`example-toast-${error.loadError.name}`);
				}
			}
		}
	};
</script>

<style>
	.slide-enter-active {
		animation: slide-down 500ms ease-out forwards;
	}
	.slide-leave-active {
		animation: slide-up 500ms ease-out forwards;
	}

	@keyframes slide-up {
		to {
			opacity: 0;
			transform: translateY(-10px);
		}

		from {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
