
const next = function () {
	const index = this.index;
	const iterate_over = this.is_array ? this.target : this.keys;

	if(index >= iterate_over.length){
		return {
			done: true,
		};
	}

	const key = this.is_array ? this.index : this.keys[this.index];

	let iterator_value;
	if('k' === this.meta){
		iterator_value = key;
	}
	else {
		const value = this.target[key];

		if('v' === this.meta){
			iterator_value = value;
		}
		else if('kv' === this.meta){
			iterator_value = [ key, value ];
		}
	}

	this.index++;

	return {
		value: iterator_value,
		done: false,
	};
};

const getIterator = ({ meta, target, is_array }) => ({
	[ Symbol.iterator ]: () => {
		return {
			next () {
				return next.call(this);
			},
			index: 0,
			meta,
			target,
			is_array,
			keys: is_array ? null : Object.keys(target),
		};
	},
});

export const iterate = (target) => {
	const is_array = Array.isArray(target);

	const result = getIterator({
		meta: 'kv',
		target,
		is_array,
	});

	result.keys = () => getIterator({
		meta: 'k',
		target,
		is_array,
	});

	result.values = () => getIterator({
		meta: 'v',
		target,
		is_array,
	});

	return result;
};
