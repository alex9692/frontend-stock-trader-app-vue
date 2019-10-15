<template>
	<div>
		<b-row align-h="around" class="my-3">
			<b-col cols="5" class="mb-4" v-for="stock in boughtStocks" :key="stock.name">
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
								placeholder="Quantity"
								v-model="quantity[stock.name]"
								:class="{'is-invalid': checkInvalid[stock.name]}"
								@input="checkInvalid[stock.name] = quantity[stock.name] <= 0 || quantity[stock.name] > stock.quantity"
							></b-form-input>
							<b-form-invalid-feedback>Enter quantity within the amount you bought</b-form-invalid-feedback>
						</b-col>
						<b-col cols="2" class="ml-auto">
							<b-button
								variant="light-green"
								class="font-weight-bold"
								@click="sellStocks(stock.name)"
								:disabled="quantity[stock.name] <= 0 || quantity[stock.name] > stock.quantity"
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
			...mapState(["boughtStocks"])
		},
		methods: {
			sellStocks(stockName) {
				this.$store.dispatch("sellStock", {
					name: stockName,
					quantity: +this.quantity[stockName]
				});
				this;
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