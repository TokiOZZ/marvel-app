import { Component } from 'react/cjs/react.development';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
    state = {
        charsList: [],
        loading: false,
        error: true,
    }

    marvelService = new MarvelService()

    onCharLoaded = (charsList) => {
        this.setState({
            charsList,
            loading: false
        })

    }

    onError = (charsList) => {
        this.setState({
            error: true,
            loading: false
        })

    }

    updateCharsList = () => {
        this.setState({
            error: false,
            loading: true
        })
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateCharsList()
    }

    render() {

        const { charsList, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? <View charsList={charsList} /> : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )


    }

}

const View = ({ charsList }) => {

    const charItem = charsList.map(char => {
        const { name, thumbnail } = char
        const thumbnailFix = thumbnail.includes('image_not_available.jpg') ? { objectFit: 'contain' } : null
        return (
            <li className="char__item">
                <img src={thumbnail} alt={name} style={thumbnailFix} />
                <div className="char__name">{name}</div>
            </li>
        )
    })

    return (
        <ul className="char__grid">
            {charItem}
        </ul>
    )
}

export default CharList;