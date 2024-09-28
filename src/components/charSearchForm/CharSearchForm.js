import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react/cjs/react.development';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const CharSearchForm = () => {
	const [char, setChar] = useState(null);
	const { getCharacterByName, process, setProcess } = useMarvelService();

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = (name) => {
		getCharacterByName(name)
			.then(onCharLoaded)
			.then(() => setProcess('confirmed'));
	};

	const errorMessage =
		process === 'error' ? (
			<ErrorMessage
				className="char__search-error"
				name="name"
				component="div"
			/>
		) : null;
	const results = !char ? null : char.length > 0 ? (
		<div className="char__search-wrapper">
			<div className="char__search-success">
				There is! Visit {char[0].name} page?
			</div>
			<Link
				to={`/characters/${char[0].id}`}
				className="button button__secondary">
				<div className="inner">To page</div>
			</Link>
		</div>
	) : (
		<div className="char__search-error">
			The character was not found. Check the name and try again
		</div>
	);

	return (
		<div className="char__search-form">
			<Formik
				initialValues={{
					name: '',
				}}
				validationSchema={Yup.object({
					name: Yup.string().required('This field is required'),
				})}
				onSubmit={({ name }) => updateChar(name)}>
				<Form>
					<label
						htmlFor="charName"
						className="char__search-label">
						Or find a character by name:
					</label>
					<div className="char__search-wrapper">
						<Field
							name="name"
							id="charName"
							className="char__search-input"
							placeholder="Enter name"
						/>
						<button
							type="submit"
							className="button button__main"
							disabled={process === 'loading'}>
							<div className="inner">find</div>
						</button>
					</div>
					<ErrorMessage
						className="char__search-error"
						name="name"
						component="div"
					/>
				</Form>
			</Formik>
			{errorMessage}
			{results}
		</div>
	);
};

export default CharSearchForm;
