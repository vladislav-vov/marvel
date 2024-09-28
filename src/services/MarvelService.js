import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const { request, clearError, process, setProcess } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=5079720337c21b1761512df2f1886584';
	const _baseOffset = 400;

	const getCharacterByName = async (name) => {
		const res = await request(
			`${_apiBase}characters?name=${name}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description
				? comics.description
				: 'There is no description for this comic',
			pageCount: comics.pageCount,
			language: comics.textObjects.language || 'en-us',
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
			price: comics.prices.price
				? `${comics.prices.price}$`
				: 'Not available',
		};
	};

	const _transformCharacter = (char) => {
		return {
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items,
		};
	};

	return {
		process,
		setProcess,
		getAllCharacters,
		getCharacter,
		clearError,
		getAllComics,
		getComic,
		getCharacterByName,
	};
};

export default useMarvelService;
