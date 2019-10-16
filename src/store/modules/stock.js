import { stocks, CONSTANT_PRICE } from "../../data/stocks";

const state = {
	stocks: []
};

const mutations = {
	SET_STOCKS(state, payload) {
		state.stocks = payload;
	},
	END_DAY: state => {
		// const randomNo = Math.floor(Math.random() * (max - min + 1) + min);
		state.stocks.forEach(stock => {
			let max = CONSTANT_PRICE[stock.name] + 50;
			let min = CONSTANT_PRICE[stock.name] - 50;
			if (stock.name === "Twitter") {
				max = CONSTANT_PRICE[stock.name] + 50;
				min = CONSTANT_PRICE[stock.name] - 5;
			}
			const randomNo = Math.floor(Math.random() * (max - min + 1) + min);
			stock.price = randomNo;
			if (stock.price <= 0) {
				stock.price = 1;
			}
		});
	},
	LOAD_STOCKS_DATA: (state, payload) => {
		state.stocks = payload;
	}
};
const actions = {
	setStock: context => {
		context.commit("SET_STOCKS", stocks);
	},
	endDay: context => {
		setTimeout(() => {
			context.commit("END_DAY");
		}, 1000);
	}
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
