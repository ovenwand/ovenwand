import { createStyle } from '@ovenwand/util.browser';

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
	if (typeof columns === 'number' || typeof columns === 'string') {
		styleMap['--ow-columns-xs'] = columns;
	} else if (columns != null) {
		for (const breakpoint of Object.keys(columns) as Breakpoint[]) {
			styleMap[`--ow-columns-${breakpoint}`] = columns[breakpoint];
		}
	}

	// Update column offset
	if (typeof offset === 'number') {
		styleMap['--ow-column-offset-xs'] = offset + 1;
	} else if (offset != null) {
		for (const breakpoint of Object.keys(offset) as Breakpoint[]) {
			const currentBreakpoint = offset[breakpoint];
			styleMap[`--ow-column-offset-${breakpoint}`] =
				typeof currentBreakpoint !== 'undefined' ? currentBreakpoint + 1 : undefined;
		}
	}

	return createStyle(styleMap);
}
