import { createStyle } from '@ovenwand/util.dom';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function createColumnStyle(
	columns: number | Record<Breakpoint, number>,
	offset: number | Record<Breakpoint, number>,
	style: Record<string, unknown> = {}
): string {
	const styleMap = {
		...style
	};

	// Update column span
	if (typeof columns === 'number' || typeof columns === 'string') {
		styleMap['--ow-columns-xs'] = columns;
	} else if (columns != null) {
		for (const breakpoint of Object.keys(columns)) {
			styleMap[`--ow-columns-${breakpoint}`] = columns[breakpoint];
		}
	}

	// Update column offset
	if (typeof offset === 'number') {
		styleMap['--ow-column-offset-xs'] = offset + 1;
	} else if (offset != null) {
		for (const breakpoint of Object.keys(offset)) {
			styleMap[`--ow-column-offset-${breakpoint}`] = offset[breakpoint] + 1;
		}
	}

	return createStyle(styleMap);
}
