import { differenceInDays } from '@ovenwand/util.date';
import { max } from '@ovenwand/util.math';
import type { ITask } from './database';

/**
 * Applies the Eisenhower matrix to a task
 */
export function getPriority({ title, businessValue, dueDate, priority, size }: ITask): {
	action: string;
	importance: number;
	urgency: number;
} {
	const daysTillDueDate = differenceInDays(new Date(dueDate), Date.now());
	const urgency = size / max(1, daysTillDueDate - 7);
	const importance = businessValue * (priority / 5);

	let action = 'decide';

	if (urgency > 5 && importance > 5) {
		action = 'do';
	} else if (urgency > 5 && importance < 5) {
		action = 'delegate';
	} else if (urgency < 5 && importance < 5) {
		action = 'delete';
	}

	console.log(`
    ${title}
  
    size: ${size}
    daysTillDeadline: ${daysTillDueDate}
    businessValue: ${businessValue}
    priority: ${priority}
  
    urgency: ${urgency}
    importance: ${importance}
    
    action: ${action}
  `);

	return {
		action,
		urgency,
		importance
	};
}
