<template>
	<div>
		<div class="mt-2" v-if="updatedStocks.length === 0">
		<b-card class="pt-4 pb-2 px-2" border-variant="light-gray">
			<h1 class="mt-1 mb-1 display-4 font-weight-normal">No Stocks Currently Available!</h1>
			<br>
			<p class="mb-1">Please buy stocks from the 'Stocks' page.</p>
		</b-card>
	</div>
		<b-row align-h="around" class="my-3">
			<b-col cols="5" class="mb-4" v-for="stock in updatedStocks" :key="stock.name">
				<b-card header-text-variant="dark-green" header-bg-variant="light-green">
					<template v-slot:header>
						<h5 class="mb-0">
							{{stock.name}}
							<span
								style="font-size: 12px"
							>(Price: {{stock.price}} | Quantity: {{stock.quantity}})</span>
						</h5>
					</template>
					<b-row>
						<b-col cols="5">
							<b-form-input
								type="number"
								placeholder="Quantity"
								v-model="quantity[stock.name]"
								:class="{'is-invalid': checkInvalid[stock.name]}"
								@input="checkInvalid[stock.name] = quantity[stock.name] <= 0 || quantity[stock.name] > stock.quantity"
							></b-form-input>
							<b-form-invalid-feedback>Enter quantity within the amount you bought.</b-form-invalid-feedback>
						</b-col>
						<b-col cols="2" class="ml-auto">
							<b-button
								variant="light-green"
								class="font-weight-bold"
								@click="sellStocks(stock.name, stock.price)"
								:disabled="quantity[stock.name] <= 0 || quantity[stock.name] > stock.quantity || Number.isInteger(quantity[stock.name])"
							>Sell</b-button>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				quantity: {
					BMW: "",
					Google: "",
					Apple: "",
					Twitter: ""
				},
				checkInvalid: {
					BWM: false,
					Google: false,
					Apple: false,
					Twitter: false
				}
			};
		},
		computed: {
			...mapState(["portfolio", "stocks"]),
			updatedStocks() {
				if (this.portfolio.boughtStocks.length == 0) {
					return [];
				}
				return this.portfolio.boughtStocks.map(stock => {
					const findStock = this.stocks.stocks.find(
						el => el.name === stock.name
					);
					return {
						...stock,
						price: findStock.price
					};
				});
			}
		},
		methods: {
			sellStocks(stockName, stockPrice) {
				this.$store.dispatch("sellStock", {
					name: stockName,
					quantity: +this.quantity[stockName],
					price: stockPrice
				});
				this.quantity[stockName] = "";
			}
		}
	};
</script>

<style scoped>
	.bg-light-green {
		background-color: #c0dbe6;
	}
	.text-dark-green {
		color: #62858f;
	}
	.btn-light-green {
		color: #fff;
		background-color: #d1877d;
		border-color: #d1877d;
	}
</style>