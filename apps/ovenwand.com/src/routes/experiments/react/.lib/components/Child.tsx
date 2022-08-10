import { setup } from '../setup';
// import { Deep } from './Deep';

export function Child(props) {
	// const state = setup(() => props);
	console.log('========================================\nrender Child');
	return (
		<>
			<h1 onClick={() => props.count.current++}>Child: {props.count.current}</h1>
			{/*<Deep state={state}/>*/}
		</>
	);
}
