import type {Adapter, Builder} from '@sveltejs/kit';
import format from 'util'; 

type AnyFunction = (...args: any) => any;

type PrefixParameter<F extends (...args: any) => any, This, Parameter> =
	(this: This, original: Parameter, ...parameters: Parameters<F>) => ReturnType<F>;
export type OptionalFunctionsWithOriginal<T> = {
	[K in keyof T]?: T[K] extends AnyFunction ? PrefixParameter<T[K], T, T[K]> : never;
};

export function isFunction(func: unknown): func is (...args: unknown[]) => unknown {
	return func instanceof Function;
}

type Truthy = <T>(object: T | false | undefined) => object is T;
export const truthy = (Boolean as unknown) as Truthy;

export function truthyEntries<T extends Record<string, unknown>>(object: T) {
	return Object.entries(object).filter(([, v]) => truthy(v)) as Array<{
		[K in keyof T]-?: [K, T[K]];
	}[keyof T]>;
}

/**
 * Trim the size of the margin on the first line from every line.
 */
export function trimMargin(text: string) {
	if (text.startsWith('\n')) {
		text = text.slice(1);
	}

	text = text.trimEnd();
	const lines = text.split('\n');
	const trimmedFirstLine = lines[0]!.trimStart();
	const margin = lines[0]!.length - trimmedFirstLine.length;

	return lines.map(l => l.slice(Math.max(0, margin)).trimEnd()).join('\n');
}

type BuilderWrap = OptionalFunctionsWithOriginal<Builder> & {
	/**
	 * Hook into the adapter's adapt function.
	 *
	 * This method is called right before the original adapt function is called.
	 *
	 * The Builder instance is available as `this`.
	 */
	adapt?: (this: Builder) => void;
};

function wrapBuilder(builder: Builder, builderWrap: BuilderWrap): Builder {
	for (const [key, wrap] of truthyEntries(builderWrap)) {
		if (key === 'adapt' || !isFunction(wrap)) {
			continue;
		}

		const original = builder[key];
		if (!isFunction(original)) {
			continue;
		}

		(builder as any)[key] = (...args: unknown[]) => wrap.apply(builder, [original.bind(builder), ...args]);
	}

	return builder;
}

/**
 * Wrap an existing adapter and adapt the behaviour of the builder
 */
export function wrapAdapter(adapter: Adapter, nameTemplate: string, builderWrap: BuilderWrap): Adapter {
	return {
		...adapter,
		name: format(nameTemplate, adapter.name),
		async adapt(builder) {
			builderWrap.adapt?.apply(builder);
			await Promise.resolve(adapter.adapt(wrapBuilder(builder, builderWrap)));
		},
	};
}

export type Options = {
    /**
     * The origin of the site.
     *
     * This is used to build the URLs in the sitemap.
     */
    origin?: string;
};

const defaultOptions: Options = {
    origin: undefined,
};

export function buildSiteContents(builder: Builder, options: Options, dest: string) {
    builder.prerendered.pages.forEach(page => {
        console.log(page);
    });
    return "";
}

const nameTemplate = '%s + contents';
export function pageContentsWrapAdapter(adapter: Adapter, options?: Partial<Options>): Adapter {
	const resolvedOptions = {...defaultOptions, ...options};

	return wrapAdapter(adapter, nameTemplate, {
		adapt() {
			resolvedOptions.origin = resolvedOptions.origin ?? this.config.kit.prerender.origin;
		},
		writePrerendered(original, dest) {
			// We call the original last, in case the prerendered
			// bundle contains a sitemap which should take priority
			return [...buildSiteContents(this, resolvedOptions, dest), ...original(dest)];
		},
	});
}
