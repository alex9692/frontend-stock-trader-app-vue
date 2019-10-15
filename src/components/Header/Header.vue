<template>
	<div class="mt-5 mb-4">
		<b-navbar toggleable="lg" type="light" variant="light-gray">
			<b-navbar-brand to="/">Stock Tracker</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/portfolio">Portfolio</b-nav-item>
					<b-nav-item to="/stocks">Stocks</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item class="mr-2" @click="endDay">End Day</b-nav-item>
					<b-nav-item-dropdown class="mx-3" text="Save/Load">
						<b-dropdown-item @click="saveStockData">Save</b-dropdown-item>
						<b-dropdown-item @click="loadStockData">Load</b-dropdown-item>
					</b-nav-item-dropdown>
					<b-nav-text class="ml-2">Funds: ${{formattedFund}}</b-nav-text>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		methods: {
			endDay() {
				this.$store.dispatch("endDay");
			},
			saveStockData() {
				this.$store.dispatch("saveStock");
			},
			loadStockData() {
				this.$store.dispatch("loadStock");
			}
		},
		computed: {
			...mapState(["funds"]),
			formattedFund() {
				return this.funds.toLocaleString();
			}
		}
	};
</script>

<style scoped>
	.bg-light-gray {
		background-color: #e8ecf0;
	}
</style>