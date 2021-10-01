
const next = (self) => {
	const [
		index,
		meta,
		target,
		is_array,
		keys,
	] = self;

	const iterate_over = is_array ? target : keys;

	if (index >= iterate_over.length) {
		return {
			done: true,
		};
	}

	const key = is_array ? index : keys[index];

	let iterator_value;
	if ('k' === meta) {
		iterator_value = key;
	}
	else {
		const value = target[key];

		if ('v' === meta) {
			iterator_value = value;
		}
		else if ('kv' === meta) {
			iterator_value = [ key, value ];
		}
	}

	self[0]++;

	return {
		value: iterator_value,
		done: false,
	};
};

const getIterator = (meta, target, is_array) => ({
	[ Symbol.iterator ]: () => {
		let args = [ // eslint-disable-line prefer-const
			0,
			meta,
			target,
			is_array,
			is_array ? null : Object.keys(target),
		];

		return {
			next () {
				return next(args);
			},
		};
	},
});

export const iterate = (target) => {
	const is_array = Array.isArray(target);

	const result = getIterator(
		'kv',
		target,
		is_array,
	);

	result.keys = () => getIterator(
		'k',
		target,
		is_array,
	);

	result.values = () => getIterator(
		'v',
		target,
		is_array,
	);

	return result;
};
