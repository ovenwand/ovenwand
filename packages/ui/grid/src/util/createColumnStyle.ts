import { createStyle } from '@ovenwand/util.browser';
import { isNumber, isNullish, isString, isUndefined } from '@ovenwand/util.fp';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function createColumnStyle(
	columns?: number | Partial<Record<Breakpoint, number>>,
	offset?: number | Partial<Record<Breakpoint, number>>,
	style: Record<string, unknown> = {}
): string {
	const styleMap = {
		...style
	};

	// Update column span
	if (isNumber(columns) || isString(columns)) {
		styleMap['--ow-columns-xs'] = columns;
	} else if (!isNullish(columns)) {
		for (const breakpoint of Object.keys(columns) as Breakpoint[]) {
			styleMap[`--ow-columns-${breakpoint}`] = columns[breakpoint];
		}
	}

	// Update column offset
	if (isNumber(offset)) {
		styleMap['--ow-column-offset-xs'] = offset + 1;
	} else if (!isNullish(offset)) {
		for (const breakpoint of Object.keys(offset) as Breakpoint[]) {
			const currentBreakpoint = offset[breakpoint];
			styleMap[`--ow-column-offset-${breakpoint}`] = !isUndefined(currentBreakpoint)
				? currentBreakpoint + 1
				: undefined;
		}
	}

	return createStyle(styleMap);
}
